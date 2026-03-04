import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'
import { getRelativeTime } from '@/utils/relativeTime'
import { CheckCircle, LogIn } from 'lucide-react'
import { acceptInviteAction, signInFromInvite } from './actions'

interface InvitePageProps {
  params: Promise<{
    id: string
  }>
}
export default async function InvitePage({ params }: InvitePageProps) {
  const { id } = await params
  const { invite } = await getInvite(id)
  const isUserAuthenticated = await isAuthenticated()

  let currentUserEmail = null

  if (isUserAuthenticated) {
    const { user } = await auth()
    currentUserEmail = user.email
  }

  const userIsAuthenticatedWithSameEmailFromInvite =
    currentUserEmail === invite.email

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <p className="text-muted-foreground text-center leading-relaxed text-balance">
            <span className="text-foreground font-medium">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="text-foreground font-medium">
              {invite.organization?.name ?? 'an organization'}
            </span>
            .{' '}
            <span className="text-xs">{getRelativeTime(invite.createdAt)}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite.bind(null, invite.email, invite.id)}>
            <Button type="submit" className="w-full" variant="secondary">
              <LogIn className="size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInviteAction.bind(null, invite.id)}>
            <Button type="submit" className="w-full" variant="secondary">
              <CheckCircle className="size-4" />
              Join {invite.organization?.name ?? 'the organization'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
