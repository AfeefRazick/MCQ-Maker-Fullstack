import { useAuthContext } from "../../UserContext/useAuthContext"
import { useUpdateUserOnLoad } from "../../hooks/useUpdateUserOnLoad"
import { DashTopSide } from "../DashboardPage/components/DashTopSide"
import { Loading } from "../Loading"
import { Responses } from "./components/Responses"

export const ResponsesPage = () => {
  const { auth } = useAuthContext()
  useUpdateUserOnLoad()

  return (
    <div className="h-screen w-full">
      <DashTopSide />
      <div className="h-full w-full pt-16 md:pl-64 md:pt-20">
        <div className="relative h-full w-full bg-slate-50 px-[4%] pr-2 sm:pr-[4%]">
          {auth.isLoading && <Loading />}
          <Responses />
        </div>
      </div>
    </div>
  )
}
