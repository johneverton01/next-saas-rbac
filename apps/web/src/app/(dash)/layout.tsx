import { isAuthenticated } from '@/auth/auth'
import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'

export default async function DashLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  if (!(await isAuthenticated())) {
    redirect('/auth/sign-in')
  }
  return (
    <div className="space-y-4 py-4">
      <Header />
      <Separator className="my-4" />
      <main className="mx-auto w-full max-w-300 space-y-4">
        {children}
        {sheet}
      </main>
    </div>
  )
}
