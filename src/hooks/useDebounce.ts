import { useEffect, DependencyList } from "react"
import useTimeout from "./useTimeout"

type Callback = () => void

export default function useDebounce(
   callback: Callback,
   delay: number,
   dependencies: DependencyList
) {
   const { reset, clear } = useTimeout(callback, delay)

   useEffect(reset, [...dependencies, reset])

   useEffect(clear, [clear])
}
