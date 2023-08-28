import { useParams } from "react-router-dom"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { Submission } from "./components/Submission"
import { Loading } from "../Loading"
import { DashTopSide } from "../DashboardPage/components/DashTopSide"

export const SubmissionPage = () => {
  const { auth } = useAuthContext()
  const { mceid, submitterID } = useParams()

  let mce = auth.user.multipleChoiceExams.find((mce) => {
    return mceid === mce._id.toString()
  })

  let submission = mce.mcqSubmissions.find((submission) => {
    return submitterID === submission.submitterInfo.id
  })

  return (
    <div className="h-screen w-full">
      <DashTopSide />
      <div className="h-full w-full md:pl-64 ">
        <div className="relative h-full w-full bg-slate-50 px-[4%] pr-2 sm:pr-[4%]">
          {auth.isLoading && <Loading />}
          <Submission
            information={mce.information}
            mcqList={submission.mcqArray}
          />
        </div>
      </div>
    </div>
  )
  // return <div>{submission.submitterInfo.email}</div>
}
