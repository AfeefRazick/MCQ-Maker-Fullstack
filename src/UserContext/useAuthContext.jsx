import { useContext } from "react"
import { authContext } from "./authContext"

export const useAuthContext = () => {
  const context = useContext(authContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider")
  }
  return context
}
