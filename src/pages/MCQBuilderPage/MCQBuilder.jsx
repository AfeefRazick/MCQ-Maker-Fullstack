import { v4 as uuidv4 } from "uuid"
import Axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { Mcq } from "../../components/Mcq"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "./MCQbuilderContext"
import { MCQUrlModal } from "../../components/MCQUrlModal"
import { BuilderOptions } from "../../components/BuilderOptions"
import { actions } from "./constants"
import { BuilderNameDesc } from "../../components/BuilderNameDesc"
import { useAuthContext } from "../../UserContext/useAuthContext"
import { useNavigate, useParams } from "react-router-dom"

export const MCQBuilder = () => {
  const { mceid } = useParams()
  const navigate = useNavigate()
  const { auth } = useAuthContext()
  // mcqlist object is the state that represents all the mcqs, question and answers
  const [mcqList, dispatch] = useReducer(reducer, [newMCQ()])
  const [information, setInformation] = useState({
    name: "Untitled MCQ",
    mcqDescription: "",
  })
  const [mce_id, setMce_id] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    setUpdated(false)
  }, [mcqList, information])
  console.log(information)

  const sendCreateMCE = () => {
    if (!mceid) {
      Axios.post(import.meta.env.VITE_SERVER_URL + "/mce", {
        ownerID: auth.user._id,
        information: information,
        mcqArray: mcqList,
        mcqSubmissions: [],
      }).then((response) => {
        console.log(response)
        setMce_id(response.data._id)
        setShowModal(true)
        setUpdated(true)
      })
    }
  }

  const sendUpdateMCE = () => {
    Axios.put(import.meta.env.VITE_SERVER_URL + "/mce", {
      id: mce_id,
      ownerID: auth.user._id,
      information: information,
      mcqArray: mcqList,
    }).then((response) => {
      setUpdated(true)
      console.log(response.data)
    })
  }

  useEffect(() => {
    if (mceid) {
      Axios.get(import.meta.env.VITE_SERVER_URL + "/mce/" + mceid)
        .then((response) => {
          console.log(mceid)
          let data = response.data
          console.log(data)
          // setLoading((prev) => {
          //   return { ...prev, isLoading: false }
          // })
          if (data) {
            dispatch({
              type: actions.SETINITIAL,
              payload: {
                mcqList: data.mcqArray,
              },
            })
            setInformation(data.information)
            setMce_id(mceid)
            // setUpdated(true)
          } else {
            navigate("/error")
            console.log("mcq builder does not exist" + data)
          }
        })
        .catch((err) => {
          console.log(err)
          // setLoading((prev) => {
          //   return { ...prev, isLoading: false, error: true }
          // })
        })
    }
  }, [])

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
                {import.meta.env.VITE_CLIENT_URL + mce_id}
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
            // answers: mcq.answers.map((answer) => {
            //   if (answer.id === action.payload.answerId) {
            //     return { ...answer, text: action.payload.text }
            //   } else {
            //     return answer
            //   }
            // }),
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
