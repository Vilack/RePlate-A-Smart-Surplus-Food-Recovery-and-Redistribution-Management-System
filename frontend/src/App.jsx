import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { supabase } from './lib/supabaseClient'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import FoodListings from './pages/FoodListings'
import CreateFoodListing from './pages/CreateFoodListing'

function App() {
  const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="brand-icon">🌱</div>
        <p>Loading RePlate...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>

      <Routes>

        {/* Public landing page */}
        <Route
          path="/"
          element={
            session ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Landing
                onGetStarted={() => setShowAuth(true)}
              />
            )
          }
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={
            session ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Auth
                onBack={() => setShowAuth(false)}
              />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            session ? (
              <Dashboard
                user={session.user}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Food listings */}
        <Route
          path="/food-listings"
          element={
            session ? (
              <FoodListings
                user={session.user}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Create listing */}
        <Route
          path="/food-listings/create"
          element={
            session ? (
              <CreateFoodListing
                user={session.user}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Temporary routes */}
        <Route
          path="/requests"
          element={
            session ? (
              <Dashboard
                user={session.user}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/deliveries"
          element={
            session ? (
              <Dashboard
                user={session.user}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/impact"
          element={
            session ? (
              <Dashboard
                user={session.user}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App