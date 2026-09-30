import "./App.css";

function GreetingCard(props) {
  return (
    <div id="card" style={{ textAlign: "center", padding: "20px" }}>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      <h3>{props.name}</h3>
    </div>
  );
}

function Apps() {
  return (
    <GreetingCard
      title="Happy Birthday!"
      message="Wishing you a wonderful day filled with happiness and joy."
      name="Jai"
    />
  );
}

export default Apps;