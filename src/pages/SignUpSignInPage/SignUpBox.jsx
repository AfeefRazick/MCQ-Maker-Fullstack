import { useCallback, useEffect } from "react"
import { LOGIN_WITH_OAUTH_SUCCESS } from "../../UserContext/authActionTypes"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { useNavigate } from "react-router-dom"
import { axiosPublic } from "../../axiosPublic"

export const SignUpBox = () => {
  const navigate = useNavigate()
  const { auth, dispatch } = useAuthContext()

  const loginOrSignupWithGoogle = useCallback(
    async (response) => {
      const jwt = response.credential

      let userFromDB = {
        ...(await axiosPublic.get("user/" + jwt)),
      }.data

      if (!userFromDB) {
        userFromDB = {
          ...(await axiosPublic.post("user/create", {
            credential: jwt,
          })),
        }.data
      }

      dispatch({
        type: LOGIN_WITH_OAUTH_SUCCESS,
        payload: { credential: jwt, ...userFromDB },
      })
      setTimeout(() => {
        navigate("/dashboard")
      }, 100)
      return userFromDB
    },
    [dispatch, navigate]
  )

  useEffect(() => {
    if (auth.isAppLoaded) {
      // google oauth setup
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: loginOrSignupWithGoogle,
          // auto_select: true,
        })
        // console.log(!auth.isAuthenticated && auth.isAppLoaded)

        // if (!auth.isAuthenticated && auth.isAppLoaded) {
        if (!auth.isAuthenticated) {
          // console.log(!auth.isAuthenticated && auth.isAppLoaded)
          window.google.accounts.id.prompt()
        }

        // if (window.location.pathname === "/signup") {
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { size: "large" }
        )
        // }
      }
    }
  }, [auth.isAuthenticated, auth.isAppLoaded, loginOrSignupWithGoogle])

  const handleSignUp = () => {}

  return (
    <div className="flex w-11/12 max-w-lg flex-col rounded-lg border border-solid border-gray-100 p-5 shadow-lg">
      <h1 className=" font-poppins text-3xl">Sign Up</h1>
      <label htmlFor="email"></label>
      <input
        id="email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        className="px-3 py-2"
      />
      <button onClick={handleSignUp} className="">
        Sign Up
      </button>
      <div id="buttonDiv" className="grid w-full place-items-center"></div>
    </div>
  )
}
