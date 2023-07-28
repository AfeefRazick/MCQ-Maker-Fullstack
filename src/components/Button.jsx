/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const Button = ({
  children,
  type,
  onClick, //imp
  buttonStyle, //imp
  className, //imp
  linkpath, //imp
}) => {
  const checkButtonStyle = buttonStyle ? buttonStyle : "btn-nav"

  return (
    <Link to={linkpath} className={className}>
      <button
        className={`btn ${checkButtonStyle}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  )
}

export default Button
