'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserMinus } from 'lucide-react'
import { removeMemberAction } from './actions'

interface RemoveMemberModalProps {
  memberId: string
}

export function RemoveMemberModal({ memberId }: RemoveMemberModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <UserMinus className="mr-2 size-4" />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove the
            member from your organization.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={removeMemberAction.bind(null, memberId)}>
            <Button
              type="submit"
              variant="destructive"
              className="hover:cursor-pointer"
            >
              Remove
            </Button>
          </form>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
