import { TbEdit } from "react-icons/tb"
import Button from "../../../components/Button"

export default function Hero() {
  return (
    <div className="h-[calc(100vh-80px)] p-2">
      <div className="flex w-full flex-wrap sm:justify-center">
        <div className="flex w-full justify-center text-center">
          <h1 className="mt-4 w-full p-3 text-left font-rubik text-4xl font-bold text-cyan-500 sm:mt-12 sm:text-center sm:text-4xl md:mt-16 md:animate-typeanim md:overflow-hidden md:whitespace-nowrap md:border-r-4 md:border-solid md:border-transparent xl:mt-20 xl:text-5xl">
            Build Tailored Multiple Choice Exams with Ease!
          </h1>
        </div>
        <p className="p-3 sm:p-8 sm:text-center md:px-12 md:py-3 lg:px-20 lg:py-4 xl:px-60 xl:py-5">
          Whether you&#39;re an educator, a trainer, or simply someone who loves
          quizzes, our MCQ Maker website is here to simplify the process and
          help you craft engaging and interactive quizzes in no time.
        </p>
        <Button
          className="mx-3 my-5"
          buttonStyle="btn-outline"
          linkpath="/mcq-builder/new"
        >
          Start designing for free
          <TbEdit className="relative ml-1 text-xl" />
        </Button>
      </div>
    </div>
  )
}
