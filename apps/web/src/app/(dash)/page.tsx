import { HeaderOrg } from './org/components/header-org'

export default function Home() {
  return (
    <div className="space-y-4 py-4">
      <HeaderOrg />
      <main className="mx-auto w-full max-w-300 space-y-4">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  )
}
