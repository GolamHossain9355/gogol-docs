import { useEffect, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { Add, Close } from "@mui/icons-material"
import { Button } from "@mui/material"
import CardLayout from "./layouts/CardLayout"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

function App() {
   const [isAddingDocument, setIsAddingDocument] = useState<boolean>(false)
   const [documentTitle, setDocumentTitle] = useState<string>("")

   const { currentUser, addDocument, documentsData } = useAuth()
   const navigate = useNavigate()

   useEffect(() => {
      if (!currentUser) navigate("/login", { replace: true })
   }, [currentUser, navigate])

   return (
      <div className="flex flex-col justify-center items-center">
         <ToastContainer autoClose={1000} />

         <div className="flex flex-col gap-6 justify-center items-center">
            <Button
               variant="outlined"
               color={isAddingDocument ? "error" : "primary"}
               startIcon={isAddingDocument ? <Close /> : <Add />}
               onClick={() => setIsAddingDocument((prev) => !prev)}
            >
               {isAddingDocument ? "Close add window" : "Add Document"}
            </Button>

            {isAddingDocument && (
               <CardLayout>
                  <CardLayout.Header>Add New Document</CardLayout.Header>

                  <CardLayout.Input
                     label="Document title"
                     value={documentTitle}
                     onChange={(e) => setDocumentTitle(e.target.value)}
                  />

                  <CardLayout.Button
                     variant="outlined"
                     onClick={() =>
                        addDocument(documentTitle, setIsAddingDocument)
                     }
                  >
                     Add
                  </CardLayout.Button>
               </CardLayout>
            )}
         </div>

         <div className="grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-6">
            {documentsData &&
               documentsData.map((doc) => (
                  <div
                     className="border-slate-900 border hover:bg-slate-300 text-center p-3 text-xl font-medium cursor-pointer transition"
                     key={doc.id}
                     onClick={() =>
                        navigate(`/editor/${doc.id}`, { replace: false })
                     }
                  >
                     {doc.title}
                  </div>
               ))}
         </div>
      </div>
   )
}

export default App
