import { useAuthContext } from "../../../UserContext/useAuthContext.jsx"
import { Loading } from "../../Loading.jsx"
import { MyMCEs } from "./MyMCEs.jsx"

export const DashContent = () => {
  const { auth } = useAuthContext()
  return (
    <div className="h-full w-full pt-16 md:pl-72 md:pt-20">
      <div className="relative h-full w-full bg-slate-50 px-[4%] pr-2 sm:pr-[4%]">
        {auth.isLoading && <Loading />}
        <MyMCEs />
      </div>
    </div>
  )
}
