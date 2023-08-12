import { ReactNode } from "react"
import { TextField, Button, ButtonProps, TextFieldProps } from "@mui/material"

type Props = {
   children: ReactNode
}

type InputProps = {
   label: string
}

type CardLayoutProps = {
   Header?: React.FC<Props>
   Input?: React.FC<InputProps>
   Button?: React.FC<Props>
} & Props

type CardButtonProps = ButtonProps & Props
type CardTextFieldProps = TextFieldProps & InputProps

function CardLayout({ children }: CardLayoutProps) {
   return (
      <div className="border-[2px] w-96 rounded-md h-max px-16 py-3 flex flex-col justify-center gap-4 items-center">
         {children}
      </div>
   )
}

const CardHeader = ({ children }: Props) => {
   return <div className="text-xl font-medium">{children}</div>
}

const CardInput = ({ label, ...rest }: CardTextFieldProps) => {
   return (
      <TextField
         className="w-full"
         type="text"
         label={label}
         variant="outlined"
         aria-label={label}
         {...rest}
      />
   )
}

const CardButton = ({ children, ...rest }: CardButtonProps) => {
   return <Button {...rest}>{children}</Button>
}

CardLayout.Header = CardHeader
CardLayout.Input = CardInput
CardLayout.Button = CardButton

export default CardLayout
