/* eslint-disable react/prop-types */
import { SubmissionAnswer } from "./SubmissionAnswer"
import { QuestionReadOnly } from "../../MCEPage/components/QuestionReadOnly"

export const SubmissionMCQ = ({ index, mcqid, mcqObject, mcqList }) => {
  // const mcqList = useContext(MCQReaderContext)

  return (
    <div className="relative w-full">
      <div
        className="my-3 w-full rounded-xl border border-solid border-black px-2 py-1"
        id="mcq-1"
      >
        <QuestionReadOnly
          mcqid={mcqid}
          questionIndex={index}
          text={mcqList[index].question.text}
        />
        {mcqList[index].answers.map((answer, i) => {
          return (
            <SubmissionAnswer
              correct={mcqObject.correctAnswerId === answer.id}
              selected={mcqObject.selectedAnswerId === answer.id}
              mcqid={mcqid}
              answerid={answer.id}
              key={answer.id}
              questionIndex={index}
              index={i}
              answerIndex={i}
              text={answer.text}
            />
          )
        })}
      </div>
    </div>
  )
}
