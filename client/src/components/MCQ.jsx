/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid"
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"
import { BiImageAdd, BiMessageSquareAdd, BiDuplicate } from "react-icons/bi"
import { AnswerBuilder } from "./AnswerBuilder"
import { QuestionBuilder } from "./QuestionBuilder"
import { useContext } from "react"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../pages/MCQBuilderPage/MCQbuilderContext"
import { ACTIONS } from "../pages/MCQBuilderPage/MCQBuilder"

export const MCQ = ({ index, mcqid }) => {
  const mcqList = useContext(MCQBuilderContext)
  const dispatch = useContext(MCQBuilderDispatchContext)

  const addQuestion = () => {
    dispatch({
      type: ACTIONS.ADDQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }
  const addAnswer = () => {
    dispatch({
      type: ACTIONS.ADDANSWER,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }

  const deleteQuestion = () => {
    dispatch({
      type: ACTIONS.DELETEQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }
  return (
    <div className="relative w-full bg-white">
      <div
        className="my-3 w-[calc(100%-50px)] rounded-2xl border border-solid border-black px-2 py-1"
        id="mcq-1"
      >
        <QuestionBuilder
          mcqid={mcqid}
          questionIndex={index}
          text={mcqList[index].question.text}
        />
        {mcqList[index].answers.map((answer, i) => {
          return (
            <AnswerBuilder
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

        <BiMessageSquareAdd onClick={addAnswer} className="icon plus-ans" />
        <div className="mx-auto mt-2 flex w-11/12 justify-end border-t border-solid border-slate-300 pt-1">
          {mcqList.length > 1 && (
            <AiOutlineDelete
              onClick={deleteQuestion}
              className="icon bg-transparent"
            />
          )}
          <BiDuplicate className="icon bg-transparent" />
        </div>
      </div>
      <div className="absolute right-0 top-0 mr-2 mt-4 w-8">
        <AiOutlinePlus onClick={addQuestion} className="icon plus" />
        <BiImageAdd className="icon addimage" />
      </div>
    </div>
  )
}
