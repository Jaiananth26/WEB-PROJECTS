import { cloneElement, useState } from "react";
import "./form.css";

const initialValues = {
  aadhaarName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  aadhaarNumber: "",
  parentName: "",
  parentMobile: "",
  address: "",
  pincode: "",
  city: "",
  state: "",
  dob: "",
  gender: "",
  qualification: "",
};

const numericFields = new Set(["mobile", "aadhaarNumber", "parentMobile", "pincode"]);

function validate(values) {
  const errors = {};
  const validName = /^[A-Za-z][A-Za-z .'-]*$/;

  if (!values.aadhaarName.trim()) {
    errors.aadhaarName = "Enter the name shown on your Aadhaar card.";
  } else if (!validName.test(values.aadhaarName.trim())) {
    errors.aadhaarName = "Use letters and standard name punctuation only.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Create a password.";
  } else if (values.password.length < 8 || !/[A-Za-z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = "Use at least 8 characters, including a letter and a number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!/^[0-9]{10}$/.test(values.mobile)) {
    errors.mobile = "Enter a 10-digit mobile number.";
  }
  if (!/^[0-9]{12}$/.test(values.aadhaarNumber)) {
    errors.aadhaarNumber = "Enter a 12-digit Aadhaar number.";
  }

  if (!values.parentName.trim()) {
    errors.parentName = "Parent or guardian name is required.";
  } else if (!validName.test(values.parentName.trim())) {
    errors.parentName = "Use letters and standard name punctuation only.";
  }
  if (!/^[0-9]{10}$/.test(values.parentMobile)) {
    errors.parentMobile = "Enter a 10-digit parent or guardian mobile number.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  } else if (values.address.trim().length < 10) {
    errors.address = "Enter a complete address (at least 10 characters).";
  }
  if (!/^[0-9]{6}$/.test(values.pincode)) {
    errors.pincode = "Enter a 6-digit PIN code.";
  }
  if (!values.city.trim()) errors.city = "City is required.";
  if (!values.state) errors.state = "Select a state or union territory.";

  if (!values.dob) {
    errors.dob = "Date of birth is required.";
  } else if (new Date(`${values.dob}T00:00:00`) > new Date()) {
    errors.dob = "Date of birth cannot be in the future.";
  }

  if (!values.gender) errors.gender = "Select a gender.";
  if (!values.qualification) errors.qualification = "Select your qualification.";

  return errors;
}

function Field({ name, label, error, wide = false, onBlur, children }) {
  const control = cloneElement(children, {
    id: name,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
    onBlur: () => onBlur(name),
  });

  return (
    <div className={`form-group${wide ? " form-group-wide" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {control}
      {error && <p className="field-error" id={`${name}-error`}>{error}</p>}
    </div>
  );
}

function FormValidation() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  function updateErrors(nextValues, fieldName) {
    const nextErrors = validate(nextValues);
    setErrors((currentErrors) => {
      if (fieldName) {
        return { ...currentErrors, [fieldName]: nextErrors[fieldName] };
      }
      return nextErrors;
    });
  }

  function handleChange(event) {
    const { name } = event.target;
    const value = numericFields.has(name)
      ? event.target.value.replace(/\D/g, "").slice(0, name === "aadhaarNumber" ? 12 : name === "pincode" ? 6 : 10)
      : event.target.value;
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);
    setSubmitted(false);
    if (touched[name] || attempted) updateErrors(nextValues, name);
    if (name === "password" && (touched.confirmPassword || attempted)) {
      updateErrors(nextValues, "confirmPassword");
    }
  }

  function handleBlur(name) {
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
    updateErrors(values, name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setAttempted(true);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setAttempted(false);
  }

  const fieldProps = { errors, onBlur: handleBlur };

  return (
    <main className="form-container">
      <form className="validation-form" onSubmit={handleSubmit} noValidate>
        <header className="form-header">
          <p className="form-eyebrow">Student services / Enrollment</p>
          <h1>Student registration</h1>
          <p className="subtitle">Complete each section with your current information.</p>
          <p className="required-note"><span aria-hidden="true">*</span> Required information</p>
        </header>

        {attempted && Object.keys(errors).length > 0 && (
          <p className="form-alert" role="alert">
            Please review the {Object.keys(errors).length} highlighted {Object.keys(errors).length === 1 ? "field" : "fields"} and try again.
          </p>
        )}

        <section className="form-section" aria-labelledby="personal-heading">
          <div className="section-heading">
            <span className="section-number" aria-hidden="true">01</span>
            <div>
              <h2 id="personal-heading">Personal details</h2>
              <p>Use the details shown on your official documents.</p>
            </div>
          </div>
          <div className="fields-grid">
            <Field {...fieldProps} name="aadhaarName" label="Name as per Aadhaar" error={errors.aadhaarName}>
              <input type="text" autoComplete="name" value={values.aadhaarName} onChange={handleChange} placeholder="Enter your full name" />
            </Field>
            <Field {...fieldProps} name="dob" label="Date of birth" error={errors.dob}>
              <input type="date" max={new Date().toISOString().slice(0, 10)} value={values.dob} onChange={handleChange} />
            </Field>
            <Field {...fieldProps} name="gender" label="Gender" error={errors.gender}>
              <select value={values.gender} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </Field>
            <Field {...fieldProps} name="aadhaarNumber" label="Aadhaar number" error={errors.aadhaarNumber}>
              <input type="text" inputMode="numeric" autoComplete="off" value={values.aadhaarNumber} onChange={handleChange} placeholder="12-digit number" />
            </Field>
          </div>
        </section>

        <section className="form-section" aria-labelledby="contact-heading">
          <div className="section-heading">
            <span className="section-number" aria-hidden="true">02</span>
            <div>
              <h2 id="contact-heading">Contact information</h2>
              <p>We will use these details for important updates.</p>
            </div>
          </div>
          <div className="fields-grid">
            <Field {...fieldProps} name="email" label="Email address" error={errors.email}>
              <input type="email" autoComplete="email" value={values.email} onChange={handleChange} placeholder="you@example.com" />
            </Field>
            <Field {...fieldProps} name="mobile" label="Mobile number" error={errors.mobile}>
              <input type="tel" inputMode="numeric" autoComplete="tel-national" value={values.mobile} onChange={handleChange} placeholder="10-digit mobile number" />
            </Field>
            <Field {...fieldProps} name="parentName" label="Parent / guardian name" error={errors.parentName}>
              <input type="text" autoComplete="off" value={values.parentName} onChange={handleChange} placeholder="Enter full name" />
            </Field>
            <Field {...fieldProps} name="parentMobile" label="Parent / guardian mobile" error={errors.parentMobile}>
              <input type="tel" inputMode="numeric" autoComplete="off" value={values.parentMobile} onChange={handleChange} placeholder="10-digit mobile number" />
            </Field>
            <Field {...fieldProps} name="address" label="Address" error={errors.address} wide>
              <textarea autoComplete="street-address" value={values.address} onChange={handleChange} placeholder="House number, street, and area" rows="3" />
            </Field>
            <Field {...fieldProps} name="city" label="City" error={errors.city}>
              <input type="text" autoComplete="address-level2" value={values.city} onChange={handleChange} placeholder="Enter your city" />
            </Field>
            <Field {...fieldProps} name="state" label="State / union territory" error={errors.state}>
              <select autoComplete="address-level1" value={values.state} onChange={handleChange}>
                <option value="">Select a state</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
              </select>
            </Field>
            <Field {...fieldProps} name="pincode" label="PIN code" error={errors.pincode}>
              <input type="text" inputMode="numeric" autoComplete="postal-code" value={values.pincode} onChange={handleChange} placeholder="6-digit PIN code" />
            </Field>
          </div>
        </section>

        <section className="form-section" aria-labelledby="account-heading">
          <div className="section-heading">
            <span className="section-number" aria-hidden="true">03</span>
            <div>
              <h2 id="account-heading">Account security</h2>
              <p>Choose a password you have not used elsewhere.</p>
            </div>
          </div>
          <div className="fields-grid">
            <Field {...fieldProps} name="password" label="Create password" error={errors.password}>
              <input type="password" autoComplete="new-password" value={values.password} onChange={handleChange} placeholder="At least 8 characters" />
            </Field>
            <Field {...fieldProps} name="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
              <input type="password" autoComplete="new-password" value={values.confirmPassword} onChange={handleChange} placeholder="Enter your password again" />
            </Field>
            <Field {...fieldProps} name="qualification" label="Highest qualification" error={errors.qualification}>
              <select value={values.qualification} onChange={handleChange}>
                <option value="">Select a qualification</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="Diploma">Diploma</option>
                <option value="UG">Undergraduate</option>
                <option value="PG">Postgraduate</option>
              </select>
            </Field>
          </div>
        </section>

        <div className="form-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>Reset form</button>
          <button type="submit" className="submit-btn">Submit registration <span aria-hidden="true">→</span></button>
        </div>
        {submitted && <p className="success-box" role="status">Your registration details passed validation.</p>}
        <p className="privacy-note">Your personal information is used only for student registration.</p>
      </form>
    </main>
  );
}

export default FormValidation;