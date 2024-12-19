'use Client'
import Navbar from './component/navbar'
import Footer from "./component/footer";

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Minicabs',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative'>
        <Navbar/>
        

        {children}
       

        </div>
        <Footer/>
        </body>
    </html>
  )
}
                                                                           