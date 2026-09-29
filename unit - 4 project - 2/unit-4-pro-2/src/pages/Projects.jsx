import { Link } from 'react-router-dom'

const projects = [
  {
    number: '01', title: 'Handloom Silk Saree Website', tag: 'E-COMMERCE UI', description: 'A visual web experience for showcasing handloom silk sarees with a focus on product presentation, browsing and clean design.', tech: ['HTML', 'CSS', 'JavaScript'], icon: '◈',
  },
  {
    number: '02', title: 'Weather App', tag: 'DATA + API', description: 'A weather-focused interface designed to turn live weather information into a simple, readable experience for users.', tech: ['JavaScript', 'API', 'CSS'], icon: '☁',
  },
  {
    number: '03', title: 'Attendance App', tag: 'PRODUCTIVITY', description: 'A practical attendance concept for tracking student records and making routine academic management more organized.', tech: ['React', 'JavaScript', 'UI Design'], icon: '✓',
  },
]

function Projects() {
  return (
    <div className="page container">
      <div className="page-heading split-heading">
        <div><p className="section-kicker">04 / PROJECTS</p><h1>Small builds, <span>real lessons.</span></h1></div>
        <p>These projects are part of my hands-on learning. Each one helped me practice a different part of the development process.</p>
      </div>

      <section className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-top"><span>{project.number}</span><span className="project-tag">{project.tag}</span></div>
            <div className="project-icon">{project.icon}</div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tech-list">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="project-actions">
              <a href="https://github.com/Jaiananth26" target="_blank" rel="noreferrer">GitHub ↗</a>
              <button type="button" className="disabled-demo" title="Demo link placeholder">Demo placeholder</button>
            </div>
          </article>
        ))}
      </section>

      <section className="project-note glass-panel">
        <div><span className="section-kicker">BUILD LOG</span><h2>More experiments are on the way.</h2></div>
        <p>I&apos;m continuing to turn classroom concepts into small applications. The next layer of the portfolio will grow with each new build.</p>
        <Link className="btn btn-primary" to="/contact">Let&apos;s connect →</Link>
      </section>
    </div>
  )
}

export default Projects
