/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Button from "./Button"
import { Logo } from "./Logo"

export const BuilderOptions = ({ sendCreateMCE, sendUpdateMCE, mce_id }) => {
  const [mceCreated, setMceCreated] = useState(false)
  useEffect(() => {
    if (mce_id !== "") setMceCreated(true)
  }, [mce_id])

  return (
    <div className="fixed top-0 z-10 flex h-16 w-full justify-center md:h-20">
      <div className="flex h-full w-full items-center justify-between sm:w-11/12">
        <Logo />
        <div>
          {/* //implement eye preview */}
          {mceCreated ? (
            <Button
              buttonStyle="btn-small"
              className=""
              onClick={sendUpdateMCE}
            >
              Update
            </Button>
          ) : (
            <Button
              buttonStyle="btn-small"
              className=""
              onClick={sendCreateMCE}
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
