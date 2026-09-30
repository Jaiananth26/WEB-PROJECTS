import { useState } from 'react'

function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="page container">
      <div className="page-heading split-heading">
        <div><p className="section-kicker">06 / CONTACT</p><h1>Let&apos;s open a <span>connection.</span></h1></div>
        <p>Have a project idea, feedback or just want to talk technology? Send a message through the form or find me through the links below.</p>
      </div>

      <section className="contact-grid">
        <div className="contact-info">
          <div className="contact-cloud glass-panel"><span>☁</span><strong>ONLINE NODE</strong><p>Open to learning, collaboration and interesting ideas.</p></div>
          <div className="contact-links">
            <a href="mailto:jaiananth678@gmail.com"><span>✉</span><div><small>EMAIL</small><strong>jaiananth678@gmail.com</strong></div></a>
            <a href="https://github.com/Jaiananth26" target="_blank" rel="noreferrer"><span>⌘</span><div><small>GITHUB</small><strong>Jaiananth26</strong></div></a>
            <a href="https://www.linkedin.com/in/jai-ananth" target="_blank" rel="noreferrer"><span>in</span><div><small>LINKEDIN</small><strong>Jai Ananth</strong></div></a>
          </div>
        </div>

        <form className="contact-form glass-panel" onSubmit={handleSubmit}>
          <div className="form-header"><div><p className="section-kicker">MESSAGE PACKET</p><h2>Send a note</h2></div><span>● SECURE</span></div>
          <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" rows="6" placeholder="Tell me what you are working on..." required /></label>
          <button className="btn btn-primary" type="submit">{sent ? 'Message ready ✓' : 'Send message →'}</button>
          {sent && <p className="form-note">Thanks! This demo form is ready for a real backend or email service when you want to connect it.</p>}
        </form>
      </section>
    </div>
  )
}

export default Contact
