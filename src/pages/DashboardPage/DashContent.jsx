import { Link } from "react-router-dom"
import { MyForms } from "./MyForms"
import axios from "axios"
import { useAuthContext } from "../../UserContext/useAuthContext"
import {
  DELETE_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../../UserContext/authActionTypes"

export const DashContent = () => {
  const { auth, dispatch } = useAuthContext()
  const deleteAccount = async () => {
    const deleteResponse = await axios.delete(
      import.meta.env.VITE_SERVER_URL + "/user/delete/" + auth.user.credential
    )
    if (deleteResponse.data.deletedCount === 1) {
      dispatch({ type: DELETE_USER_SUCCESS })
    }
  }
  const logout = () => {
    dispatch({ type: LOGOUT_SUCCESS })
  }

  return (
    <div className="mt-16 h-full w-full md:mt-20 md:pl-72">
      <div className="w-full px-[4%]">
        <MyForms />
        <Link className="bg-green-400" to={"/mcq-builder"}>
          Create MCQ
        </Link>
        <button onClick={logout}>Log Out</button>
        <button className="bg-red-600" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  )
}