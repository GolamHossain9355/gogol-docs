import { doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CustomDocument, useAuth } from "../contexts/AuthContext"

export type DocumentTitleAndBody = Pick<CustomDocument, "title" | "body">

type ReturnState = [
   currentDocument: DocumentTitleAndBody | undefined,
   setCurrentDocument: Dispatch<
      SetStateAction<DocumentTitleAndBody | undefined>
   >,
   isLoading: boolean
]

export default function useCurrentDocument(
   id: string | undefined
): ReturnState {
   const [currentDocument, setCurrentDocument] =
      useState<DocumentTitleAndBody>()
   const [isLoading, setIsLoading] = useState(true)
   const { databaseCollection } = useAuth()

   useEffect(() => {
      if (!id) return

      setIsLoading(true)
      const currentDocument = doc(databaseCollection, id)

      const unsubscribe = onSnapshot(currentDocument, (foundDoc) => {
         const { title, body } = foundDoc.data() as DocumentTitleAndBody

         if (!body && !title) return

         setCurrentDocument((prev) => ({ ...prev, title, body }))
      })

      setIsLoading(false)
      return unsubscribe
   }, [databaseCollection, id])

   return [currentDocument, setCurrentDocument, isLoading]
}
