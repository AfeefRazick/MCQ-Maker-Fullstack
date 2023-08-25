/* eslint-disable react/prop-types */

export const QuestionReadOnly = ({ text }) => {
  return (
    <div className="question-builder">
      <p className="m-1 rounded-2xl bg-cyan-300 px-3 py-2 font-nunito text-sm sm:text-base md:text-lg xl:px-4">
        {text}
      </p>
    </div>
  )
}
