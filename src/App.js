import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import GuildView from './GuildView';
import PlayerView from './PlayerView';
import SelectBox from './SelectBox';
import { guilds, colors } from './models/enums';
import Score from './models/Score';
import Guild from './models/Guild';
import Player from './models/Player';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { guilds: [
      new Guild(guilds.farmer),
      new Guild(guilds.merchant),
      new Guild(guilds.alchemist),
      new Guild(guilds.knight),
      new Guild(guilds.noble),
      new Guild(guilds.monk),
    ], inactivePlayers: [
      new Player(colors.red),
      new Player(colors.blue),
      new Player(colors.yellow),
      new Player(colors.pink),
      new Player(colors.green),
      new Player(colors.grey),
    ], players: [],
      selectBox: { hidden: true, renderer: null } };

    this.epoch = 1;
    this.refreshGuilds = this.refreshGuilds.bind(this);
    this.nextEraAndScore = this.nextEraAndScore.bind(this);
    this.startSelect = this.startSelect.bind(this);
    this.endSelect = this.endSelect.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Feudum Companion</h1>
        </header>
        <div className="guilds">
          <GuildView guild={this.state.guilds[0]} />
          <GuildView guild={this.state.guilds[1]}  />
          <GuildView guild={this.state.guilds[2]} />
          <GuildView guild={this.state.guilds[3]} />
          <GuildView guild={this.state.guilds[4]} />
          <GuildView guild={this.state.guilds[5]} />
        </div>
        <div className="players">
          {this.renderActivePlayers()}
        </div>
        <div className="nonActivePlayers">
          {this.renderInactivePlayers()}
        </div>
        <SelectBox selectBox={this.state.selectBox} endSelect={this.endSelect} />
      </div>
    );
  }

  nextEraAndScore() {
    this.epoch += 1;

    const score = {};
    score[colors.red] = new Score(this.players[colors.red], this.getGuilds());
    score[colors.blue] = new Score(this.players[colors.blue], this.getGuilds());
    score[colors.yellow] = new Score(this.players[colors.yellow], this.getGuilds());
    score[colors.pink] = new Score(this.players[colors.pink], this.getGuilds());
    score[colors.green] = new Score(this.players[colors.green], this.getGuilds());
    score[colors.grey] = new Score(this.players[colors.grey], this.getGuilds());

    return score;
  }

  refreshGuilds(player, statusQuo) {
    const guilds = this.state.guilds;
    let influence = player.getInfluence();
    for(let g of guilds) {
      g.setInfluence(player.color, influence, statusQuo);
    }
    this.setState({ guilds });
  }

  renderActivePlayers() {
    const players = this.state.players.map((p, i) => <PlayerView key={i} player={p} refreshGuilds={this.refreshGuilds} startSelect={this.startSelect} endSelect={this.endSelect} />);
    return players;
  }

  renderInactivePlayers() {
    const players = this.state.inactivePlayers
      .map((p, i) => <div key={i} className={`add-player pawn-color-${p.color}`} onClick={() => this.addPlayer(p)}></div>);
    return players;
  }

  addPlayer(p) {
    const inactivePlayers = this.state.inactivePlayers;
    const players = this.state.players;

    const i = inactivePlayers.indexOf(p);
    const player = inactivePlayers.splice(i, 1);
    players.push(player[0]);
    
    this.setState({ players, inactivePlayers });
  }

  startSelect(render) {
    const selectBox = this.state.selectBox;
    selectBox.render = render;
    selectBox.hidden = false;
    this.setState({ selectBox });
  }

  endSelect(x) {
    const selectBox = this.state.selectBox;
    selectBox.render = null;
    selectBox.hidden = true;
    this.setState({ selectBox });
  }
}

export default App;
