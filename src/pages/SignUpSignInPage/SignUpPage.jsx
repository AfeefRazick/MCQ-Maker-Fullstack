import Sidebar from "../../components/Sidebar"
import { SignUpBox } from "./SignUpBox"

export const SignUpPage = () => {
  return (
    <div className="grid h-screen w-full place-items-center">
      <Sidebar />
      <SignUpBox />
    </div>
  )
}
