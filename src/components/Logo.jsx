import { Link } from "react-router-dom"
import { CgCarousel } from "react-icons/cg"
import { useAuthContext } from "../UserContext/useAuthContext"

export function Logo() {
  const { auth } = useAuthContext()
  return (
    <Link
      to={auth?.isAuthenticated ? "/dashboard" : "/"}
      className="mx-1 cursor-pointer font-nunito text-3xl text-cyan-500 "
    >
      <CgCarousel className="relative top-1 mx-1 w-10 rounded-lg bg-black text-white" />
      <span className="text-black">MCQ</span> Maker
    </Link>
  )
}
