import { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import { Loading } from "../../components/Loading"
import { actions } from "../MCQBuilderPage/constants"
import { McqReadOnly } from "../../components/McqReadOnly"
import { ReadNameDesc } from "../../components/ReadNameDesc"
import { MCQReaderContext, MCQReaderDispatchContext } from "./MCQReaderContext"

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

  if (loading) return <Loading />

  return (
    <MCQReaderContext.Provider value={mcqList}>
      <MCQReaderDispatchContext.Provider value={dispatch}>
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
              return (
                <McqReadOnly
                  key={mcq.id}
                  mcqObject={mcq}
                  mcqid={mcq.id}
                  index={index}
                />
              )
            })}
          </div>
        </div>
      </MCQReaderDispatchContext.Provider>
    </MCQReaderContext.Provider>
  )
}

const reducer = (mcqs, action) => {
  // let tempMCQs = mcqs
  switch (action.type) {
    case actions.MCESELECTANSWER:
      return mcqs.map((mcq) => {
        if (mcq.id === action.payload.questionId) {
          return {
            ...mcq,
            selectedAnswerId: action.payload.answerId,
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
