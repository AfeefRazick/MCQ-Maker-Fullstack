/* eslint-disable react/prop-types */
import { useContext } from "react"

export const MCEPortalAnswer = ({
  mcqid,
  answerid,
  questionIndex,
  index,
  text,
  selected,
  // correct,
}) => {
  // if (selected) console.log(correct)
  return (
    <div className={`flex w-full items-center p-1`}>
      <input
        checked={selected}
        type="radio"
        name={mcqid}
        id={answerid}
        onChange={() => {}}
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
