import React, { Component } from "react";
import defaultavi from "./default.jpg";
// import Autocomplete from "./components/Autocomplete";

const mStyle = { margin: "10px" };
const hStyle = { position: "center" };

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      list: false,
      card: false,
      artists: [],
      artist: {},
      artist1: { name: "", id: "" },
      artist2: { name: "", id: "" },
      flag1: true,
      flag2: true,
      search1: false,
      search2: false,
    };
  }

  componentDidMount() {
    // fetch("http://localhost:3001/artists/list")
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({ artists: responseJson.data });
    //   });
    this.setState({ artists: [] });
  }

  showCard = (id) => {
    fetch(`http://localhost:3001/artists/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ artist: responseJson.data });
      });
    this.setState({
      list: false,
      card: true,
    });
  };

  showList = (name) => {
    var fix_name = encodeURIComponent(name);
    fetch("http://localhost:3001/artists/list/" + fix_name)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ artists: responseJson.data });
      });
    this.setState({
      card: false,
      list: true,
    });
  };

  handleChange(event) {
    console.log(event.target.className);
    this.showList(event.target.value);
    if (event.target.className === "firstinput") {
      this.setState({
        artist1: { name: event.target.value },
        flag1: true,
        search1: true,
        search2: false,
      });
    }
    if (event.target.className === "secondinput") {
      this.setState({
        artist2: { name: event.target.value },
        flag2: true,
        search2: true,
        search1: false,
      });
    }
  }

  handleInputClick(event) {
    console.log(event.target.className);
    if (event.target.className === "firstinput") {
      this.setState({
        search1: true,
        search2: false,
      });
    }
    if (event.target.className === "secondinput") {
      this.setState({
        search2: true,
        search1: false,
      });
    }
  }

  storeArtist = (artist) => {
    console.log(artist);
    if (this.state.search1 == true) {
      this.setState({
        artist1: artist,
      });
    }
    if (this.state.search2 == true) {
      this.setState({
        artist2: artist,
      });
    }
  };

  dummy = () => {};

  render() {
    return (
      <div className="container">
        <h1 className="header1">Six Degrees of Separation</h1>
        <h2 className="header2">
          Choose two artists to see how they are connected!
        </h2>
        <input
          type="text"
          name="artist1"
          className="firstinput"
          placeholder="First Artist"
          onChange={this.handleChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          value={this.state.artist1.name}
        />
        <input
          type="text"
          name="artist1"
          className="secondinput"
          placeholder="Second Artist"
          onChange={this.handleChange.bind(this)}
          onClick={this.handleInputClick.bind(this)}
          value={this.state.artist2.name}
        />
        {this.state.list && this.state.artists ? (
          <div className="list-group">
            {this.state.artists.map((artist) => (
              <li
                key={artist.id}
                onClick={() => this.storeArtist(artist)}
                className="list-group-item list-group-item-action"
                style={mStyle}
              >
                <img src={artist.hq_image} className="avi" alt={defaultavi} />
                {artist.name}
              </li>
            ))}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <button onClick={() => this.dummy()} class="btn btn-primary">
            Enter
          </button>
        </div>
        {/* {this.state.card ? (
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">{this.state.artist.name}</h5>
              <p class="card-text">{this.state.artist.runs}</p>
              <div onClick={() => this.showList()} class="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null} */}
      </div>
    );
  }
}
