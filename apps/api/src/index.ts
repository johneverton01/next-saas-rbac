import { defineAbilitiesFor } from '@saas/auth'

const ability = defineAbilitiesFor({ role: 'ADMIN' })
const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUser = ability.can('delete', 'User')

const userCannotDeleteOtherUser = ability.cannot('delete', 'User')

console.log('User cannot delete other user:', userCannotDeleteOtherUser)

console.log('User can invite someone else:', userCanInviteSomeoneElse)
console.log('User can delete other user:', userCanDeleteOtherUser)
