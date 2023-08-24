import { AiOutlineDelete } from "react-icons/ai"

export const DeleteMCE = () => {
  const deleteMCE = () => {}
  return (
    <button
      title="Delete MCQ"
      className="flex items-center"
      onClick={deleteMCE}
    >
      <AiOutlineDelete className="icon-lg " />
    </button>
  )
}
