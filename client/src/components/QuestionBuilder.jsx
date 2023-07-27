/* eslint-disable react/prop-types */

import { useContext, useRef, useState } from "react"
import {
  // MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../pages/MCQBuilderPage/MCQbuilderContext"
import { ACTIONS } from "../pages/MCQBuilderPage/MCQBuilder"

export const QuestionBuilder = ({ mcqid, questionIndex, text }) => {
  const quest = useRef("")
  // const mcqList = useContext(MCQBuilderContext)
  const dispatch = useContext(MCQBuilderDispatchContext)

  let [rows, setRows] = useState(1)
  let [cols, setCols] = useState(Math.floor(window.innerWidth / 12))
  window.addEventListener("resize", () => {
    setCols(Math.floor(window.innerWidth / 12))
  })
  const update = () => {
    let rownum = Math.max(
      1,
      Math.floor((quest.current.value.length - 3) / cols) + 1
    )
    setRows(rownum)
    //
    dispatch({
      type: ACTIONS.UPDATEQUESTION,
      payload: {
        questionId: mcqid,
        questionIndex: questionIndex,
        text: quest.current.value,
      },
    })
  }
  return (
    <div className="question-builder">
      <textarea
        cols={cols}
        rows={rows}
        className="m-1 resize-none overflow-y-hidden rounded-2xl bg-cyan-300 px-3 py-2 font-nunito text-sm placeholder-black sm:text-base xl:px-4"
        placeholder="Question Goes Here..."
        ref={quest}
        onChange={update}
        value={text}
      ></textarea>
    </div>
  )
}
