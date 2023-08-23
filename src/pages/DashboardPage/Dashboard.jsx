import axios from "axios"
import { useAuthContext } from "../../UserContext/useAuthContext"
import {
  DELETE_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../../UserContext/authActionTypes"
import { Link } from "react-router-dom"

export const Dashboard = () => {
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
    <div>
      <Link className="bg-green-400" to={"/mcq-builder"}>
        Create MCQ
      </Link>
      <button onClick={logout}>Log Out</button>
      <button className="bg-red-600" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  )
}
