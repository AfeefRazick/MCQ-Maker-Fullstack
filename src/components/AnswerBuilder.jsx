/* eslint-disable react/prop-types */
import { useContext, useRef } from "react"
import { FaTimes } from "react-icons/fa"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../pages/MCQBuilderPage/MCQbuilderContext"
import { actions } from "../pages/MCQBuilderPage/constants"

export const AnswerBuilder = ({
  mcqid,
  answerid,
  questionIndex,
  index,
  text,
  correctAnswer,
}) => {
  const inputText = useRef("")
  const mcqList = useContext(MCQBuilderContext)
  const dispatch = useContext(MCQBuilderDispatchContext)

  const updateState = () => {
    dispatch({
      type: actions.UPDATEANSWER,
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
      type: actions.DELETEANSWER,
      payload: {
        questionId: mcqid,
        answerId: answerid,
        questionIndex: questionIndex,
        answerIndex: index,
        text: inputText.current.value,
      },
    })
  }
  const selectAnswer = () => {
    dispatch({
      type: actions.MCESELECTANSWER,
      payload: {
        questionId: mcqid,
        answerId: answerid,
        questionIndex: questionIndex,
        answerIndex: index,
      },
    })
  }

  return (
    <div className="flex items-center p-1">
      {/* <FiCircle className="p-1 text-2xl sm:text-3xl" /> */}
      <input
        checked={correctAnswer}
        type="radio"
        name={mcqid}
        id={answerid}
        onChange={selectAnswer}
        value={answerid}
        className="green"
      ></input>
      <input
        ref={inputText}
        type="text"
        onChange={updateState}
        value={text}
        className=" mx-2 w-[70%] border-b-2 border-solid border-transparent bg-white font-lato text-sm placeholder-black focus:border-black focus:outline-0 sm:mx-3 sm:text-base "
        placeholder="Answer Goes Here..."
      ></input>

      {mcqList[questionIndex].answers.length !== 1 && (
        <FaTimes onClick={deleteAnswer} className="icon bg-transparent" />
      )}
    </div>
  )
}
