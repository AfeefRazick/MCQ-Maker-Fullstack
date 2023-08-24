/* eslint-disable react/prop-types */
import { BsLink45Deg } from "react-icons/bs"
import { Link } from "react-router-dom"

export const GetLink = ({ link }) => {
  return (
    <Link title="Get Link" className="flex items-center" to={link}>
      <BsLink45Deg className="icon-lg " />
    </Link>
  )
}
