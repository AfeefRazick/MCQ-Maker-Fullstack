/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Button from "./Button"
import { AiOutlineCloudUpload, AiOutlineEye } from "react-icons/ai"
import { IoLinkOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { CgCarousel } from "react-icons/cg"

export const BuilderOptions = ({
  sendCreateMCE,
  sendUpdateMCE,
  mce_id,
  updated,
}) => {
  const [mceCreated, setMceCreated] = useState(false)
  useEffect(() => {
    if (mce_id !== "") setMceCreated(true)
  }, [mce_id])

  return (
    <div className="fixed top-0 z-10 flex h-16 w-full justify-center border-b border-solid border-slate-200 bg-white md:h-20">
      <div className="flex h-full w-full items-center justify-between px-2 sm:w-11/12">
        <div className="flex items-center">
          <Link
            to="/"
            className="mx-1 cursor-pointer font-nunito text-3xl text-cyan-500 "
          >
            <CgCarousel className="relative top-1 mx-1 w-10 rounded-lg bg-black text-white" />
            <span className="hidden sm:inline">
              <span className="text-black">MCQ</span> Maker
            </span>
          </Link>
        </div>

        <div className="flex">
          {mceCreated && (
            <a
              target="blank"
              href={import.meta.env.VITE_CLIENT_URL + mce_id}
              className="mx-2 flex items-center"
            >
              <AiOutlineEye className="rounded-full p-1 text-4xl hover:bg-slate-200" />
            </a>
          )}
          {mceCreated ? (
            <Button
              className={
                updated
                  ? "border-[3px] border-solid border-transparent"
                  : "border-animation"
              }
              buttonStyle="btn-small"
              onClick={sendUpdateMCE}
            >
              Save
              <AiOutlineCloudUpload className="ml-1 text-xl" />
            </Button>
          ) : (
            <Button buttonStyle="btn-small" onClick={sendCreateMCE}>
              Create
              <IoLinkOutline className="ml-1 text-xl" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
