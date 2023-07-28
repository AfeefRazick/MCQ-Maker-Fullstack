/* eslint-disable react/prop-types */

import { useState } from "react"
import { Link } from "react-router-dom"
import { CgMenu } from "react-icons/cg"
import { TbEdit } from "react-icons/tb"
import mainlinks from "./Linknames"
import Button from "./Button"
import { Logo } from "./Logo"

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
function SidebarRow(props) {
  return (
    <li className="w-full cursor-pointer rounded-lg px-3 py-2 font-rubik hover:bg-slate-300">
      <Link
        className="text-lg text-black"
        to={props.link.url}
        onClick={props.func}
      >
        {props.link.text}
      </Link>
    </li>
  )
}

export default function Sidebar() {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  const closeSidebar = () => {
    setShow(false)
  }

  return (
    <>
      <nav className="fixed top-0 z-10 flex  h-16 w-full items-center justify-center border-b border-solid border-slate-200 backdrop-blur-md md:h-20 md:justify-center">
        <div className="flex h-full w-full items-center justify-start md:w-auto md:justify-center">
          <MenuIcon click={handleClick} />

          <div className="flex h-full w-[85vw] items-center justify-between md:justify-start">
            <Logo />

            <div className="hidden h-full items-center justify-end md:flex md:w-[42vw] lg:w-[48vw] xl:w-[53vw]">
              {mainlinks.map((link) => {
                return (
                  <Button
                    key={link.id}
                    linkpath={link.url}
                    buttonStyle="btn-nav"
                    className={"h-full text-center"}
                  >
                    {link.text}
                  </Button>
                )
              })}
            </div>
            <Button
              className="hidden sm:block"
              buttonStyle="btn-calltoaction"
              linkpath="/mcq-builder"
            >
              Lets Design
              <TbEdit className="relative  ml-1 text-xl" />
            </Button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 z-20 flex h-screen w-72 flex-col overflow-hidden bg-white py-2 shadow-boxshadow transition-all duration-500 ease-in-out md:hidden ${
          show ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex items-center">
          <MenuIcon click={handleClick} />
          <Logo />
        </div>
        <ul className="p-3">
          {mainlinks.map((slink) => {
            return (
              <SidebarRow key={slink.id} link={slink} func={closeSidebar} />
            )
          })}
        </ul>
      </div>
    </>
  )
}
