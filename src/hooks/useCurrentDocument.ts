import { doc, onSnapshot } from "firebase/firestore"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CustomDocument, useAuth } from "../contexts/AuthContext"

export type ReceivedDocumentData = Omit<CustomDocument, "id">

type ReturnState = [
   currentDocument: ReceivedDocumentData | undefined,
   setCurrentDocument: Dispatch<
      SetStateAction<ReceivedDocumentData | undefined>
   >,
   isLoading: boolean
]

export default function useCurrentDocument(
   id: string | undefined
): ReturnState {
   const [currentDocument, setCurrentDocument] =
      useState<ReceivedDocumentData>()
   const [isLoading, setIsLoading] = useState(true)
   const { databaseCollection } = useAuth()

   useEffect(() => {
      if (!id) return

      setIsLoading(true)
      const foundDocument = doc(databaseCollection, id)

      const unsubscribe = onSnapshot(foundDocument, (foundDoc) => {
         const newData = foundDoc.data() as ReceivedDocumentData

         if (!newData) return

         setCurrentDocument((prev) => ({ ...prev, ...newData }))
      })

      setIsLoading(false)
      return unsubscribe
   }, [databaseCollection, id])

   return [currentDocument, setCurrentDocument, isLoading]
}
