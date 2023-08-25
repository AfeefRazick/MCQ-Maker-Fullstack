/* eslint-disable react/prop-types */
import { useContext } from "react"
import { MCQReaderDispatchContext } from "../MCQReaderContext"
import { actions } from "../../MCQBuilderPage/constants"

export const AnswerReadOnly = ({
  mcqid,
  answerid,
  questionIndex,
  index,
  text,
  selected,
  // correct,
}) => {
  // const mcqList = useContext(MCQReaderContext)
  const dispatch = useContext(MCQReaderDispatchContext)

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
  // if (selected) console.log(correct)
  return (
    <div className={`flex w-full items-center p-1`}>
      <input
        checked={selected}
        type="radio"
        name={mcqid}
        id={answerid}
        onChange={selectAnswer}
        value={answerid}
        className=""
      ></input>

      <label
        className={`mx-2 w-[calc(100%-30px)] cursor-pointer font-lato text-sm sm:mx-3 sm:text-base md:text-lg`}
        htmlFor={answerid}
      >
        {text}
      </label>
    </div>
  )
}
