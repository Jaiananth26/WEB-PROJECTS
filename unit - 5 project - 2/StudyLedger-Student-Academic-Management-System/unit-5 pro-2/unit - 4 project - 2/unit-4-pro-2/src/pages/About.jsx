function About() {
  return (
    <div className="page container">
      <div className="page-heading">
        <p className="section-kicker">02 / ABOUT</p>
        <h1>A little context behind the <span>builder.</span></h1>
        <p>Not a resume. Just the story, interests and learning habits that shape how I approach technology.</p>
      </div>

      <section className="about-layout">
        <article className="glass-panel about-main">
          <div className="number-chip">01</div>
          <h2>Learning by making things.</h2>
          <p>
            I&apos;m Jai Ananth, a B.Tech student at Prince Dr K Vasudevan College of Engineering and Technology. I enjoy taking an idea, breaking it into smaller pieces and turning it into something people can actually interact with.
          </p>
          <p>
            My interests move across web development, UI design, data science, DBMS, DSA, Java and Python. That mix keeps me curious about both what users see and what makes an application work underneath.
          </p>
        </article>

        <div className="about-stack">
          <article className="glass-panel mini-panel">
            <span className="mini-icon">🎓</span>
            <div><p className="muted-label">EDUCATION</p><h3>B.Tech</h3><p>2025—2029 · Prince Dr K Vasudevan College of Engineering and Technology</p></div>
          </article>
          <article className="glass-panel mini-panel">
            <span className="mini-icon">✦</span>
            <div><p className="muted-label">INTERESTS</p><h3>Build + explore</h3><p>Web development, designing, data science, DBMS, DSA, Java and Python.</p></div>
          </article>
          <article className="glass-panel mini-panel">
            <span className="mini-icon">↗</span>
            <div><p className="muted-label">DIRECTION</p><h3>AI &amp; Data + Web</h3><p>Growing toward practical AI/Data Science work while continuing to build strong web fundamentals.</p></div>
          </article>
        </div>
      </section>

      <section className="quote-panel">
        <span>“</span>
        <p>The best way for me to understand a technology is to build something with it.</p>
      </section>
    </div>
  )
}

export default About
