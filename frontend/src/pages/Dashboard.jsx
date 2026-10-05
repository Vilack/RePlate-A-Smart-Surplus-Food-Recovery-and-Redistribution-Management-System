import {
  Bell,
  Heart,
  Leaf,
  LogOut,
  Package,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const name =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'there'

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <Leaf size={20} />
          </div>

          <span>RePlate</span>
        </div>

        <nav>
  <a
    className="active"
    onClick={() => navigate('/dashboard')}
  >
    Overview
  </a>

  <a
    onClick={() => navigate('/food-listings')}
  >
    Food Listings
  </a>

  <a
    onClick={() => navigate('/requests')}
  >
    Requests
  </a>

  <a
    onClick={() => navigate('/deliveries')}
  >
    Deliveries
  </a>

  <a
    onClick={() => navigate('/impact')}
  >
    Impact
  </a>
</nav>

        <button className="logout-button" onClick={onLogout}>
          <LogOut size={18} />
          Sign out
        </button>

      </aside>


      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <p className="dashboard-label">DASHBOARD</p>

            <h1>
              Welcome, {name} 👋
            </h1>

            <p>
              Here's what's happening across your RePlate network.
            </p>
          </div>

          <button className="notification-button">
            <Bell size={20} />
          </button>

        </header>


        <section className="stat-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <Package />
            </div>

            <span>Food rescued</span>

            <strong>0 kg</strong>

            <small>
              <TrendingUp size={14} />
              Your impact starts here
            </small>
          </div>


          <div className="stat-card">
            <div className="stat-icon">
              <Heart />
            </div>

            <span>Meals served</span>

            <strong>0</strong>

            <small>
              Start your first donation
            </small>
          </div>


          <div className="stat-card">
            <div className="stat-icon">
              <Users />
            </div>

            <span>Community</span>

            <strong>0</strong>

            <small>
              People connected
            </small>
          </div>

        </section>


        <section className="empty-dashboard">

          <div className="empty-icon">
            <Leaf size={32} />
          </div>

          <h2>Your impact journey starts here</h2>

          <p>
            Once you create your first food listing, request
            a donation, or accept a delivery, your activity
            will appear here.
          </p>

          <button className="primary-button" onClick={() => navigate('/food-listings/create')}>
  <Plus size={18} />
  Create food listing
</button>

        </section>

      </main>

    </div>
  )
}

export default Dashboard