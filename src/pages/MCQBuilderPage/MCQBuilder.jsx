import { v4 as uuidv4 } from "uuid"
import { axiosPublic } from "../../axiosPublic"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useReducer, useRef, useState } from "react"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "./MCQbuilderContext"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { actions } from "./constants"
import { BuilderOptions } from "./components/BuilderOptions"
import { BuilderNameDesc } from "./components/BuilderNameDesc"
import { Mcq } from "./components/Mcq"
import { MCQUrlModal } from "./components/MCQUrlModal"

export const MCQBuilder = () => {
  const { mceid } = useParams()
  const navigate = useNavigate()
  const { auth } = useAuthContext()
  const copiedMessage = useRef()
  const messageContainer = useRef()

  // mcqlist object is the state that represents all the mcqs, question and answers
  const [mcqList, dispatch] = useReducer(reducer, [newMCQ()])
  const [information, setInformation] = useState({
    name: "Untitled MCQ",
    mcqDescription: "",
  })
  const [mce_id, setMce_id] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [updated, setUpdated] = useState(true)

  useEffect(() => {
    setUpdated(false)
    // can implement builder persisting data during session by mutating auth.user.mult...
  }, [mcqList, information])

  const mceValidationMessage = (information, mcqList) => {
    let message = ""

    if (information.name === "") {
      message = "MCQ must have name"
    } else {
      mcqList.map((mcq) => {
        let answerMessage

        mcq.answers.map((answer) => {
          if (answer.text === "") {
            answerMessage = "Answers cannot be empty"
          }
        })

        if (mcq.question.text === "") {
          message = "Questions cannot be empty"
        } else if (answerMessage) {
          message = answerMessage
        } else if (mcq.correctAnswerId === 1) {
          message =
            "Make sure a correct answer has been selected for all questions"
        }
      })
    }
    if (message) {
      copiedMessage.current.innerHTML = message
      messageContainer.current.style.top = "70px"
      setTimeout(() => {
        if (messageContainer?.current?.style?.top) {
          messageContainer.current.style.top = "-100%"
        }
      }, 5000)
    }
    return message
  }

  const sendCreateMCE = () => {
    if (!mceid) {
      const message = mceValidationMessage(information, mcqList)
      if (message) {
        return
      } else {
        axiosPublic
          .post("mce", {
            ownerID: auth.user._id,
            information: information,
            mcqArray: mcqList,
            mcqSubmissions: [],
          })
          .then((response) => {
            console.log(response)
            setMce_id(response.data._id)
            setShowModal(true)
            setUpdated(true)
          })
      }
    }
  }
  const sendUpdateMCE = () => {
    if (mceValidationMessage(information, mcqList)) {
      return
    } else {
      axiosPublic
        .put("mce", {
          id: mce_id,
          ownerID: auth.user._id,
          information: information,
          mcqArray: mcqList,
        })
        .then((response) => {
          setUpdated(true)
          console.log(response.data)
        })
    }
  }

  useEffect(() => {
    if (mceid) {
      let mce = auth.user.multipleChoiceExams.find((mce) => {
        if (mce._id === mceid) return mce
      })

      if (mce) {
        dispatch({
          type: actions.SETINITIAL,
          payload: {
            mcqList: mce.mcqArray,
          },
        })
        setInformation(mce.information)
        setMce_id(mceid)
        // setUpdated(true)
      } else {
        navigate("/builder-notfound")
        console.log("mcq builder does not exist")
      }
    }
  }, [mceid, navigate, auth.user.multipleChoiceExams])

  return (
    <MCQBuilderContext.Provider value={mcqList}>
      <MCQBuilderDispatchContext.Provider value={dispatch}>
        <BuilderOptions
          sendUpdateMCE={sendUpdateMCE}
          sendCreateMCE={sendCreateMCE}
          mce_id={mce_id}
          updated={updated}
        />

        <div className="relative mt-16 flex flex-col items-center px-[4%] md:mt-20 md:px-[6%] lg:px-[8%] xl:px-[10%]">
          <MCQUrlModal
            showModal={showModal}
            setShowModal={setShowModal}
            mce_id={mce_id}
          />
          {mce_id !== "" && (
            <div className="flex w-full justify-center rounded-b-lg bg-black px-2">
              <p className="no-scrollbar select-all overflow-x-scroll whitespace-nowrap  py-1 text-center text-main underline">
                {import.meta.env.VITE_CLIENT_URL + "mcq/" + mce_id}
              </p>
            </div>
          )}

          <BuilderNameDesc
            information={information}
            setInformation={setInformation}
          />

          <div
            className=" mt-5 flex h-auto w-full flex-col items-center justify-center rounded-xl "
            id="mcq-container"
          >
            {mcqList.map((mcq, index) => {
              return (
                <Mcq
                  key={mcq.id}
                  mcqObject={mcq}
                  mcqid={mcq.id}
                  index={index}
                />
              )
            })}
          </div>
        </div>

        <div
          ref={messageContainer}
          className="fixed top-[-100%] z-50 flex h-10 w-full justify-center  text-white transition-[top] duration-500"
        >
          <p
            className="rounded-md bg-red-600 px-3 py-2 "
            ref={copiedMessage}
          ></p>
        </div>
      </MCQBuilderDispatchContext.Provider>
    </MCQBuilderContext.Provider>
  )
}

function newMCQ() {
  return {
    id: uuidv4(),
    question: { text: "" },
    correctAnswerId: 1,
    answers: [newAnswer()],
  }
}
function newAnswer() {
  return { id: uuidv4(), text: "" }
}

const reducer = (mcqs, action) => {
  let tempMCQs = mcqs
  switch (action.type) {
    case actions.ADDQUESTION:
      tempMCQs.splice(action.payload.questionIndex + 1, 0, newMCQ())
      return [...tempMCQs]

    case actions.ADDANSWER:
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

    case actions.DELETEQUESTION:
      tempMCQs.splice(action.payload.questionIndex, 1)

      return [...tempMCQs]

    case actions.DELETEANSWER:
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

    case actions.UPDATEQUESTION:
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
    case actions.UPDATEANSWER:
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
    case actions.DUPLICATEQUESTION:
      tempMCQs.splice(action.payload.questionIndex + 1, 0, {
        ...mcqs[action.payload.questionIndex],
        id: uuidv4(),
      })
      return [...tempMCQs]

    case actions.MCESELECTANSWER:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          return {
            ...mcq,
            correctAnswerId: action.payload.answerId,
          }
        } else {
          return mcq
        }
      })
    case actions.SETINITIAL:
      return [...action.payload.mcqList]

    default:
      return mcqs
  }
}
