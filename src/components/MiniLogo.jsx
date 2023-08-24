import { CgCarousel } from "react-icons/cg"
import { Link } from "react-router-dom"

export const MiniLogo = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="mx-1 cursor-pointer font-nunito text-3xl text-cyan-500 "
      >
        <CgCarousel className="relative top-1 mx-1 w-10 rounded-lg bg-black text-white" />
      </Link>
    </div>
  )
}
