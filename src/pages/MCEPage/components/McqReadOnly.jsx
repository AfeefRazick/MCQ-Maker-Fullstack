/* eslint-disable react/prop-types */
import { useContext } from "react"
import { QuestionReadOnly } from "./QuestionReadOnly"
import { AnswerReadOnly } from "./AnswerReadOnly"
import { MCQReaderContext } from "../MCQReaderContext"

export const McqReadOnly = ({ index, mcqid, mcqObject }) => {
  const mcqList = useContext(MCQReaderContext)

  return (
    <div className="relative w-full bg-white">
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
            <AnswerReadOnly
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
