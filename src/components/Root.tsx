/* eslint-disable no-empty-pattern */
import {
   Link,
   Outlet,
   useLocation,
   Location,
   useNavigate,
   useParams,
} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react"

type Props = object

export default function Root({}: Props) {
   const { logout, currentUser } = useAuth()
   const location: Location = useLocation()
   const navigate = useNavigate()
   const { id } = useParams()

   useEffect(() => {
      if (currentUser) return

      navigate("/login", { replace: true })
   }, [currentUser, navigate])

   return (
      <div className="container mx-auto max-w-[95dvw] xl:max-w-[1080px]">
         <div className="flex gap-3 w-full justify-between items-center cursor-pointer font-medium my-3">
            <Link
               className="custom-button bg-sky-500 text-slate-900 print:hidden"
               to="/"
            >
               Home
            </Link>

            <div className="print:hidden">
               {location.pathname !== "/login" && !currentUser ? (
                  <Link className="hover:text-blue-500" to="login">
                     Login
                  </Link>
               ) : null}

               {location.pathname !== "/login" && (
                  <button
                     className="custom-button bg-slate-900 text-slate-300"
                     onClick={logout}
                  >
                     Logout
                  </button>
               )}
            </div>
         </div>

         {!id && (
            <h1 className="text-center text-4xl underline mb-4 print:hidden">
               Gogol Docs
            </h1>
         )}

         <Outlet />
      </div>
   )
}
