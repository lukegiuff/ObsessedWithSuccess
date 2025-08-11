import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Manager',
  robots: 'noindex',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
      {children}
    </div>
  )
}
