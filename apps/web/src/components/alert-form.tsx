import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface AlertFormProps {
  title: string
  message: string
  variant?: 'destructive' | 'default' | 'success'
}

export function AlertForm({
  title,
  message,
  variant = 'default',
}: AlertFormProps) {
  return (
    <Alert variant={variant}>
      <AlertTriangle className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{message}</p>
      </AlertDescription>
    </Alert>
  )
}
