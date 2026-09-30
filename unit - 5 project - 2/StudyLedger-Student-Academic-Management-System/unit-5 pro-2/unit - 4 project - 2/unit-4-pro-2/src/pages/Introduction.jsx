const journey = [
  { step: '01', title: 'Start with curiosity', text: 'Computer Science became interesting when I started seeing how simple code could turn an idea into an interactive result.' },
  { step: '02', title: 'Learn the foundations', text: 'I am building a strong base in programming, DSA, databases and the web so I can understand problems before reaching for shortcuts.' },
  { step: '03', title: 'Build real mini-projects', text: 'Projects like a weather app, attendance app and handloom silk saree website help me connect concepts with practical interfaces.' },
  { step: '04', title: 'Move toward AI & Data', text: 'My next direction is deeper data science and AI, while continuing to improve the web skills that help me present and ship useful ideas.' },
]

function Introduction() {
  return (
    <div className="page container">
      <div className="page-heading split-heading">
        <div><p className="section-kicker">03 / INTRODUCTION</p><h1>My journey is a <span>connected path.</span></h1></div>
        <p>Each layer builds on the previous one. I am still early in the journey, which means there is plenty of room to experiment, learn and improve.</p>
      </div>

      <section className="journey-grid">
        <div className="journey-visual glass-panel">
          <div className="cloud-large">☁</div>
          <div className="journey-line" />
          <div className="journey-node">C</div>
          <div className="journey-node">D</div>
          <div className="journey-node">A</div>
          <div className="journey-caption"><span>LEARNING NETWORK</span><strong>Curiosity → Practice → Build → Grow</strong></div>
        </div>
        <div className="timeline">
          {journey.map((item) => (
            <article className="timeline-item" key={item.step}>
              <div className="timeline-marker">{item.step}</div>
              <div><p className="muted-label">NODE {item.step}</p><h2>{item.title}</h2><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="learning-cards">
        <article className="glass-panel"><span>NOW LEARNING</span><h3>React · JavaScript · DBMS · DSA</h3><p>Strengthening the foundations that let me create better applications.</p></article>
        <article className="glass-panel"><span>EXPLORING</span><h3>Data Science · AI · Cloud</h3><p>Understanding how data and intelligent systems can solve useful problems.</p></article>
        <article className="glass-panel"><span>FUTURE DIRECTION</span><h3>AI &amp; Data + Web Development</h3><p>Combining intelligent data-driven thinking with polished, accessible interfaces.</p></article>
      </section>
    </div>
  )
}

export default Introduction
