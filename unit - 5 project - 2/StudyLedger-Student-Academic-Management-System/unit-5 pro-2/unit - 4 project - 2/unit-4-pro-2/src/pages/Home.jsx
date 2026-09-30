import { Link } from 'react-router-dom'
import profilePhoto from '../assets/jai-ananth.png'

function Home() {
  return (
    <div>
      <section className="hero section container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> DIGITAL BUILDER · AI & DATA · WEB</div>
          <h1>Turning ideas into <span>connected digital experiences.</span></h1>
          <p className="hero-lead">
            I&apos;m <strong>Jai Ananth</strong>, a B.Tech student exploring web development, data science and cloud technology — learning by designing, building and experimenting.
          </p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/projects">View My Projects <span>↗</span></Link>
            <Link className="btn btn-ghost" to="/contact">Contact Me</Link>
          </div>
          <div className="hero-stats">
            <div><strong>03</strong><span>Featured projects</span></div>
            <div><strong>06</strong><span>Core skill zones</span></div>
            <div><strong>∞</strong><span>Things to learn</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="tech-node node-one">JS</div>
          <div className="tech-node node-two">AI</div>
          <div className="tech-node node-three">DB</div>
          <div className="tech-node node-four">☁</div>
          <div className="profile-card">
            <div className="profile-glow" />
            <img src={profilePhoto} alt="Jai Ananth" />
            <div className="profile-caption">
              <span>PERSONAL NODE</span>
              <strong>Jai Ananth</strong>
              <small>B.Tech · 2025—2029</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro-strip">
        <div className="container two-column">
          <div>
            <p className="section-kicker">01 / THE IDEA</p>
            <h2>A portfolio built like a small cloud system.</h2>
          </div>
          <p>
            Every part of this space represents a different layer of my learning: interfaces on the surface, logic underneath, data flowing through the middle and curiosity powering everything. Explore the nodes to see what I&apos;m building.
          </p>
        </div>
      </section>

      <section className="section container feature-grid">
        <article className="feature-card accent-blue">
          <span className="feature-icon">⌘</span>
          <p>WEB LAB</p>
          <h3>Interfaces that feel clear and useful.</h3>
          <Link to="/projects">Explore builds →</Link>
        </article>
        <article className="feature-card accent-cyan">
          <span className="feature-icon">⌁</span>
          <p>DATA LAYER</p>
          <h3>Curiosity for patterns, databases and data science.</h3>
          <Link to="/skills">See skill clusters →</Link>
        </article>
        <article className="feature-card accent-violet">
          <span className="feature-icon">☁</span>
          <p>CLOUD MINDSET</p>
          <h3>Learning how modern systems connect, scale and ship.</h3>
          <Link to="/introduction">Follow the journey →</Link>
        </article>
      </section>
    </div>
  )
}

export default Home
