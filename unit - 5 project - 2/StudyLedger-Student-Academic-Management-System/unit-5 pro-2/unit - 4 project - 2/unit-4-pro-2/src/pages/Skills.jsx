const skillGroups = [
  { title: 'Programming', icon: '</>', tone: 'blue', items: ['Java', 'Python', 'JavaScript', 'DSA'] },
  { title: 'Web Development', icon: '◫', tone: 'cyan', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Database', icon: 'DB', tone: 'violet', items: ['DBMS', 'SQL concepts', 'Data modelling'] },
  { title: 'Cloud Computing', icon: '☁', tone: 'blue', items: ['Cloud concepts', 'Deployment basics', 'Scalable thinking'] },
  { title: 'DevOps', icon: '↻', tone: 'cyan', items: ['Git', 'Version control', 'Development workflow'] },
  { title: 'Tools & Design', icon: '✦', tone: 'violet', items: ['UI design', 'VS Code', 'GitHub', 'Problem solving'] },
]

function Skills() {
  return (
    <div className="page container">
      <div className="page-heading">
        <p className="section-kicker">05 / SKILLS</p>
        <h1>My toolkit is a set of <span>connected clusters.</span></h1>
        <p>Instead of a resume-style list, these are the areas I am practicing and connecting as I grow.</p>
      </div>

      <section className="skills-grid">
        {skillGroups.map((group) => (
          <article className={`skill-card ${group.tone}`} key={group.title}>
            <div className="skill-card-head"><span className="skill-icon">{group.icon}</span><span className="skill-signal">●</span></div>
            <p className="muted-label">SKILL CLUSTER</p>
            <h2>{group.title}</h2>
            <div className="skill-badges">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        ))}
      </section>

      <section className="skill-footer glass-panel">
        <div className="progress-orbit"><span>LEARN</span><strong>BUILD</strong><span>REFINE</span></div>
        <div><p className="section-kicker">CURRENT MINDSET</p><h2>Strong fundamentals first. Deeper specialization next.</h2><p>I&apos;m building breadth across web and programming while moving toward AI and Data Science.</p></div>
      </section>
    </div>
  )
}

export default Skills
