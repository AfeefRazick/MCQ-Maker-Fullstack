import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import { AiOutlinePlus } from "react-icons/ai"
import { MdSortByAlpha } from "react-icons/md"
import { IoSearchOutline, IoListSharp } from "react-icons/io5"
import { GetLink } from "../../../components/GetLink"
import { DeleteMCE } from "../../../components/DeleteMCE"
import { useAuthContext } from "../../../UserContext/useAuthContext"

export const MyMCEs = () => {
  const { auth } = useAuthContext()

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        <h2 className="my-1 pt-2 font-poppins text-[clamp(26px,5vw,36px)] font-bold">
          My MCQ&#39;s
        </h2>
        <Link
          className="my-2 flex h-auto items-center justify-center rounded-full border border-solid border-gray-100 bg-white px-2 font-lato text-lg text-black shadow-md hover:bg-slate-100 sm:my-3 sm:px-4"
          to={"/mcq-builder/new"}
        >
          <AiOutlinePlus className="mr-1 h-5 w-5 sm:hidden" />
          Create <span className="ml-1 hidden sm:block"> MCQ </span>
        </Link>
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

      <ul className="custom-scroll my-2 max-h-96 w-full overflow-y-scroll pr-2">
        {auth?.user?.multipleChoiceExams?.map((mce) => {
          return (
            <li key={uuidv4()} className=" pb-4">
              <div className="flex h-16 w-full items-center justify-between overflow-hidden rounded-xl border border-solid border-slate-200 bg-white px-2 shadow-md hover:bg-gray-100 md:h-[72px]  ">
                <Link
                  to={
                    import.meta.env.VITE_CLIENT_URL + "mcq-builder/" + mce._id
                  }
                  className="flex h-full w-5/6 items-center overflow-hidden"
                >
                  <img
                    src="/checkboxes.svg"
                    className="h-10 w-10 sm:ml-1 "
                    alt="mcq clipart"
                  />

                  <div className=" overflow-hidden px-2 md:px-3">
                    <h3 className=" w-full overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-lg font-bold md:text-xl">
                      {mce.information.name}
                    </h3>

                    <p className="text-sm text-slate-600">
                      Last modified {mce.lastModified}
                    </p>
                  </div>
                </Link>

                <div className="flex ">
                  <GetLink
                    link={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce._id}
                  />
                  <DeleteMCE mceid={mce._id} />
                </div>
              </div>
            </li>
          )
        })}

        {auth?.user?.multipleChoiceExams?.length === 0 && (
          <div>
            <h3 className="mt-10 w-full text-center text-xl text-black md:text-xl">
              No mcq&#39;s yet
            </h3>
            <p className="text-center text-stone-600">
              Click <span className="text-xl">+</span> to create mcq
            </p>
          </div>
        )}
      </ul>

      <div className="flex h-72 flex-col items-center">
        <hr className="mb-2 mt-4 h-px w-full bg-stone-300" />
        <Link title="Create MCQ" to={"/mcq-builder/new"}>
          <AiOutlinePlus className="h-9 w-9 rounded-full border border-solid border-slate-100 bg-white p-1 text-gray-600 shadow-md" />
        </Link>
      </div>
    </div>
  )
}
