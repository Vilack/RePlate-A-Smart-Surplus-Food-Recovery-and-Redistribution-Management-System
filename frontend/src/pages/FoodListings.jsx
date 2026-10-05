import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function FoodListings({ user }) {
  const navigate = useNavigate()

  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadListings()
  }, [])

  async function loadListings() {
    setLoading(true)

    const { data: provider } = await supabase
      .from('provider_profiles')
      .select('id')
      .eq('id', user.id)
      .maybeSingle()

    if (!provider) {
      setListings([])
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('food_listings')
      .select(`
        *,
        food_categories (
          name
        )
      `)
      .eq('provider_id', provider.id)
      .order('created_at', {
        ascending: false,
      })

    if (!error) {
      setListings(data || [])
    }

    setLoading(false)
  }

  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            🌿
          </div>

          <span>RePlate</span>
        </div>

        <nav>

          <a onClick={() => navigate('/dashboard')}>
            Overview
          </a>

          <a
            className="active"
            onClick={() => navigate('/food-listings')}
          >
            Food Listings
          </a>

          <a onClick={() => navigate('/requests')}>
            Requests
          </a>

          <a onClick={() => navigate('/deliveries')}>
            Deliveries
          </a>

          <a onClick={() => navigate('/impact')}>
            Impact
          </a>

        </nav>

      </aside>


      <main className="dashboard-main">

        <button
          className="back-button"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>


        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              FOOD MANAGEMENT
            </p>

            <h1>
              Food Listings
            </h1>

            <p>
              Manage the surplus food you've made available.
            </p>

          </div>


          <button
            className="primary-button"
            onClick={() =>
              navigate('/food-listings/create')
            }
          >
            <Plus size={18} />
            Add food
          </button>

        </header>


        {loading ? (

          <div className="empty-dashboard">
            <p>Loading your listings...</p>
          </div>

        ) : listings.length === 0 ? (

          <div className="empty-dashboard">

            <div className="empty-icon">
              <Package size={32} />
            </div>

            <h2>
              No food listings yet
            </h2>

            <p>
              Have surplus food? Create your first listing
              and help get it to someone who needs it.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                navigate('/food-listings/create')
              }
            >
              <Plus size={18} />
              Create first listing
            </button>

          </div>

        ) : (

          <div className="feature-grid">

            {listings.map((listing) => (

              <div
                className="feature-card"
                key={listing.id}
              >

                <h3>
                  {listing.title}
                </h3>

                <p>
                  {listing.description}
                </p>

                <strong>
                  {listing.quantity}{' '}
                  {listing.quantity_unit}
                </strong>

                <p>
                  Category:{' '}
                  {listing.food_categories?.name}
                </p>

                <p>
                  Status:{' '}
                  {listing.status}
                </p>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  )
}

export default FoodListings