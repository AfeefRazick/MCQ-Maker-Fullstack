import { Link, useParams } from "react-router-dom"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { v4 as uuidv4 } from "uuid"

export const ResponsesPage = () => {
  const { auth } = useAuthContext()
  const { mceid } = useParams()

  let mcqSubmissions = auth.user.multipleChoiceExams.find((mce) => {
    return mceid === mce._id.toString()
  })?.mcqSubmissions

  return (
    <div>
      <div className="">
        {mcqSubmissions?.length === 0 && (
          <h3 className="mt-10 w-full text-center text-xl text-black md:text-xl">
            No responses yet
          </h3>
        )}

        {mcqSubmissions?.map((submission) => {
          return (
            <Link to={`${submission?.submitterInfo?.id}`} key={uuidv4()}>
              <p>{submission?.submitterInfo?.name}</p>
              <p>{submission?.submitterInfo?.email}</p>
              <p>{submission?.marks}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
