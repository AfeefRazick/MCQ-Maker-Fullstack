import { Link, useParams } from "react-router-dom"
import { useAuthContext } from "../../../UserContext/useAuthContext"
import { v4 as uuidv4 } from "uuid"
import { IoListSharp, IoSearchOutline } from "react-icons/io5"
import { MdSortByAlpha } from "react-icons/md"
import { BsChatRightText } from "react-icons/bs"

export const Responses = () => {
  const { auth } = useAuthContext()
  const { mceid } = useParams()

  let mce = auth.user.multipleChoiceExams.find((mce) => {
    return mceid === mce._id.toString()
  })

  let mcqSubmissions = mce?.mcqSubmissions

  let totalMarks = mce.mcqArray.length

  return (
    <div>
      <div className="mb-2 ">
        <h2 className=" pt-5 font-poppins text-[clamp(26px,5vw,36px)] font-bold leading-none ">
          Submissions
        </h2>
        <h2 className="mb-1 font-poppins text-[clamp(20px,4vw,24px)] text-stone-700">
          {mce?.information?.name}
        </h2>
      </div>

      <div className="mb-4 flex justify-between">
        <div className="relative flex items-center">
          <input
            placeholder="Search"
            type="text"
            className="placeholder:font-roboto z-0 w-1/3 min-w-[200px] rounded-lg border border-solid border-stone-300 py-1 pl-9 pr-2 outline-none placeholder:text-stone-500 focus:shadow-md"
          />
          <IoSearchOutline className="absolute left-2 z-10 text-xl" />
        </div>

        <div className="flex gap-2">
          <IoListSharp title="Layout" className="icon-lg" />
          <MdSortByAlpha title="Sort" className="icon-lg" />
        </div>
      </div>

      <div className="my-2 w-full">
        {mcqSubmissions?.length === 0 && (
          <h3 className="mt-10 w-full text-center text-xl text-black md:text-xl">
            No submissions yet
          </h3>
        )}
        {mcqSubmissions?.map((submission) => {
          return (
            <Link
              className="mb-4 flex h-16 w-full items-center justify-between overflow-hidden rounded-xl border border-solid border-slate-200 bg-white px-2 font-poppins text-base shadow-md hover:bg-gray-100 md:h-[72px] "
              to={`${submission?.submitterInfo?.id}`}
              key={uuidv4()}
            >
              <div className="flex items-center overflow-hidden">
                <BsChatRightText className="ml-1 mr-4 text-4xl text-cyan-500 " />
                <div className="overflow-hidden">
                  <p className="overflow-hidden text-ellipsis text-lg font-semibold">
                    {submission?.submitterInfo?.name}
                  </p>
                  <p className="overflow-hidden text-ellipsis">
                    {submission?.submitterInfo?.email}
                  </p>
                </div>
              </div>
              <p className="grid h-9 w-11 place-items-center rounded-xl bg-black text-lg text-white md:h-10 md:w-12">
                {submission?.marks}/{totalMarks}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
