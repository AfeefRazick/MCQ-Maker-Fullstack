import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { useAuthContext } from "../../../UserContext/useAuthContext"
import { PiPushPin } from "react-icons/pi"

export const PinnedMCQs = () => {
  const { auth } = useAuthContext()
  const [mcqs, setMcqs] = useState({ pinned: [], unpinned: [] })
  const [isPinnedOpen, setIsPinnedOpen] = useState(false)

  useEffect(() => {
    const unpinnedStartIndex = Math.min(
      auth?.user?.multipleChoiceExams?.length,
      3
    )
    setMcqs({
      pinned: auth?.user?.multipleChoiceExams?.slice(0, unpinnedStartIndex),
      unpinned: auth?.user?.multipleChoiceExams?.slice(unpinnedStartIndex),
    })
  }, [setMcqs, auth?.user?.multipleChoiceExams])

  return (
    <div className="mb-10 flex flex-col">
      <hr className=" mb-4 mt-3 h-px bg-stone-300" />

      <h3 className="mb-1 rounded-lg px-2 py-0.5 font-lato text-lg font-semibold text-black ">
        Pinned mcq&#39;s
      </h3>

      <ul
        className={`custom-scroll mb-2  flex flex-col  font-lato text-base ${
          isPinnedOpen ? " overflow-y-auto" : "max-h-[140px] overflow-hidden"
        }`}
      >
        {mcqs?.pinned?.map((mce) => {
          return (
            <Link
              className=" flex items-center justify-between rounded-lg px-2 py-0.5 text-black hover:bg-stone-100"
              key={uuidv4()}
              to={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce._id}
            >
              {mce.information.name}
              <PiPushPin className="text-lg hover:text-cyan-500" />
            </Link>
          )
        })}
        {mcqs?.unpinned?.map((mce) => {
          return (
            <Link
              className="rounded-lg px-2 py-0.5 text-black hover:bg-stone-100"
              key={uuidv4()}
              to={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce._id}
            >
              {mce.information.name}
            </Link>
          )
        })}
      </ul>
      <button
        onClick={() => {
          setIsPinnedOpen((prev) => {
            return !prev
          })
        }}
        className="px-2 text-left text-sm hover:text-cyan-600"
      >
        {isPinnedOpen ? "Show less" : "Show more"}
      </button>
    </div>
  )
}
