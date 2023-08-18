/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react"
import { authContext } from "./authContext"
import { Loading } from "../pages/Loading"
import * as authActionTypes from "./authActionTypes"
import jwtDecode from "jwt-decode"

const reducer = (auth, action) => {
  switch (action.type) {
    case authActionTypes.AUTO_LOGIN_LOADING:
      return { ...auth, isLoading: true, isAppLoaded: false }

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
  const handleCallbackResponse = (response) => {
    console.log(response)
    console.log(jwtDecode(response.credential))
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
  })

  if (!auth.isAppLoaded) {
    return <Loading />
  }

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  )
}
