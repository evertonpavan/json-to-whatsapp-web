import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertProps,
} from '@chakra-ui/react'

export interface IAlertMessageProps extends AlertProps {
  title: string
  message: string
  icon?: string
  // status: string;
}

function AlertMessage({ title, message, status }: IAlertMessageProps) {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export { AlertMessage }
