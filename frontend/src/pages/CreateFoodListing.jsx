import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  PackagePlus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

function CreateFoodListing({ user }) {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [quantityUnit, setQuantityUnit] = useState('kg')
  const [expiryTime, setExpiryTime] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    const { data, error } = await supabase
      .from('food_categories')
      .select('*')
      .order('id')

    if (!error) {
      setCategories(data || [])
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setError('')
    setSuccess('')

    const { data: provider, error: providerError } =
      await supabase
        .from('provider_profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

    if (providerError) {
      setError(providerError.message)
      setLoading(false)
      return
    }

    if (!provider) {
      setError(
        'Please complete your provider profile before creating a food listing.'
      )

      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('food_listings')
      .insert({
        provider_id: provider.id,
        category_id: Number(categoryId),
        title,
        description,
        quantity: Number(quantity),
        quantity_unit: quantityUnit,
        expiry_time: new Date(expiryTime).toISOString(),
        status: 'available',
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setSuccess(
      'Food listing created successfully!'
    )

    setLoading(false)

    setTimeout(() => {
      navigate('/food-listings')
    }, 1000)
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
            onClick={() =>
              navigate('/food-listings')
            }
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
          onClick={() =>
            navigate('/food-listings')
          }
        >
          <ArrowLeft size={18} />
          Back to listings
        </button>


        <div className="auth-card">

          <div className="auth-logo">
            <PackagePlus size={25} />
          </div>

          <h1>
            Create food listing
          </h1>

          <p>
            Tell NGOs what surplus food is available.
          </p>


          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>
                Food title
              </label>

              <div className="input-wrapper">

                <input
                  type="text"
                  placeholder="e.g. Fresh vegetable biryani"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

              </div>
            </div>


            <div className="input-group">
              <label>
                Description
              </label>

              <div className="input-wrapper">

                <input
                  type="text"
                  placeholder="Describe the food"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                />

              </div>
            </div>


            <div className="input-group">

              <label>
                Food category
              </label>

              <div className="input-wrapper">

                <select
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>


            <div className="input-group">

              <label>
                Quantity
              </label>

              <div className="input-wrapper">

                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 20"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  required
                />

                <select
                  value={quantityUnit}
                  onChange={(e) =>
                    setQuantityUnit(e.target.value)
                  }
                >
                  <option value="kg">
                    kg
                  </option>

                  <option value="litres">
                    litres
                  </option>

                  <option value="items">
                    items
                  </option>
                </select>

              </div>

            </div>


            <div className="input-group">

              <label>
                Expiry date & time
              </label>

              <div className="input-wrapper">

                <Calendar size={18} />

                <input
                  type="datetime-local"
                  value={expiryTime}
                  onChange={(e) =>
                    setExpiryTime(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                {success}
              </div>
            )}


            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Creating listing...'
                : 'Publish food listing'}
            </button>

          </form>

        </div>

      </main>

    </div>
  )
}

export default CreateFoodListing