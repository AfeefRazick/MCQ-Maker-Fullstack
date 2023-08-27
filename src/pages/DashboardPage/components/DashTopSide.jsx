/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid"
import { useState } from "react"
import { Link } from "react-router-dom"
import { PiHouse } from "react-icons/pi"
import { CgMenu } from "react-icons/cg"
import { MiniLogo } from "../../../components/MiniLogo"
import { useAuthContext } from "../../../UserContext/useAuthContext"
import { LOGOUT_SUCCESS } from "../../../UserContext/authActionTypes"
import mainlinks from "../../../components/Linknames"
import { PinnedMCQs } from "./PinnedMCQs"

function MenuIcon({ click }) {
  return (
    <button
      className="mx-2 my-1 flex h-10 w-10 items-center justify-center rounded-full border-0 hover:cursor-pointer hover:bg-slate-200 md:hidden"
      onClick={click}
    >
      <CgMenu className="text-3xl" />
    </button>
  )
}

export const DashTopSide = () => {
  const [show, setShow] = useState(false)
  const { auth, dispatch } = useAuthContext()

  const logout = () => {
    dispatch({ type: LOGOUT_SUCCESS })
  }

  const handleClick = () => {
    setShow(!show)
  }

  // const closeSidebar = () => {
  //   setShow(false)
  // }

  return (
    <>
      <nav className="fixed top-0 z-10 flex h-16 w-full items-center justify-center border-b border-solid border-slate-200 backdrop-blur-md md:h-20 md:justify-center">
        <div className="flex h-full w-full items-center justify-between md:w-11/12">
          <div className="flex ">
            <MenuIcon click={handleClick} />
            <MiniLogo />
          </div>
          <div className="flex h-full w-[85vw] items-center justify-end ">
            <Link
              title="Home"
              className="grid place-content-center"
              to={"/home"}
            >
              <PiHouse className="icon-lg " />
            </Link>
            <img
              referrerPolicy="no-referrer"
              className="mx-2 w-8 rounded-full"
              src={auth?.user?.picture}
              alt="profile image"
            />
          </div>
        </div>
      </nav>

      <div
        className={`custom-scroll fixed top-0 z-20 flex h-screen w-64 flex-col overflow-hidden overflow-y-scroll bg-white px-3 py-2 shadow-lg transition-[left] duration-500 ease-in-out md:left-0 md:top-20 ${
          show ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex items-center justify-between md:hidden">
          <MenuIcon click={handleClick} />
          <MiniLogo />
        </div>

        <ul className="flex flex-col">
          {mainlinks.map((link) => {
            return (
              <Link
                key={uuidv4()}
                className="mt-2 flex items-center rounded-lg px-2 py-0.5 font-lato text-base text-black hover:bg-stone-100"
                to={link.url}
              >
                <link.icon className="mr-2 text-xl" />

                {link.text}
              </Link>
            )
          })}
        </ul>

        <PinnedMCQs />

        <button
          className="mt-4 rounded-md bg-black py-1 font-semibold text-white hover:bg-slate-900"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  )
}
