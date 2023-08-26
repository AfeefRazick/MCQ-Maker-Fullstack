import { DashContent } from "./components/DashContent"
import { DashTopSide } from "./components/DashTopSide"

export const DashboardPage = () => {
  return (
    <div className=" min-h-screen w-full">
      <DashTopSide />
      <DashContent />
    </div>
  )
}
