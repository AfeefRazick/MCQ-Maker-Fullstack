/* eslint-disable react/prop-types */
import { useRef } from "react"
import { BsLink45Deg } from "react-icons/bs"

export const GetLink = ({ link }) => {
  const copiedMessage = useRef()
  return (
    <>
      <div
        className="fixed bottom-[-100%] left-5 z-50 block h-10 rounded-md bg-slate-800  px-3 py-2 pr-8 text-white transition-[bottom]"
        ref={copiedMessage}
      >
        Copied to clipboard
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(link).then(() => {
            copiedMessage.current.style.bottom = "20px"
            setTimeout(() => {
              if (copiedMessage?.current?.style?.bottom) {
                copiedMessage.current.style.bottom = "-100%"
              }
            }, 5000)
          })
        }}
        title={"Copy link to this MCQ"}
        className=" flex items-center"
      >
        <BsLink45Deg className="icon-lg icon-highlight" />
      </button>
    </>
  )
}
