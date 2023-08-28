/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useUpdateUser } from "../../../hooks/useUpdateUser"

export const MCQUrlModal = ({ showModal, setShowModal, mce_id }) => {
  const dialog = useRef(false)
  const navigate = useNavigate()
  const updateUser = useUpdateUser()

  useEffect(() => {
    if (showModal && !dialog.current.open) {
      dialog.current.showModal()
      dialog.current.focus()
    } else if (!showModal && dialog.current.open) {
      dialog.current.close()
    }
  }, [showModal])

  const closeModal = async () => {
    await updateUser()
    navigate(`/mcq-builder/${mce_id}`)
    setShowModal(false)
  }

  return (
    <dialog
      ref={dialog}
      className="relative m-auto h-3/5 w-10/12 max-w-3xl rounded-2xl p-3 text-center md:p-10"
    >
      <FaTimes
        onClick={closeModal}
        className="icon absolute right-5 top-5 bg-transparent"
      />
      <h2 className="font-rubik text-[clamp(32px,5vw,100px)] font-bold text-[#1b263b]">
        Congratulations!
      </h2>
      <p className="text-[clamp(20px,3vw,80px)] text-black text-opacity-60">
        Here is your MCQ link
      </p>
      <input
        readOnly
        onClick={(e) => {
          e.target.select()
        }}
        className="mt-10 w-full select-all border-b border-solid border-slate-400 py-0.5 text-cyan-700 outline-none focus:border-b-2 focus:border-main"
        value={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce_id}
      ></input>
    </dialog>
  )
}
