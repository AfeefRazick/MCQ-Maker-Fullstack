import { useAuthContext } from "../../UserContext/useAuthContext"
import { v4 as uuidv4 } from "uuid"
import { DeleteMCE } from "../../components/DeleteMCE"
import { GetLink } from "../../components/GetLink"
import { Link } from "react-router-dom"

export const MyMCEs = () => {
  const { auth } = useAuthContext()

  return (
    <ul className="h-full min-h-screen w-full py-2">
      {auth?.user?.multipleChoiceExams?.map((mce) => {
        return (
          <li key={uuidv4()} className=" py-2">
            <div className="flex h-16 w-full items-center justify-between overflow-hidden rounded-xl border border-solid border-slate-200 bg-white px-2 shadow-md hover:bg-gray-100 md:h-[72px]  ">
              <Link
                to={import.meta.env.VITE_CLIENT_URL + "mcq-builder/" + mce._id}
                className="flex w-5/6"
              >
                <img
                  src="/checkboxes.svg"
                  className=" h-10 w-10 md:h-12 md:w-12"
                  alt=""
                />
                <div className="overflow-hidden px-2 md:px-3">
                  <h3 className="mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-lg font-bold leading-none md:text-xl md:leading-none">
                    {mce.information.name}
                  </h3>
                  {/* <div className="h-full w-full"> */}
                  {/* <CustomIframe>
                  <MCEPortal
                    mcqList={mce.mcqArray}
                    information={mce.information}
                  />
                </CustomIframe> */}
                  {/* </div> */}

                  <p className="text-sm text-slate-600">
                    Last modified {mce.lastModified}
                  </p>
                </div>
              </Link>
              <div className="flex">
                <GetLink
                  link={import.meta.env.VITE_CLIENT_URL + "mcq/" + mce._id}
                />

                <DeleteMCE />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
