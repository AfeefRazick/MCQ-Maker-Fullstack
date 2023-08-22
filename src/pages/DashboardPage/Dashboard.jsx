import axios from "axios"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { DELETE_USER_SUCCESS } from "../../UserContext/authActionTypes"

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
  return (
    <div>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  )
}
