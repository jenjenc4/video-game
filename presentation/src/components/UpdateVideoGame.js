//create and update form & what's a react hook.. use state
import React from "react";
//Grabs the env variable (from presentation's env) from process for api_url
const API_URL = process.env.REACT_APP_API_URL;

class UpdateVideoGame extends React.Component {
  constructor(props) {
    super(props);
    const {game} = props;
    //equivalent to const game = props.games; 
    //below represents our empty form
    this.state = {
      name: game.name, 
      type: game.type,
      genre: game.genre,
      release: game.release,
      players: game.players,
      consoles: game.consoles,
      owned: game.owned 
    };
  }
  addConsoles = () => {
    const newConsoles = this.state.consoles.map((x) => x);
    newConsoles.push("");
    this.setState({ consoles: newConsoles });
  };
  removeConsole = (index) => {
    const newConsoles = this.state.consoles.map((x) => x);
    newConsoles.splice(index, 1);
    this.setState({ consoles: newConsoles });
  };
  handleConsoleChange = (value, index) => {
    const newConsoles = this.state.consoles.map((x) => x);
    newConsoles[index] = value;
    this.setState({ consoles: newConsoles });
  };
  handleChange = ({ target }) => {
    let value = target.type === "checkbox" ? target.checked : target.value;
    value = target.type === "number" ? parseInt(value) : value;
    this.setState({ [target.name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/video-games/${this.props.game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.props.refresh)
        .then(this.props.close)
}

  render() {
    const displayConsoles = this.state.consoles.map((console, index) => {
      return (
        <div key={index}>
          <select
            value={this.state.consoles[index]}
            onChange={({ target }) =>
              this.handleConsoleChange(target.value, index)
            }
          >
            <option value=""> Choose a Console</option>
            <option value="ps1">Playstation1</option>
            <option value="ps2">Playstation 2</option>
            <option value="ps3">Playstation 3</option>
            <option value="ps4">Playstation 4</option>
            <option value="xbox">Xbox</option>
            <option value="xbox360">Xbox 360</option>
            <option value="xbox1">Xbox One</option>
            <option value="nes">NES</option>
            <option value="snes">SNES</option>
            <option value="n64">Nintendo 64</option>
            <option value="gc">GameCube</option>
            <option value="switch">Switch</option>
            <option value="pc">PC</option>
          </select>
          <input
            className="del-btn"
            type="button"
            value="x"
            onClick={() => this.removeConsole(index)}
          />
        </div>
      );
    });
    return (
      <form className="update" onSubmit={this.handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Game Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="type"
          type="text"
          placeholder="Game Type"
          value={this.state.type}
          onChange={this.handleChange}
        />
        <input
          name="genre"
          type="text"
          placeholder="Game Genre"
          value={this.state.genre}
          onChange={this.handleChange}
        />
        <div>
          <label htmlFor="release">First Release </label>
          <input
            name="release"
            type="date"
            placeholder="Release Date"
            value={this.state.release}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="players">Number of Players</label>
          <input
            name="players"
            type="number"
            placeholder="Players"
            value={this.state.players}
            onChange={this.handleChange}
          />
        </div>
        {displayConsoles}
        <input type="button" value="Add Console" onClick={this.addConsoles} />
        <div>
          <label htmlFor="owned">Owned</label>
          <input
            name="owned"
            type="checkbox"
            checked={this.state.owned}
            onChange={this.handleChange}
          />
        </div>
        <button>Update Game</button>
      </form>
    );
  }
}

export default UpdateVideoGame;
