import { render, screen, waitFor } from '@testing-library/react'
import HomePage from './page'

jest.mock('@/components/AppShell', () => {
  return function DummyAppShell({ children }: { children: React.ReactNode }) {
    return <div data-testid="appshell">{children}</div>
  }
})

describe('HomePage', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () => {
          if (url === '/data/alerts.json') {
            return Promise.resolve([
              { id: 1, title: 'Alert 1', message: 'Message 1', severity: 'High', zone: 'Zone 1', time: '2024-01-01T12:00:00Z' },
            ])
          }
          if (url === '/data/kpis.json') {
            return Promise.resolve({
              active_incidents: { label: 'Active Incidents', value: 10, change: '+2', trend: 'up' },
              avg_response_time: { label: 'Avg. Response Time', value: '5m', change: '-1m', trend: 'down' },
              citizen_reports: { label: 'Citizen Reports', value: 50, change: '+5', trend: 'up' },
              city_health_index: { label: 'City Health Index', value: 85, change: '0', trend: 'stable' },
            })
          }
          return Promise.resolve({})
        },
      })
    ) as jest.Mock

    localStorage.setItem('current_user', JSON.stringify({ name: 'Test User' }))
  })

  it('renders the welcome message', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText(/Good/)).toBeInTheDocument()
      expect(screen.getByText(/Test User/)).toBeInTheDocument()
    })
  })

  it('renders the KPIs', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText('Active Incidents')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('Avg. Response Time')).toBeInTheDocument()
      expect(screen.getByText('5m')).toBeInTheDocument()
      expect(screen.getByText('Citizen Reports')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('City Health Index')).toBeInTheDocument()
      expect(screen.getByText('85')).toBeInTheDocument()
    })
  })

  it('renders the alerts', async () => {
    render(<HomePage />)
    await waitFor(() => {
      expect(screen.getByText('Alert 1')).toBeInTheDocument()
      expect(screen.getByText('Message 1')).toBeInTheDocument()
    })
  })
})
