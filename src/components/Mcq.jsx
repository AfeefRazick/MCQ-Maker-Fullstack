/* eslint-disable react/prop-types */
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"
import { BiImageAdd, BiMessageSquareAdd, BiDuplicate } from "react-icons/bi"
import { AnswerBuilder } from "./AnswerBuilder"
import { QuestionBuilder } from "./QuestionBuilder"
import { useContext } from "react"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../pages/MCQBuilderPage/MCQbuilderContext"
import { actions } from "../pages/MCQBuilderPage/constants"

export const Mcq = ({ index, mcqid }) => {
  const mcqList = useContext(MCQBuilderContext)
  const dispatch = useContext(MCQBuilderDispatchContext)

  const addQuestion = () => {
    dispatch({
      type: actions.ADDQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }
  const addAnswer = () => {
    dispatch({
      type: actions.ADDANSWER,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }

  const deleteQuestion = () => {
    dispatch({
      type: actions.DELETEQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }
  return (
    <div className="group/mcq relative w-full bg-white">
      <div
        tabIndex={"0"}
        className="my-3 w-[calc(100%-40px)] rounded-xl border border-solid border-black px-2 py-1"
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
        <div className="mx-auto mt-2 grid w-11/12 grid-rows-[0fr] justify-end  border-solid border-slate-300 pt-1 transition-all  group-focus-within/mcq:grid-rows-[1fr] group-focus-within/mcq:border-t ">
          <div className="overflow-hidden">
            {mcqList.length > 1 && (
              <AiOutlineDelete
                onClick={deleteQuestion}
                className="icon bg-transparent"
              />
            )}
            <BiDuplicate className="icon bg-transparent" />
          </div>
        </div>
      </div>

      <div className="mr absolute right-0 top-0 mt-4 w-8">
        <AiOutlinePlus onClick={addQuestion} className="icon plus" />
        <BiImageAdd className="icon addimage" />
      </div>
    </div>
  )
}
