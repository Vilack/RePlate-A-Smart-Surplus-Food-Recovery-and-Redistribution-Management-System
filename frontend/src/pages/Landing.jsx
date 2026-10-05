import {
  ArrowRight,
  HeartHandshake,
  Leaf,
  MapPin,
  PackageCheck,
  Users,
  Utensils,
} from 'lucide-react'

function Landing({ onGetStarted }) {
  return (
    <div className="landing">

      {/* Navigation */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={22} />
          </div>

          <span>RePlate</span>
        </div>

        <button className="nav-login" onClick={onGetStarted}>
          Login
        </button>
      </nav>


      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <div className="eyebrow">
            <HeartHandshake size={16} />
            Turning surplus into social impact
          </div>

          <h1>
            Good food deserves
            <span> another plate.</span>
          </h1>

          <p>
            RePlate connects food providers with NGOs and volunteers
            to rescue surplus food, reduce waste, and get meals to
            people who need them.
          </p>

          <div className="hero-buttons">
            <button className="primary-button" onClick={onGetStarted}>
              Get started
              <ArrowRight size={18} />
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById('how-it-works')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See how it works
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>3</strong>
              <span>Ways to contribute</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Food discovery</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Impact focused</span>
            </div>
          </div>

        </div>


        {/* Hero visual */}
        <div className="hero-card">

          <div className="impact-card">

            <div className="impact-header">
              <div>
                <span className="small-label">LIVE IMPACT</span>
                <h3>Today's difference</h3>
              </div>

              <div className="impact-icon">
                <HeartHandshake size={22} />
              </div>
            </div>

            <div className="impact-number">
              248
              <span> meals rescued</span>
            </div>

            <div className="progress">
              <div className="progress-fill" />
            </div>

            <div className="impact-footer">
              <span>
                <PackageCheck size={15} />
                82 kg food saved
              </span>

              <span>
                <Users size={15} />
                6 NGOs helped
              </span>
            </div>

          </div>


          <div className="floating-card floating-one">
            <Utensils size={18} />
            <div>
              <strong>Fresh meals</strong>
              <span>Available nearby</span>
            </div>
          </div>

          <div className="floating-card floating-two">
            <MapPin size={18} />
            <div>
              <strong>Pickup matched</strong>
              <span>2.4 km away</span>
            </div>
          </div>

        </div>

      </section>


      {/* How it works */}
      <section id="how-it-works" className="how-section">

        <div className="section-heading">
          <span>HOW REPLATE WORKS</span>
          <h2>One platform. Three ways to make an impact.</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">
              <Utensils />
            </div>

            <h3>Providers donate</h3>

            <p>
              Restaurants, hotels, bakeries and other providers
              list surplus food before it goes to waste.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">
              <HeartHandshake />
            </div>

            <h3>NGOs request</h3>

            <p>
              NGOs discover available food and request what
              matches their community's needs.
            </p>
          </div>


          <div className="feature-card">
            <div className="feature-icon">
              <PackageCheck />
            </div>

            <h3>Volunteers deliver</h3>

            <p>
              Volunteers coordinate pickups and deliveries so
              rescued food reaches people quickly.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <Leaf size={28} />

        <h2>Ready to make surplus count?</h2>

        <p>
          Join the RePlate network and turn food that might be
          wasted into meals that matter.
        </p>

        <button className="primary-button" onClick={onGetStarted}>
          Join RePlate
          <ArrowRight size={18} />
        </button>

      </section>


      <footer>
        <div className="brand">
          <div className="brand-icon">
            <Leaf size={18} />
          </div>
          <span>RePlate</span>
        </div>

        <span>Food recovery. Community impact.</span>
      </footer>

    </div>
  )
}

export default Landing