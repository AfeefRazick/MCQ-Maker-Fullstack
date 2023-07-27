/* eslint-disable react/prop-types */
import Button from "./Button"
import { Logo } from "./Logo"

export const BuilderOptions = ({ sendCreateMCE, sendUpdateMCE }) => {
  return (
    <div className="fixed top-0 z-10 flex h-20 w-full justify-center">
      <div className="flex h-full w-11/12  items-center justify-between">
        <Logo />
        <div>
          <Button buttonStyle="btn-small" className="" onClick={sendUpdateMCE}>
            Update
          </Button>
          <Button buttonStyle="btn-small" className="" onClick={sendCreateMCE}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
