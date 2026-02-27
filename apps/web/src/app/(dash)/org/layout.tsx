export default function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="mx-auto py-4">{children}</div>
}
