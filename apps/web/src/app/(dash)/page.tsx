import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <Separator className="my-4" />
      <main className="mx-auto w-full max-w-300 space-y-4">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  )
}
