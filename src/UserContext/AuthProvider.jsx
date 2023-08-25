/* eslint-disable react/prop-types */
import { useCallback, useEffect, useReducer } from "react"
import { authContext } from "./authContext"
import { Loading } from "../pages/Loading"
import * as authActionTypes from "./authActionTypes"
import axios from "axios"

const reducer = (auth, action) => {
  switch (action.type) {
    case authActionTypes.AUTO_LOGIN_LOADING:
      return { ...auth, isLoading: true, isAppLoaded: false }

    case authActionTypes.AUTO_LOGIN_FAIL:
      return {
        ...auth,
        isLoading: false,
        isAuthenticated: false,
        isAppLoaded: true,
      }

    case authActionTypes.LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem("JWTTOKEN", action.payload.credential)
      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...action.payload },
      }
    case authActionTypes.AUTO_LOGIN_SUCCESS:
      localStorage.setItem("JWTTOKEN", action.payload.credential)

      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...action.payload },
      }

    case authActionTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("JWTTOKEN")
      return { ...auth, isAuthenticated: false, user: {} }

    case authActionTypes.DELETE_USER_SUCCESS:
      localStorage.removeItem("JWTTOKEN")
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
    isLoading: true,
    user: {},
    isAppLoaded: false,
  })

  const loginWithJWT = useCallback(
    async (response) => {
      const jwt = response.credential

      let userFromDB = {
        ...(await axios.get(import.meta.env.VITE_SERVER_URL + "/user/" + jwt)),
      }.data

      if (!userFromDB) {
        userFromDB = {
          ...(await axios.post(
            import.meta.env.VITE_SERVER_URL + "/user/create",
            {
              credential: jwt,
            }
          )),
        }.data
      }
      if (userFromDB) {
        dispatch({
          type: authActionTypes.AUTO_LOGIN_SUCCESS,
          payload: { credential: jwt, ...userFromDB },
        })
      }

      return userFromDB
    },
    [dispatch]
  )

  const loginOrSignupWithGoogle = useCallback(
    async (response) => {
      const jwt = response.credential

      let userFromDB = {
        ...(await axios.get(import.meta.env.VITE_SERVER_URL + "/user/" + jwt)),
      }.data

      if (!userFromDB) {
        userFromDB = {
          ...(await axios.post(
            import.meta.env.VITE_SERVER_URL + "/user/create",
            {
              credential: jwt,
            }
          )),
        }.data
      }

      dispatch({
        type: authActionTypes.LOGIN_WITH_OAUTH_SUCCESS,
        payload: { credential: jwt, ...userFromDB },
      })
      return userFromDB
    },
    [dispatch]
  )
  // let [userFromDB, setUserFromDB] = useState(null)

  useEffect(() => {
    const asyncWrapper = async () => {
      //set initial loading while authenticating
      const jwt = localStorage.getItem("JWTTOKEN")
      if (jwt) {
        dispatch({ type: authActionTypes.AUTO_LOGIN_LOADING })
        await loginWithJWT({ credential: jwt })
      } else {
        // console.log(auth)
        // setUserFromDB(null)
        dispatch({ type: authActionTypes.AUTO_LOGIN_FAIL })
      }
    }
    asyncWrapper()
  }, [loginWithJWT])

  useEffect(() => {
    if (auth.isAppLoaded) {
      // google oauth setup
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: loginOrSignupWithGoogle,
          // auto_select: true,
        })

        if (!auth.isAuthenticated) {
          window.google.accounts.id.prompt()
        }

        // if (window.location.pathname === "/signup") {
        //   window.google.accounts.id.renderButton(
        //     document.getElementById("buttonDiv"),
        //     { size: "large" }
        //   )
        // }
      }
    }
  }, [auth.isAuthenticated, auth.isAppLoaded, loginOrSignupWithGoogle])

  console.log(auth)

  if (!auth.isAppLoaded) {
    return <Loading />
  }

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  )
}
