import { DashTopSide } from "./DashTopSide"
import { DashContent } from "./DashContent"

export const DashboardPage = () => {
  return (
    <div className="w-full">
      <DashTopSide />
      <DashContent />
    </div>
  )
}
