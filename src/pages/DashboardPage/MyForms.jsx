import { useAuthContext } from "../../UserContext/useAuthContext"
import { v4 as uuidv4 } from "uuid"
import { CustomIframe } from "../../components/CustomIframe"
import { MCEPortal } from "../../components/McePortal/MCEPortal"

export const MyForms = () => {
  const { auth } = useAuthContext()

  return (
    <ul className="w-full py-5">
      {auth?.user?.multipleChoiceExams?.map((mce) => {
        return (
          <li key={uuidv4()} className="py-5">
            <div className="h-20 w-full bg-slate-50 px-3 py-5">
              <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-poppins text-lg font-bold">
                {mce.information.name}
              </h3>
              <div className="h-full w-full">
                {/* <CustomIframe>
                  <MCEPortal
                    mcqList={mce.mcqArray}
                    information={mce.information}
                  />
                </CustomIframe> */}
              </div>
              <img src="/mcqLogo.png" className="w-8" alt="" />
              <p>Last modified {mce.lastModified}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
