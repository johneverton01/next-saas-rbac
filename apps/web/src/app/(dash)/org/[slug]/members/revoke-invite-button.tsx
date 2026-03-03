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
import { XOctagon } from 'lucide-react'
import { removeInviteAction } from './actions'

interface RevokeInviteButtonProps {
  inviteId: string
}

export function RevokeInviteButton({ inviteId }: RevokeInviteButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <XOctagon className="mr-2 size-4" />
          Revoke invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will revoke the invite and the user will no longer be able to
            join your organization using this invite.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={removeInviteAction.bind(null, inviteId)}>
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
