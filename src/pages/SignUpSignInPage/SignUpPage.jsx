import { SignUpBox } from "./SignUpBox"

export const SignUpPage = () => {
  return (
    <div className="grid h-screen w-full place-items-center">
      <SignUpBox />
    </div>
  )
}

/* <GoogleLogin
      size="large"
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
      }}
      onError={() => {
        console.log("Login Failed")
      }}
    /> */
