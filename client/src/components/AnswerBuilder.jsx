/* eslint-disable react/prop-types */
import { ACTIONS } from "../pages/MCQBuilderPage/MCQBuilder"
import { useContext, useRef } from "react"
import { FaTimes } from "react-icons/fa"
import { FiCircle } from "react-icons/fi"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../pages/MCQBuilderPage/MCQbuilderContext"

export const AnswerBuilder = ({
  mcqid,
  answerid,
  questionIndex,
  index,
  text,
}) => {
  const inputText = useRef("")
  const mcqList = useContext(MCQBuilderContext)
  const dispatch = useContext(MCQBuilderDispatchContext)

  const updateState = () => {
    dispatch({
      type: ACTIONS.UPDATEANSWER,
      payload: {
        questionId: mcqid,
        answerId: answerid,
        questionIndex: questionIndex,
        answerIndex: index,
        text: inputText.current.value,
      },
    })
  }
  const deleteAnswer = () => {
    dispatch({
      type: ACTIONS.DELETEANSWER,
      payload: {
        questionId: mcqid,
        answerId: answerid,
        questionIndex: questionIndex,
        answerIndex: index,
        text: inputText.current.value,
      },
    })
  }

  return (
    <div className="flex items-center">
      <FiCircle className="p-1 text-2xl sm:text-3xl" />
      <input
        ref={inputText}
        type="text"
        onChange={updateState}
        value={text}
        className="my-1 w-[70%] border-b-2 border-solid border-transparent bg-white px-2 pt-1 font-lato text-sm placeholder-black focus:border-black focus:outline-0 sm:px-3 sm:pt-2 sm:text-base "
        placeholder="Answer Goes Here..."
      ></input>

      {mcqList[questionIndex].answers.length !== 1 && (
        <FaTimes onClick={deleteAnswer} className="icon bg-transparent" />
      )}
    </div>
  )
}
