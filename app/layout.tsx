import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'CityAssist - Citizen-Centric Urban Assistant',
  description: 'Your daily companion for city services, alerts, and civic engagement',
  manifest: '/manifest.json',
  themeColor: '#0f172a'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/assets/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  )
}
