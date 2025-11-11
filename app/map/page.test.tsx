import { render, screen, waitFor } from '@testing-library/react'
import MapPage from './page'

jest.mock('@/components/AppShell', () => {
  return function DummyAppShell({ children }: { children: React.ReactNode }) {
    return <div data-testid="appshell">{children}</div>
  }
})

describe('MapPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () => {
          if (url === '/data/incidents.json') {
            return Promise.resolve([
              { id: 1, title: 'Incident 1', severity: 'High' },
            ])
          }
          if (url === '/data/services.json') {
            return Promise.resolve([
              { id: 1, name: 'Service 1', address: 'Address 1', hours: '9-5', phone: '123-456-7890' },
            ])
          }
          return Promise.resolve([])
        },
      })
    ) as jest.Mock
  })

  it('renders all page content after data fetching', async () => {
    render(<MapPage />)

    await waitFor(() => {
      expect(screen.getByText('Service 1')).toBeInTheDocument()
    })

    expect(screen.getByText('City Map')).toBeInTheDocument()
    expect(screen.getByText('View incidents, sensors, and services across the city')).toBeInTheDocument()
    expect(screen.getByText('Interactive Map')).toBeInTheDocument()
    expect(screen.getByText('Critical Incidents')).toBeInTheDocument()
    expect(screen.getByText('High Priority')).toBeInTheDocument()
    expect(screen.getByText('Active Sensors')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Address 1')).toBeInTheDocument()
  })
})
