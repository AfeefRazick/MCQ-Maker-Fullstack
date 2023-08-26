import { useEffect } from "react"
import {
  UPDATE_USER_LOADING,
  UPDATE_USER_SUCCESS,
} from "../UserContext/authActionTypes"
import { useAuthContext } from "../UserContext/useAuthContext"
import { axiosPublic } from "../axiosPublic"

export const useUpdateUserOnLoad = () => {
  const { auth, dispatch } = useAuthContext()
  useEffect(() => {
    const updateUser = async () => {
      dispatch({
        type: UPDATE_USER_LOADING,
      })

      let userFromDB = {
        ...(await axiosPublic.get("user/" + auth.user.credential)),
      }.data

      if (userFromDB) {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { credential: auth.user.credential, ...userFromDB },
        })
      }
    }

    updateUser()
  }, [auth.user.credential, dispatch])
}
