/* eslint-disable react/prop-types */

export const BuilderNameDesc = ({ information, setInformation }) => {
  const updateName = (e) => {
    let name = e.target.value
    setInformation((prev) => {
      return {
        ...prev,
        name: name,
      }
    })
  }
  const updateDescription = (e) => {
    let desc = e.target.value
    setInformation((prev) => {
      return {
        ...prev,
        mcqDescription: desc,
      }
    })
  }

  return (
    <div className="mr-10 mt-10 w-[calc(100%-40px)] rounded-xl border border-solid border-black pb-5">
      <input
        className="m-3 w-11/12 border-b-2 border-main pb-2 text-3xl outline-none focus:border-solid"
        placeholder="MCQ Name"
        value={information.name}
        onChange={updateName}
      />
      <input
        className="mx-3 w-11/12 border-b-2 border-main pb-2 text-slate-700 outline-none focus:border-solid"
        placeholder="Description"
        value={information.mcqDescription}
        onChange={updateDescription}
      />
    </div>
  )
}
