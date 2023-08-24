import { DashTopSide } from "./DashTopSide"
import { DashContent } from "./DashContent"

export const DashboardPage = () => {
  return (
    <div className=" min-h-screen w-full">
      <DashTopSide />
      <DashContent />
    </div>
  )
}
