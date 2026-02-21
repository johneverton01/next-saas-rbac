import { useState, useTransition, type FormEvent } from 'react'

interface FormState {
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: undefined,
      errors: undefined,
    }
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)
      setFormState(state)
      if (state.success === true && onSuccess) {
        await onSuccess()
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}
