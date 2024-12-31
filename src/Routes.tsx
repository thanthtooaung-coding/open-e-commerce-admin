import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { PagesManagementPage } from './pages/PagesManagementPage'
import { OwnersManagementPage } from './pages/OwnersManagementPage'
import { PaymentsManagementPage } from './pages/PaymentsManagementPage'
import { useAuth } from './contexts/AuthContext'

export function Routes() {
  const { user } = useAuth()

  if (!user) {
    return (
      <RouterRoutes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </RouterRoutes>
    )
  }

  return (
    <RouterRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="pages" element={<PagesManagementPage />} />
        <Route path="owners" element={<OwnersManagementPage />} />
        <Route path="payments" element={<PaymentsManagementPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  )
}

