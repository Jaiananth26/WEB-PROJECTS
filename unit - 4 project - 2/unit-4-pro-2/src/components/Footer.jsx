import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">JAI ANANTH<span>.</span></div>
          <p>Building at the intersection of web, data and cloud technology.</p>
        </div>
        <div className="footer-links">
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-copy">© 2026 Jai Ananth · Cloud Nexus Portfolio</div>
      </div>
    </footer>
  )
}

export default Footer
