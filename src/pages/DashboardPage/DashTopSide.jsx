import { MiniLogo } from "../../components/MiniLogo"

// export const DashTop = () => {
//   return (
//     <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-center border-b border-solid border-slate-200 backdrop-blur-md md:h-20 md:justify-center">
//       <nav className="flex h-full w-full items-center justify-between px-2 sm:w-11/12">
//       </nav>
//     </div>
//   )
// }
/* eslint-disable react/prop-types */

import { useState } from "react"
import { CgMenu } from "react-icons/cg"
import Button from "../../components/Button"
import mainlinks from "../../components/Linknames"
import { v4 as uuidv4 } from "uuid"

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
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow(!show)
  }

  const closeSidebar = () => {
    setShow(false)
  }

  return (
    <>
      <nav className="fixed top-0 z-10 flex h-16 w-full items-center justify-center border-b border-solid border-slate-200 backdrop-blur-md md:h-20 md:justify-center">
        <div className="flex h-full w-full items-center justify-between md:w-11/12">
          <MenuIcon click={handleClick} />
          <MiniLogo />

          <div className="flex h-full w-[85vw] items-center justify-between md:justify-start">
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
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 z-20 flex h-screen w-72 flex-col overflow-hidden bg-white py-2 shadow-boxshadow transition-all duration-500 ease-in-out md:left-0 md:top-20 ${
          show ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex items-center md:hidden">
          <MenuIcon click={handleClick} />
        </div>
        <ul className="p-3">
          {mainlinks.map((slink) => {
            return (
              // <SidebarRow key={slink.id} link={slink} func={closeSidebar} />
              <div key={uuidv4()}>rgdgdfdgdfgf</div>
            )
          })}
        </ul>
      </div>
    </>
  )
}
