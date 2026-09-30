import Drawing from "./assets/Drawing.png";
import Music from "./assets/Music.png";
import Reading from "./assets/Reading.png";
import Photography from "./assets/Photography.png";
import Traveling from "./assets/Travel.png";
import Cooking from "./assets/Cooking.png";
import "./App.css";

//child component

function HobbyCard(props) {
  return (
    <div className="card">

      <img
        src={props.image}
        alt={props.hobby}
      />

      <h2>{props.hobby}</h2>

      <p>{props.description}</p>

    </div>
  );
}

//Parent component
function Hobby() {
  return (
    <div className="hobby-page">
      <h1>My Hobbies</h1>

      <div className="hobby-container">

        <HobbyCard
          image={Drawing}
          hobby="Drawing"
          description="I enjoy drawing pictures."
        />

        <HobbyCard
          image={Music}
          hobby="Music"
          description="I love listening to music."
        />

        <HobbyCard
          image={Reading}
          hobby="Reading"
          description="I enjoy reading books."
        />

        <HobbyCard
          image={Photography}
          hobby="Photography"
          description="I like taking beautiful photos."
        />

        <HobbyCard
          image={Traveling}
          hobby="Traveling"
          description="I enjoy visiting new places."
        />

        <HobbyCard
          image={Cooking}
          hobby="Cooking"
          description="I enjoy cooking different dishes."
        />

      </div>
    </div>
  );
}





export default Hobby;