/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom"
import { Loading } from "../pages/Loading"
import { useAuthContext } from "../UserContext/useAuthContext"

export const PrivateRoutes = () => {
  const { auth } = useAuthContext()
  if (auth.isLoading) return <Loading />
  return auth.isAuthenticated ? <Outlet /> : <Navigate to={"/signup"} />
}
