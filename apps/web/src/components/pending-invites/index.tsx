'use client'
import { getPendingInvites } from '@/http/get-pending-invites'
import { getRelativeTime } from '@/utils/relativeTime'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, UserPlus2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { acceptInviteAction, rejectInviteAction } from './actions'

export function PendingInvites() {
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvites,
    enabled: isOpen,
  })

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)
    queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending Invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-88 space-y-2">
        <span className="block text-sm font-medium">
          Pending Invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-muted-foreground text-sm">No invites found</p>
        )}

        {data?.invites.map((invite) => {
          return (
            <div className="space-y-2" key={invite.id}>
              <p className="text-muted-foreground text-xs leading-relaxed">
                <span className="text-foreground font-medium">
                  {invite.author?.name}
                </span>{' '}
                invited you to join{' '}
                <span className="text-foreground font-medium">
                  {invite.organization?.name}
                </span>{' '}
                <span>{getRelativeTime(invite.createdAt)}</span>
              </p>

              <div className="flex gap-1">
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  size="xs"
                  variant="outline"
                >
                  <Check className="mr-1.5 size-3" /> Accept
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={() => handleRejectInvite(invite.id)}
                >
                  <X className="mr-1.5 size-3" /> Reject
                </Button>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
