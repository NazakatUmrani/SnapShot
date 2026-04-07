import * as React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { firebaseAuth } from "@/firebaseConfig"

interface IProtectedRoutesProps {}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = () => {
  const [user, loading] = useAuthState(firebaseAuth);
  const location = useLocation();

  if(loading) {
    return <div>Loading...</div>
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default ProtectedRoutes
