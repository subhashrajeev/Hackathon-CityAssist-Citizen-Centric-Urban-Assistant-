import { render, screen } from '@testing-library/react'
import Topbar from './Topbar'

describe('Topbar', () => {
  it('renders the welcome message', () => {
    render(<Topbar />)
    const welcomeMessage = screen.getByText(/Welcome back/i)
    expect(welcomeMessage).toBeInTheDocument()
  })
})
