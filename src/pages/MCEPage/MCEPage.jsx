import { useEffect, useState, useReducer, useRef } from "react"
import { useParams } from "react-router-dom"
import { Loading } from "../../pages/Loading"
import { actions } from "../MCQBuilderPage/constants"
import { MCQReaderContext, MCQReaderDispatchContext } from "./MCQReaderContext"
import { ReadNameDesc } from "./components/ReadNameDesc"
import { McqReadOnly } from "./components/McqReadOnly"
import { MCENotfound } from "../MCENotfound"
import { axiosPublic } from "../../axiosPublic"
import { useAuthContext } from "../../UserContext/useAuthContext"

export const MCEPage = () => {
  const { auth } = useAuthContext()
  const { mceid } = useParams()
  const [loading, setLoading] = useState({ isLoading: true, error: false })
  const [otherInfo, setOtherInfo] = useState({})
  const marksContainer = useRef()
  const [mcqList, dispatch] = useReducer(reducer, [])
  const [information, setInformation] = useState({
    name: "",
    mcqDescription: "",
  })

  const submitAnswers = async () => {
    const response = await axiosPublic.post("mcqSubmission", {
      ...otherInfo,
      mcqArray: mcqList,
    })

    const marks = response.data.marks
    const totalMarks = mcqList.length
    marksContainer.current.innerHTML = `You got ${marks}/${totalMarks} right!`
    marksContainer.current.style.top = "0px"
  }

  useEffect(() => {
    axiosPublic
      .get("mce/" + mceid)
      .then((response) => {
        let data = response.data
        console.log(data)

        setLoading((prev) => {
          return { ...prev, isLoading: false }
        })
        setOtherInfo({
          ownerID: data.ownerID,
          _id: data._id,
          submitterInfo: {
            id: auth.user._id,
            name: auth.user.name,
            email: auth.user.email,
          },
        })
        dispatch({
          type: actions.SETINITIAL,
          payload: {
            mcqList: data.mcqArray,
          },
        })
        setInformation(data.information)
      })
      .catch((err) => {
        console.log(err)
        setLoading((prev) => {
          return { ...prev, isLoading: false, error: true }
        })
      })
  }, [mceid])

  if (loading.isLoading) return <Loading />
  else if (loading.error) return <MCENotfound />

  return (
    <MCQReaderContext.Provider value={mcqList}>
      <MCQReaderDispatchContext.Provider value={dispatch}>
        <div
          ref={marksContainer}
          className="fixed top-[-50%] z-50 flex h-10 w-full items-center  justify-center rounded-b-md bg-black text-lg font-bold text-white transition-[top] duration-500"
        ></div>

        <div className="relative mt-10 flex flex-col items-center px-[4%] md:px-[6%] lg:px-[8%] xl:px-[10%]">
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

          <div className="mb-4 flex w-full justify-end">
            <button
              onClick={submitAnswers}
              className=" rounded-md bg-black px-4 py-1 font-semibold text-white hover:bg-slate-900"
            >
              Submit
            </button>
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
