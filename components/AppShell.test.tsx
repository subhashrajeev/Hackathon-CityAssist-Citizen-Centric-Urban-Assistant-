import { render, screen } from '@testing-library/react'
import AppShell from './AppShell'

jest.mock('./Sidebar', () => {
  return function DummySidebar() {
    return <div data-testid="sidebar" />
  }
})

jest.mock('./Topbar', () => {
  return function DummyTopbar() {
    return <div data-testid="topbar" />
  }
})

describe('AppShell', () => {
  it('renders the Sidebar, Topbar, and children', () => {
    render(
      <AppShell>
        <div data-testid="child" />
      </AppShell>
    )
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('topbar')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
