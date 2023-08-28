import { DashContent } from "./components/DashContent"
import { DashTopSide } from "./components/DashTopSide"
import { useUpdateUserOnLoad } from "../../hooks/useUpdateUserOnLoad"

export const DashboardPage = () => {
  useUpdateUserOnLoad()
  //watch out on this solution, may cause unnecessary renders when other stage changes

  return (
    <div className=" h-screen w-full">
      <DashTopSide />
      <DashContent />
    </div>
  )
}
