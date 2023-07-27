import { v4 as uuidv4 } from "uuid"
import Axios from "axios"
import { useReducer, useState } from "react"
import { MCQ } from "../../components/MCQ"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "./MCQbuilderContext"
import { MCQUrlModal } from "../../components/MCQUrlModal"
import { BuilderOptions } from "../../components/BuilderOptions"
import Sidebar from "../../components/Sidebar"

export const ACTIONS = {
  UPDATEANSWER: "updateanswer",
  UPDATEQUESTION: "updatequestion",
  ADDQUESTION: "addquestion",
  ADDANSWER: "addanswer",
  DELETEQUESTION: "deletequestion",
  DELETEANSWER: "deleteanswer",
}
// reducer function is used to change the state. arguements taken are the state and an action object
// the action object has a action.type, indicating which action has been taken to update the state accordingly
// the action.payload passed provides the (some new)data need to change the state appropriately
function newMCQ() {
  return { id: uuidv4(), question: { text: "" }, answers: [newAnswer()] }
}
function newAnswer() {
  return { id: uuidv4(), text: "" }
}

function reducer(mcqs, action) {
  let tempMCQs = mcqs
  switch (action.type) {
    case ACTIONS.ADDQUESTION:
      tempMCQs.splice(action.payload.questionIndex + 1, 0, newMCQ())
      return [...tempMCQs]

    case ACTIONS.ADDANSWER:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          return {
            ...mcq,
            answers: [...mcq.answers, newAnswer()],
          }
        } else {
          return mcq
        }
      })

    case ACTIONS.DELETEQUESTION:
      tempMCQs.splice(action.payload.questionIndex, 1)

      return [...tempMCQs]

    case ACTIONS.DELETEANSWER:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          let answers = mcq.answers.map((x) => x)
          answers.splice(action.payload.answerIndex, 1)
          return {
            ...mcq,
            answers: [...answers],
          }
        } else {
          return mcq
        }
      })

    case ACTIONS.UPDATEQUESTION:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          return {
            ...mcq,
            question: { ...mcq.question, text: action.payload.text },
          }
        } else {
          return mcq
        }
      })
    case ACTIONS.UPDATEANSWER:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          return {
            ...mcq,

            answers: mcq.answers.map((answer) => {
              if (answer.id === action.payload.answerId) {
                return { ...answer, text: action.payload.text }
              } else {
                return answer
              }
            }),
          }
        } else {
          return mcq
        }
      })
    default:
      return mcqs
  }
}
export const MCQBuilder = () => {
  // mcqlist object is the state that represents all the mcqs, question and answers
  const [mcqList, dispatch] = useReducer(reducer, [newMCQ()])
  const [mce_id, setMce_id] = useState("")
  const [showModal, setShowModal] = useState(false)

  const sendCreateMCE = () => {
    Axios.post("http://localhost:3002/createmce", {
      name: "WEB SEM 100",
      mcqArray: mcqList,
    }).then((response) => {
      console.log(response)
      setMce_id(response.data._id)
      setShowModal(true)
    })
  }

  const sendUpdateMCE = () => {
    Axios.put("http://localhost:3002/updatemce", {})
  }

  return (
    <MCQBuilderContext.Provider value={mcqList}>
      <MCQBuilderDispatchContext.Provider value={dispatch}>
        <BuilderOptions
          sendUpdateMCE={sendUpdateMCE}
          sendCreateMCE={sendCreateMCE}
        />
        <div className="relative mt-10 flex flex-col items-center md:mt-16">
          {/* {mceUrl && (
            <dialog className="flex h-screen w-screen items-center justify-center">
              {mceUrl._id}
            </dialog>
          )} */}
          <MCQUrlModal
            showModal={showModal}
            setShowModal={setShowModal}
            mce_id={mce_id}
          />

          <div
            className="mt-10 flex h-auto w-[90%] flex-col items-center justify-center rounded-xl py-5 md:px-[2%] xl:px-[2%]"
            id="mcq-container"
          >
            {mcqList.map((mcq, index) => {
              return <MCQ key={mcq.id} mcqid={mcq.id} index={index} />
            })}
          </div>
        </div>
      </MCQBuilderDispatchContext.Provider>
    </MCQBuilderContext.Provider>
  )
}
