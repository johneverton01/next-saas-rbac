'use client'

import { AlertForm } from '@/components/alert-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'
import { Loader2, UserPlus } from 'lucide-react'
import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createInviteAction)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <AlertForm
          title="Invite failed!"
          message={message}
          variant="destructive"
        />
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
          />
          {errors?.email && (
            <p className="text-destructive text-xs font-medium">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
            <SelectItem value="BILLING">Billing</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
