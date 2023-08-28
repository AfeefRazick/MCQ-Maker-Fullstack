import { useParams } from "react-router-dom"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { Submission } from "./components/Submission"

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
    <Submission information={mce.information} mcqList={submission.mcqArray} />
  )
  // return <div>{submission.submitterInfo.email}</div>
}
