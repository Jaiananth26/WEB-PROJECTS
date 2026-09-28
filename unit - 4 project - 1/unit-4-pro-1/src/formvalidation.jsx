import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialValues = { fullName: '', email: '', password: '', role: '', terms: false }

const validate = (values) => {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Use a valid email address.'
  if (values.password.length < 8) errors.password = 'Use at least 8 characters.'
  if (!values.role) errors.role = 'Choose the option that fits you best.'
  if (!values.terms) errors.terms = 'You need to accept the terms to continue.'
  return errors
}

export function SuccessMessage() {
  return (
    <main className="success-page">
      <div className="success-mark" aria-hidden="true">OK</div>
      <p className="eyebrow">You are all set</p>
      <h1>Welcome to the circle.</h1>
      <p className="success-copy">Your account is ready. We saved your preferences and will take you to your workspace next.</p>
      <Link className="primary-button" to="/">Back to sign up <span aria-hidden="true">-&gt;</span></Link>
    </main>
  )
}

function FormValidation() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const errors = validate(values)
  const passwordChecks = [
    ['length', '8+ characters', values.password.length >= 8],
    ['number', 'A number', /\d/.test(values.password)],
    ['symbol', 'A symbol', /[^A-Za-z0-9]/.test(values.password)],
  ]
  const strength = passwordChecks.filter(([, , valid]) => valid).length

  const updateValue = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const markTouched = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextTouched = Object.keys(initialValues).reduce((current, key) => ({ ...current, [key]: true }), {})
    setTouched(nextTouched)
    if (Object.keys(errors).length === 0) navigate('/welcome')
  }

  const fieldError = (name) => touched[name] && errors[name]

  return (
    <main className="page-shell">
      <section className="brand-panel">
        <Link className="brand" to="/" aria-label="Northstar home"><span className="brand-dot" />northstar</Link>
        <div className="brand-message">
          <p className="eyebrow">A clearer way forward</p>
          <h1>Make room for<br /><em>better work.</em></h1>
          <p>Join a thoughtful space for teams who want to move with intention, not noise.</p>
        </div>
        <div className="testimonial">
          <span className="quote-mark">“</span>
          <p>Northstar helped us turn scattered ideas into a rhythm our whole team could trust.</p>
          <div className="person"><span className="avatar">AM</span><span><strong>Alex Morgan</strong><small>Product lead, Fieldwork</small></span></div>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-wrap">
          <div className="form-heading">
            <span className="step-label">Step 1 of 1</span>
            <div className="progress"><span /></div>
            <h2>Start your journey</h2>
            <p>It takes less than two minutes. No credit card required.</p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-grid">
              <label className={fieldError('fullName') ? 'has-error' : ''}><span>Full name</span><input name="fullName" value={values.fullName} onChange={updateValue} onBlur={markTouched} placeholder="e.g. Jordan Lee" autoComplete="name" />{fieldError('fullName') && <small>{errors.fullName}</small>}</label>
              <label className={fieldError('email') ? 'has-error' : ''}><span>Work email</span><input name="email" type="email" value={values.email} onChange={updateValue} onBlur={markTouched} placeholder="you@company.com" autoComplete="email" />{fieldError('email') && <small>{errors.email}</small>}</label>
            </div>
            <label className={fieldError('role') ? 'has-error' : ''}><span>What best describes you?</span><select name="role" value={values.role} onChange={updateValue} onBlur={markTouched}><option value="">Select your role</option><option value="founder">Founder or owner</option><option value="designer">Designer</option><option value="developer">Developer</option><option value="manager">Team manager</option></select>{fieldError('role') && <small>{errors.role}</small>}</label>
            <label className={fieldError('password') ? 'has-error' : ''}><span>Create a password</span><div className="password-input"><input name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={updateValue} onBlur={markTouched} placeholder="At least 8 characters" autoComplete="new-password" /><button type="button" className="show-button" onClick={() => setShowPassword((current) => !current)}>{showPassword ? 'Hide' : 'Show'}</button></div><div className="strength" aria-label={`Password strength: ${strength} of 3`}><span className={strength > 0 ? 'active' : ''} /><span className={strength > 1 ? 'active' : ''} /><span className={strength > 2 ? 'active' : ''} /></div><div className="password-hints">{passwordChecks.map(([key, text, valid]) => <span key={key} className={valid ? 'valid' : ''}>{valid ? '✓' : '○'} {text}</span>)}</div>{fieldError('password') && <small>{errors.password}</small>}</label>
            <label className={`terms ${fieldError('terms') ? 'has-error' : ''}`}><input name="terms" type="checkbox" checked={values.terms} onChange={updateValue} onBlur={markTouched} /><span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span></label>
            {fieldError('terms') && <small className="terms-error">{errors.terms}</small>}
            <button className="primary-button submit-button" type="submit">Create my account <span aria-hidden="true">-&gt;</span></button>
          </form>
          <p className="login-prompt">Already have an account? <a href="#login">Log in</a></p>
        </div>
      </section>
    </main>
  )
}

export default FormValidation
