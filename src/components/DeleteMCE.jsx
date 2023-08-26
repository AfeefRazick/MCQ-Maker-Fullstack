/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai"
import { axiosPublic } from "../axiosPublic"
import { useUpdateUser } from "../hooks/useUpdateUser"

export const DeleteMCE = ({ mceid }) => {
  const updateUser = useUpdateUser()

  const deleteMCE = async () => {
    const response = await axiosPublic.delete("mce/" + mceid)
    console.log(response)

    if (response.data.deleted) {
      // let mce = auth.user.multipleChoiceExams.find((mce) => {
      //   if (mce._id === mceid) return mce
      // })
      updateUser()
    }
  }
  return (
    <button
      title="Delete MCQ"
      className="flex items-center"
      onClick={deleteMCE}
    >
      <AiOutlineDelete className="icon-lg " />
    </button>
  )
}
