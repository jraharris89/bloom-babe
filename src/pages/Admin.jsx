import { useState, useEffect } from 'react'
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('bb-admin-token'))

  const handleLogin = (newToken) => {
    sessionStorage.setItem('bb-admin-token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('bb-admin-token')
    setToken(null)
  }

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard token={token} onLogout={handleLogout} />
}
