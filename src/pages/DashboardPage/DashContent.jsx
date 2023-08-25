import { Link } from "react-router-dom"
import { MyMCEs } from "./MyMCEs.jsx"
import { AiOutlinePlus } from "react-icons/ai"

export const DashContent = () => {
  return (
    <div className="h-full w-full pt-16 md:pl-72 md:pt-20">
      <div className="h-full w-full bg-slate-50 px-[4%]">
        <div className="flex justify-between">
          <h2 className="my-1 pt-2 font-poppins text-[clamp(26px,5vw,36px)] font-bold">
            My MCQ&#39;s
          </h2>
          <Link
            className="my-2 flex h-auto items-center justify-center rounded-full border border-solid border-gray-100 bg-white px-2 font-lato text-lg text-black shadow-md sm:my-3 sm:px-4"
            to={"/mcq-builder/new"}
          >
            <AiOutlinePlus className="mr-1 h-5 w-5 sm:hidden" />
            Create <span className="ml-1 hidden sm:block"> MCQ </span>
          </Link>
        </div>

        <MyMCEs />

        <div className="flex h-72 flex-col items-center">
          <hr className="mb-2 mt-4 h-px w-full bg-stone-300" />
          <Link to={"/mcq-builder/new"}>
            <AiOutlinePlus className="h-9 w-9 rounded-full border border-solid border-slate-100 bg-white p-1 text-gray-600 shadow-md" />
          </Link>
        </div>
      </div>
    </div>
  )
}
