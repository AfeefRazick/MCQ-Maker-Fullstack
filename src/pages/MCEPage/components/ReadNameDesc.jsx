/* eslint-disable react/prop-types */

export const ReadNameDesc = ({ information }) => {
  return (
    <div className=" mt-5 w-full rounded-xl border border-solid border-black pb-5">
      <h1 className="m-3 w-11/12 border-b-2 border-main pb-2 text-3xl outline-none focus:border-solid">
        {information.name}
      </h1>

      <p className="mx-3 w-11/12 border-b-2 border-main pb-2 text-slate-700 outline-none focus:border-solid">
        {information.mcqDescription}
      </p>
    </div>
  )
}
