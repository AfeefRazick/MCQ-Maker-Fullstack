import { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { Loading } from "../../components/Loading"
// import { v4 as uuidv4 } from "uuid"

// import { actions, clientUrl } from "./constants"
import {
  MCQBuilderContext,
  MCQBuilderDispatchContext,
} from "../MCQBuilderPage/MCQbuilderContext"
import { actions } from "../MCQBuilderPage/constants"
import { McqReadOnly } from "../../components/McqReadOnly"
import { ReadNameDesc } from "../../components/ReadNameDesc"

export const MCEPage = () => {
  const { mceid } = useParams()
  const [loading, setLoading] = useState(true)
  // const [mce, setMce] = useState({})

  const [mcqList, dispatch] = useReducer(reducer, [])
  const [information, setInformation] = useState({
    name: "",
    mcqDescription: "",
  })

  useEffect(() => {
    Axios.get(import.meta.env.VITE_SERVER_URL + "/" + mceid).then(
      (response) => {
        let data = response.data
        setLoading(false)
        dispatch({
          type: actions.SETINITIAL,
          payload: {
            mcqList: data.mcqArray,
          },
        })
        setInformation(data.information)
      }
    )
  }, [])

  // const setInitialMcqList = ()=>{

  // }

  if (loading) return <Loading />

  return (
    <MCQBuilderContext.Provider value={mcqList}>
      <MCQBuilderDispatchContext.Provider value={dispatch}>
        <div className="relative mt-16 flex flex-col items-center px-[4%] md:mt-20 md:px-[6%] lg:px-[8%] xl:px-[10%]">
          <ReadNameDesc
            information={information}
            setInformation={setInformation}
          />

          <div
            className=" mt-5 flex h-auto w-full flex-col items-center justify-center rounded-xl "
            id="mcq-container"
          >
            {mcqList.map((mcq, index) => {
              return <McqReadOnly key={mcq.id} mcqid={mcq.id} index={index} />
            })}
          </div>
        </div>
      </MCQBuilderDispatchContext.Provider>
    </MCQBuilderContext.Provider>
  )
}

// reducer function is used to change the state. arguements taken are the state and an action object
// the action object has a action.type, indicating which action has been taken to update the state accordingly
// the action.payload passed provides the (some new)data need to change the state appropriately

const reducer = (mcqs, action) => {
  // let tempMCQs = mcqs
  switch (action.type) {
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
    case actions.SETINITIAL:
      return [...action.payload.mcqList]

    default:
      return mcqs
  }
}

// export const MCQBuilder = () => {
//   // mcqlist object is the state that represents all the mcqs, question and answers

//   const [mce_id, setMce_id] = useState("")
//   // const [showModal, setShowModal] = useState(false)
//   // const [updated, setUpdated] = useState(false)

//   // useEffect(() => {
//   //   setUpdated(false)
//   // }, [mcqList, information])

//   // const sendCreateMCE = () => {
//   //   Axios.post("http://localhost:3002/createmce", {
//   //     information: information,
//   //     mcqArray: mcqList,
//   //   }).then((response) => {
//   //     console.log(response)
//   //     setMce_id(response.data._id)
//   //     setShowModal(true)
//   //     setUpdated(true)
//   //   })
//   // }

//   // const sendUpdateMCE = () => {
//   //   Axios.put("http://localhost:3002/updatemce", {
//   //     id: mce_id,
//   //     information: information,
//   //     mcqArray: mcqList,
//   //   }).then((response) => {
//   //     setUpdated(true)
//   //     console.log(response.data)
//   //   })
//   // }
// }
