import { useCallback, useEffect } from "react"
import { LOGIN_WITH_OAUTH_SUCCESS } from "../../UserContext/authActionTypes"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { Link, useNavigate } from "react-router-dom"
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
    <div className="mt-10 flex w-11/12 max-w-sm flex-col rounded-lg border border-solid border-gray-100 p-5 font-poppins shadow-lg">
      <h1 className="mb-4 font-poppins text-3xl">Sign Up</h1>

      <label
        className=" mb-2 block font-poppins text-sm font-bold text-gray-700 "
        htmlFor="email"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        className="mb-4 rounded-md border border-solid border-stone-300 px-3 py-1 shadow-sm outline-none focus:border-cyan-500"
      />

      <label
        className="mb-2 block font-poppins text-sm font-bold text-gray-700"
        htmlFor="email"
      >
        Password
      </label>

      <input
        id="password"
        type="password"
        placeholder="Password"
        name="password"
        className="mb-4 rounded-md border border-solid border-stone-300 px-3 py-1 shadow-sm outline-none focus:border-cyan-500"
      />

      <button
        onClick={handleSignUp}
        className="mb-1 w-full rounded-md bg-black py-2 text-cyan-400 hover:bg-stone-800"
      >
        Sign Up
      </button>
      <Link
        className="ml-auto font-lato text-sm text-blue-800 hover:underline"
        to="/help"
      >
        Forgot password?
      </Link>

      <p className="my-3 flex items-center before:mx-2 before:h-px before:flex-1 before:bg-slate-400 before:content-[''] after:mx-2 after:h-px after:flex-1 after:bg-slate-400 after:content-['']">
        OR
      </p>

      <div id="buttonDiv" className="grid w-full place-items-center"></div>
    </div>
  )
}
