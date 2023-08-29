import { DELETE_USER_SUCCESS } from "../../UserContext/authActionTypes"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { axiosPublic } from "../../axiosPublic"

export const SettingsPage = () => {
  const { auth, dispatch } = useAuthContext()

  const deleteAccount = async () => {
    const deleteResponse = await axiosPublic.delete(
      "user/delete/" + auth.user.credential
    )
    if (deleteResponse.data.deletedCount === 1) {
      dispatch({ type: DELETE_USER_SUCCESS })
    }
  }

  return (
    <div>
      <button
        className="rounded-md bg-red-600 px-2 py-1 font-semibold text-white"
        onClick={deleteAccount}
      >
        Delete Account
      </button>
    </div>
  )
}
