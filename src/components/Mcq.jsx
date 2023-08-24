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

export const Mcq = ({ index, mcqid, mcqObject }) => {
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
  const duplicateQuestion = () => {
    dispatch({
      type: actions.DUPLICATEQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: index,
      },
    })
  }
  return (
    <div className="group/mcq relative w-full bg-white">
      <div
        onFocus={(e) => {
          e.target.firstElementChild?.firstElementChild?.focus?.()
        }}
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
              correctAnswer={mcqObject.correctAnswerId === answer.id}
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

        <BiMessageSquareAdd
          title="Add Answer"
          onClick={addAnswer}
          className="icon plus-ans"
        />
        <div className="mx-auto mt-2 grid w-11/12 grid-rows-[0fr] justify-end  border-solid border-slate-300 pt-1 transition-all  group-focus-within/mcq:grid-rows-[1fr] group-focus-within/mcq:border-t ">
          <div className="overflow-hidden">
            {mcqList.length > 1 && (
              <AiOutlineDelete
                title="Delete Question"
                onClick={deleteQuestion}
                className="icon bg-transparent"
              />
            )}
            <BiDuplicate
              title="Duplicate Question"
              onClick={duplicateQuestion}
              className="icon bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mr absolute right-0 top-0 mt-4 w-8">
        <AiOutlinePlus
          title="Add Question"
          onClick={addQuestion}
          className="icon plus"
        />
        <BiImageAdd title="Add Image" className="icon addimage" />
      </div>
    </div>
  )
}
