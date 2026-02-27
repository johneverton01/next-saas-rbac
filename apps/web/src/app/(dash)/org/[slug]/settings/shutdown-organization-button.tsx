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
import { XCircle } from 'lucide-react'
import { shutdownOrganizationAction } from './actions'

export function ShutdownOrganizationButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" variant="destructive" className="w-56">
          <XCircle className="mr-2 size-4" />
          Shutdown Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            organization.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={shutdownOrganizationAction}>
            <Button
              type="submit"
              variant="destructive"
              className="hover:cursor-pointer"
            >
              Delete
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
