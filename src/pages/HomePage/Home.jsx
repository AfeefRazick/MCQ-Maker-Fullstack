import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "../../UserContext/useAuthContext"
import Sidebar from "../../components/Sidebar"
import Hero from "./components/Hero"
import Information from "./components/Information"

export default function Home() {
  const location = useLocation()
  const { auth } = useAuthContext()

  if (auth.isAuthenticated && location.pathname === "/") {
    return <Navigate to={"/dashboard"} />
  }

  return (
    <>
      <Sidebar />
      <div className="mt-16 md:mt-20">
        <Hero />
        <Information />
      </div>
    </>
  )
}
