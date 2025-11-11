import { render, screen } from '@testing-library/react'
import Sidebar from './Sidebar'
import { usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Sidebar', () => {
  it('renders the navigation links', () => {
    (usePathname as jest.Mock).mockReturnValue('/home')
    render(<Sidebar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Map')).toBeInTheDocument()
    expect(screen.getByText('Report Issue')).toBeInTheDocument()
    expect(screen.getByText('My Reports')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights the active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/map')
    render(<Sidebar />)
    const mapLink = screen.getByText('Map').closest('a')
    expect(mapLink).toHaveClass('bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-white border-l-2 border-blue-500')
  })
})
