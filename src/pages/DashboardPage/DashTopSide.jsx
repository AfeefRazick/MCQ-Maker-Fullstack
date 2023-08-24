/* eslint-disable react/prop-types */
import { MiniLogo } from "../../components/MiniLogo"
import { useState } from "react"
import { CgMenu } from "react-icons/cg"
import Button from "../../components/Button"
import mainlinks from "../../components/Linknames"
import axios from "axios"
import { useAuthContext } from "../../UserContext/useAuthContext"
import {
  DELETE_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../../UserContext/authActionTypes"
import { Link } from "react-router-dom"

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
  const deleteAccount = async () => {
    const deleteResponse = await axios.delete(
      import.meta.env.VITE_SERVER_URL + "/user/delete/" + auth.user.credential
    )
    if (deleteResponse.data.deletedCount === 1) {
      dispatch({ type: DELETE_USER_SUCCESS })
    }
  }
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
        className={`fixed top-0 z-20 flex h-screen w-72 flex-col overflow-hidden bg-white py-2 shadow-lg transition-[left] duration-500 ease-in-out md:left-0 md:top-20 ${
          show ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="flex items-center md:hidden">
          <MenuIcon click={handleClick} />
        </div>
        <ul className="p-3"></ul>
        <Link className="bg-green-400" to={"/mcq-builder"}>
          Create MCQ
        </Link>
        <button onClick={logout}>Log Out</button>
        <button className="bg-red-600" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  )
}
