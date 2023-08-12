/* eslint-disable no-empty-pattern */
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import GoogleButton from "react-google-button"

type Props = object

export default function Login({}: Props) {
   const { login, currentUser } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      if (currentUser) navigate("/", { replace: true })
   }, [navigate, currentUser])

   return (
      <div className="mx-auto w-fit my-6">
         <GoogleButton onClick={login} />
      </div>
   )
}
