'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreateOrganizationForm() {
  // const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
  //   _,
  //   () => {
  //     // router.push('/auth/sign-in')
  //   }
  // )
  return (
    <form className="space-y-4">
      {/* {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Create organization failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )} */}
      <div className="space-y-1">
        <Label htmlFor="name">Organization Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Organization Name"
        />
        {/* {errors?.name && (
          <p className="text-destructive text-xs font-medium">
            {errors.name[0]}
          </p>
        )} */}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail domain</Label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="example.com"
          inputMode="url"
        />
        {/* {errors?.email && (
          <p className="text-destructive text-xs font-medium">
            {errors.email[0]}
          </p>
        )} */}
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="translate-y-0.5"
          />
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm leading-none font-medium">
              Auto-join new members
            </span>
            <p>
              This will automatically add all members with the same e-mail
              domain to this organization
            </p>
          </label>
        </div>
        {/* {errors?.password && (
          <p className="text-destructive text-xs font-medium">
            {errors.password[0]}
          </p>
        )} */}
      </div>

      <Button type="submit" className="w-full">
        {/* {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )} */}
        Save organization
      </Button>
    </form>
  )
}
