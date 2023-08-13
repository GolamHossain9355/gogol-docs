/* eslint-disable no-empty-pattern */
import { useEffect } from "react"
import ReactQuill from "react-quill"
import { useParams } from "react-router-dom"
import { useDebounce } from "../hooks"
import { CustomDocument, useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { useCurrentDocument } from "../hooks"
import toolbarOptions from "./toolbarOption"

import "react-quill/dist/quill.snow.css"
import { ReceivedDocumentData } from "../hooks/useCurrentDocument"

type Props = object

const modules = {
   toolbar: toolbarOptions,
}

export default function TextEditor({}: Props) {
   const { id } = useParams()
   const [currentDocument, setCurrentDocument, isLoading] =
      useCurrentDocument(id)
   const { updateDocument, socket } = useAuth()

   const updateStorageEditorData = async () => {
      if (!id) {
         return toast.error("No id was found to retrieve the document data.")
      }
      if (!currentDocument) {
         return toast.error("Document data is not available")
      }

      await updateDocument(id, currentDocument.body)
   }

   useDebounce(updateStorageEditorData, 1000, [currentDocument?.body])

   useEffect(() => {
      if (!socket) return

      socket.on("receive-changes", (receivedDocument: CustomDocument) => {
         if (receivedDocument.source !== "user") return
         setCurrentDocument(receivedDocument)
      })

      return () => {
         socket.off("receive-changes")
      }
   }, [setCurrentDocument, socket])

   const changeHandler: (
      newDocumentValue: Required<ReceivedDocumentData>
   ) => void = (newDocumentValue) => {
      if (!socket) return
      setCurrentDocument((prev) => {
         if (!prev) return

         return { ...prev, ...newDocumentValue }
      })
      socket.emit("send-changes", newDocumentValue)
   }

   if (isLoading || currentDocument === undefined) {
      return <div>Loading document data</div>
   }

   return (
      <div className="container mx-auto">
         <h2 className="text-center text-xl mb-4 font-medium print:hidden">
            {currentDocument.title}
         </h2>

         <ReactQuill
            value={currentDocument?.body}
            modules={modules}
            onChange={(value, _delta, source) => {
               if (!currentDocument) return

               const changedDocument = {
                  ...currentDocument,
                  body: value,
                  source,
               }

               changeHandler(changedDocument)
            }}
         />
      </div>
   )
}
