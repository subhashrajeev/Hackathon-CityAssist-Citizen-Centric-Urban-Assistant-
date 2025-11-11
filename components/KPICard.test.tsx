import { render, screen } from '@testing-library/react'
import KPICard from './KPICard'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

describe('KPICard', () => {
  it('renders the label and value', () => {
    render(<KPICard label="Total Reports" value={123} />)
    expect(screen.getByText('Total Reports')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('renders the change and trend icon when trend is up', () => {
    render(<KPICard label="Total Reports" value={123} change="+5.4%" trend="up" />)
    expect(screen.getByText('+5.4%')).toBeInTheDocument()
    expect(screen.getByText('+5.4%').parentElement).toHaveClass('text-emerald-400')
  })

  it('renders the change and trend icon when trend is down', () => {
    render(<KPICard label="Total Reports" value={123} change="-2.1%" trend="down" />)
    expect(screen.getByText('-2.1%')).toBeInTheDocument()
    expect(screen.getByText('-2.1%').parentElement).toHaveClass('text-red-400')
  })

  it('renders the change and trend icon when trend is stable', () => {
    render(<KPICard label="Total Reports" value={123} change="0.0%" trend="stable" />)
    expect(screen.getByText('0.0%')).toBeInTheDocument()
    expect(screen.getByText('0.0%').parentElement).toHaveClass('text-slate-400')
  })

  it('renders the icon when provided', () => {
    render(<KPICard label="Total Reports" value={123} icon={<div data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
