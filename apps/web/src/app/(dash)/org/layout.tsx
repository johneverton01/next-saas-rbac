export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto w-full max-w-300 py-4">{children}</div>
}
