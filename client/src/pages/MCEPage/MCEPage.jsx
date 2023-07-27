import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"

export const SERVER_URL = "http://localhost:3002"

export const MCEPage = () => {
  const { mceid } = useParams()
  const [mce, setMce] = useState({})
  useEffect(() => {
    Axios.get(SERVER_URL + "/" + mceid).then((response) => {
      setMce(response.data)
    })
  }, [])

  return <div className="relative mt-10 md:mt-20">{mce.name}</div>
}
