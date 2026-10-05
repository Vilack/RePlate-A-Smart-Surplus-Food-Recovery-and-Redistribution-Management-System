import { useState } from 'react'
import { ArrowLeft, Leaf, LockKeyhole, Mail, User } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

function Auth({ onBack }) {
  const [isLogin, setIsLogin] = useState(true)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage(
          'Account created. Check your email if confirmation is required.'
        )
      }
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">

      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to RePlate
      </button>

      <div className="auth-card">

        <div className="auth-logo">
          <Leaf size={25} />
        </div>

        <h1>
          {isLogin ? 'Welcome back' : 'Join RePlate'}
        </h1>

        <p>
          {isLogin
            ? 'Continue making an impact with your community.'
            : 'Help good food reach people instead of landfills.'}
        </p>


        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="input-group">
              <label>Full name</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  type="text"
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}


          <div className="input-group">
            <label>Email address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>


          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <LockKeyhole size={18} />

              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
          </div>


          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Create account'}
          </button>

        </form>


        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <div className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}

          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
              setMessage('')
            }}
          >
            {isLogin ? 'Create one' : 'Login'}
          </button>
        </div>

      </div>

    </div>
  )
}

export default Auth