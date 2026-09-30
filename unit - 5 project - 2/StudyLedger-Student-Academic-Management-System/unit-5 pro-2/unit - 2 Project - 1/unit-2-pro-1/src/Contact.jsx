// Contact Component
function Contact({ email, phone, github }) {
  return (
    <section className="section">
      <h2>Contact</h2>
      <p>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <p>
        <strong>GitHub:</strong>{" "}
        <a href={github} target="_blank" rel="noreferrer">
          Visit my GitHub
        </a>
      </p>
    </section>
  );
}

export default Contact;