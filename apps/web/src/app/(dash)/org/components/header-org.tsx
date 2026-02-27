import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'
import { Separator } from '@/components/ui/separator'

export function HeaderOrg() {
  return (
    <div className="w-full space-y-4 pt-6">
      <Header />
      <Separator />
      <Tabs />
    </div>
  )
}
