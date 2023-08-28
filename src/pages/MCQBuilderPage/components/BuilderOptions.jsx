/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { AiOutlineCloudUpload, AiOutlineEye } from "react-icons/ai"
import { IoLinkOutline } from "react-icons/io5"
import { ResponsiveLogo } from "../../../components/ResponsiveLogo"
import Button from "../../../components/Button"

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
        <ResponsiveLogo />

        <div className="flex items-center">
          {mceCreated && (
            <>
              <Button
                linkpath={`/submissions/${mce_id}`}
                buttonStyle={"btn btn-nav px-0"}
              >
                Responses
              </Button>
              <a
                target="blank"
                href={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce_id}
                className="mx-2 flex items-center"
              >
                <AiOutlineEye className="rounded-full p-1 text-4xl hover:bg-slate-200" />
              </a>
            </>
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
