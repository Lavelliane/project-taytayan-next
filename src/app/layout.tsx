import type { Metadata } from 'next'
import { Inter, Lexend_Deca, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['italic', 'normal']
})
const lexendDeca = Lexend_Deca({ subsets: ['latin'], variable: '--font-lexendDeca' })

export const metadata: Metadata = {
  title: 'Project Taytayan',
  description: 'Your Bridge to Opportunities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.variable} ${lexendDeca.variable}`}>
        {children}
      </body>
    </html>
  )
}
