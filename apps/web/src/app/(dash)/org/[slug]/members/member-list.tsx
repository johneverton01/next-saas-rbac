import { ability, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { organizationSchema, type Role } from '@saas/auth'
import { ArrowLeftRight, Crown } from 'lucide-react'
import Image from 'next/image'
import { RemoveMemberModal } from './remove-member-modal'
import { UpdateMemberRoleSelect } from './update-member-role-select'

interface Member {
  userId: string
  id: string
  role: Role
  name: string | null
  email: string
  avatarUrl: string | null
}

export async function MembersList() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const [membershipResponse, { members }, { organization }] = await Promise.all(
    [
      getMembership(currentOrg!)!,
      getMembers(currentOrg!),
      getOrganization(currentOrg!),
    ]
  )

  const membership = membershipResponse?.membership

  const authOrganization = organizationSchema.parse(organization)

  const isDisableRemoveButton = (member: Member) => {
    return (
      member.userId === membership?.userId ||
      member.userId === organization.ownerId
    )
  }

  const isDisableRoleSelect = (member: Member) => {
    return (
      member.userId === membership?.userId ||
      member.userId === organization.ownerId ||
      permissions?.cannot('update', 'User')
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>
      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          alt=""
                          width={32}
                          height={32}
                          className="aspect-square size-full"
                        />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {membership?.userId === member.userId && ' (me)'}
                        {organization.ownerId === member.userId && (
                          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization
                      ) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:cursor-pointer"
                        >
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer ownership
                        </Button>
                      )}

                      <UpdateMemberRoleSelect
                        memberId={member.id}
                        value={member.role}
                        disabled={isDisableRoleSelect(member)}
                      />

                      {permissions?.can('delete', 'User') && (
                        <RemoveMemberModal
                          memberId={member.id}
                          disabled={isDisableRemoveButton(member)}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
