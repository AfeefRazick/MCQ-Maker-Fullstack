import { MyMCEs } from "./MyMCEs"

export const DashContent = () => {
  return (
    <div className="h-full w-full pt-16 md:pl-72 md:pt-20">
      <div className="h-full w-full bg-slate-100 px-[4%]">
        <div>
          <h2 className="font-quicksand pt-2 text-[clamp(26px,5vw,36px)]">
            My MCQ&#39;s
          </h2>
        </div>
        <MyMCEs />
      </div>
    </div>
  )
}
