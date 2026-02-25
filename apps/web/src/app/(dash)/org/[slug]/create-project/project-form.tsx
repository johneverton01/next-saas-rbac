'use client'
import { AlertForm } from '@/components/alert-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { Loader2 } from 'lucide-react'
import { createProjectAction } from './actions'

export function ProjectForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createProjectAction)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <AlertForm
          title="Save project failed!"
          message={message}
          variant="destructive"
        />
      )}
      {success === true && message && (
        <AlertForm title="Success!" message={message} variant="success" />
      )}
      <div className="space-y-1">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" type="text" placeholder="Project Name" />
        {errors?.name && (
          <p className="text-destructive text-xs font-medium">
            {errors.name[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Project Description"
        />
        {errors?.description && (
          <p className="text-destructive text-xs font-medium">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
