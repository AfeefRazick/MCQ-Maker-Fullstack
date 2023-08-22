/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react"
import { authContext } from "./authContext"
import { Loading } from "../pages/Loading"
import * as authActionTypes from "./authActionTypes"
import axios from "axios"

const reducer = (auth, action) => {
  switch (action.type) {
    case authActionTypes.AUTO_LOGIN_LOADING:
      return { ...auth, isLoading: true, isAppLoaded: false }
    case authActionTypes.LOGIN_WITH_OAUTH_SUCCESS:
      // setstoragejwttoken
      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...action.payload },
      }
    case authActionTypes.DELETE_USER_SUCCESS:
      return {
        ...auth,
        isLoading: false,
        isAuthenticated: false,
        user: {},
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: false,
    user: {},
    isAppLoaded: true,
  })

  const handleCallbackResponse = async (response) => {
    const jwt = response.credential

    let userFromDB = {
      ...(await axios.get(import.meta.env.VITE_SERVER_URL + "/user/" + jwt)),
    }.data

    if (!userFromDB) {
      userFromDB = {
        ...(await axios.post(import.meta.env.VITE_SERVER_URL + "/user/create", {
          credential: jwt,
        })),
      }.data
    }

    dispatch({
      type: authActionTypes.LOGIN_WITH_OAUTH_SUCCESS,
      payload: { credential: jwt, ...userFromDB },
    })
  }

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
        // auto_select: true,
      })
      window.google.accounts.id.prompt()
      if (window.location.pathname === "/signup") {
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          {}
        )
      }
    }
  }, [])

  if (!auth.isAppLoaded) {
    return <Loading />
  }
  console.log(auth)
  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  )
}
