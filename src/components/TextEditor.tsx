/* eslint-disable no-empty-pattern */
import ReactQuill from "react-quill"
import { useParams } from "react-router-dom"
import { useDebounce } from "../hooks"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import { useCurrentDocument, DocumentTitleAndBody } from "../hooks"
import toolbarOptions from "./toolbarOption"

import "react-quill/dist/quill.snow.css"

type Props = object

const modules = {
   toolbar: toolbarOptions,
}

export default function TextEditor({}: Props) {
   const { id } = useParams()
   const [currentDocument, setCurrentDocument, isLoading] =
      useCurrentDocument(id)
   const { updateDocument } = useAuth()

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

   if (isLoading) {
      return <div>Loading document data</div>
   }

   return (
      <div className="container">
         <h2 className="text-center text-xl mb-4 font-medium print:hidden">
            {currentDocument?.title}
         </h2>

         <ReactQuill
            value={currentDocument?.body}
            modules={modules}
            onChange={(value) =>
               setCurrentDocument(
                  (prev) => ({ ...prev, body: value } as DocumentTitleAndBody)
               )
            }
         />
      </div>
   )
}
