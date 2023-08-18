export const SignUpBox = () => {
  return (
    <div className="flex w-11/12 max-w-lg flex-col rounded-lg border border-solid border-gray-100 p-5 shadow-lg">
      <h1 className=" font-poppins text-3xl">Sign Up</h1>
      <label htmlFor="email"></label>
      <input
        id="email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
        className="px-3 py-2"
      />
      <div id="buttonDiv" className="grid w-full place-items-center"></div>
    </div>
  )
}
