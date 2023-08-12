/* eslint-disable react-refresh/only-export-components */
import {
   createContext,
   useContext,
   ReactNode,
   useState,
   useEffect,
   Dispatch,
   SetStateAction,
   useMemo,
} from "react"
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup,
   User,
} from "firebase/auth"
import {
   collection,
   addDoc,
   onSnapshot,
   query,
   where,
   orderBy,
   updateDoc,
   doc,
   CollectionReference,
   DocumentData,
} from "firebase/firestore"
import { firebaseDatabase } from "../firebase"
import { useSessionStorage } from "../hooks/useStorage"
import { toast } from "react-toastify"

type Props = {
   children: ReactNode
}

type ContextValues = {
   currentUser: User | null | undefined
   documentsData: CustomDocument[] | null
   login: () => Promise<void>
   logout: () => Promise<void>
   addDocument: AddDocumentArgs
   updateDocument: UpdateDocumentArgs
   databaseCollection: CollectionReference<DocumentData, DocumentData>
}

type AddDocumentArgs = (
   documentTitle: string,
   setIsAddingDocument: Dispatch<SetStateAction<boolean>>
) => Promise<void>

type UpdateDocumentArgs = (id: string, editorData: string) => Promise<void>

type AddDocData = {
   title: string
   authorEmail: string
   body: string
   createdAt: Date
}

export type CustomDocument = AddDocData & { id: string }

const AuthContext = createContext({})

export function useAuth() {
   return useContext(AuthContext) as ContextValues
}

export function AuthProvider({ children }: Props) {
   const {
      value: currentUser,
      setValue: setCurrentUser,
      remove: removeCurrentUser,
   } = useSessionStorage<User | null>("user", null)
   const [pending, setPending] = useState(true)
   const [documentsData, setDocumentsData] = useState<CustomDocument[] | null>(
      null
   )
   const databaseCollection = useMemo(
      () => collection(firebaseDatabase, "docs-data"),
      []
   )

   const auth = getAuth()
   const googleProvider = new GoogleAuthProvider()

   const login = async () => {
      try {
         await signInWithPopup(auth, googleProvider)
      } catch (error) {
         console.error(error)
      }
   }

   const logout = async () => {
      try {
         await auth.signOut()
         removeCurrentUser()
      } catch (error) {
         console.error(error)
      }
   }

   const addDocument: AddDocumentArgs = async (
      documentTitle,
      setIsAddingDocuments
   ) => {
      if (!currentUser?.email) throw new Error("You must be logged in")

      const data: AddDocData = {
         title: documentTitle,
         authorEmail: currentUser.email,
         body: "",
         createdAt: new Date(),
      }

      try {
         await addDoc(databaseCollection, data)
         toast.success("CustomDocument added successfully")
         setIsAddingDocuments(false)
      } catch (error) {
         console.error(error)
         toast.error("Error while adding document")
      }
   }

   const updateDocument: UpdateDocumentArgs = async (id, editorData) => {
      try {
         const documentToUpdate = doc(databaseCollection, id)
         await updateDoc(documentToUpdate, {
            body: editorData,
         })
         toast.success("CustomDocument updated successfully")
      } catch (error) {
         console.log(error)
         toast.error("Update document failed")
      }
   }

   useEffect(() => {
      if (!currentUser || !currentUser.email) return

      const newQuery = query(
         databaseCollection,
         orderBy("createdAt", "desc"),
         where("authorEmail", "==", currentUser.email)
      )

      const unsubscribe = onSnapshot(newQuery, (resp) => {
         const allDocs = resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
         })) as CustomDocument[]

         setDocumentsData(allDocs)
      })

      return unsubscribe
   }, [currentUser, databaseCollection])

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user)
         setPending(false)
      })

      return unsubscribe
   }, [auth, setCurrentUser])

   const value: ContextValues = {
      login,
      logout,
      databaseCollection,
      currentUser,
      documentsData,
      addDocument,
      updateDocument,
   }

   if (pending) {
      return <h1>Loading...</h1>
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
