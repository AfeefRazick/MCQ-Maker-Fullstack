import { CgCarousel } from "react-icons/cg"
import { Link } from "react-router-dom"
import { useAuthContext } from "../UserContext/useAuthContext"

export const ResponsiveLogo = () => {
  const { auth } = useAuthContext()

  return (
    <div className="flex items-center">
      <Link
        to={auth?.isAuthenticated ? "/dashboard" : "/"}
        className="mx-1 cursor-pointer font-nunito text-3xl text-cyan-500 "
      >
        <CgCarousel className="relative top-1 mx-1 w-10 rounded-lg bg-black text-white" />
        <span className="hidden sm:inline">
          <span className="text-black">MCQ</span> Maker
        </span>
      </Link>
    </div>
  )
}
