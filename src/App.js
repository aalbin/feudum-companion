import React, { Component } from 'react';
import logo from './assets/feudum-logo.jpg';
import './App.css';
import GuildView from './GuildView';
import PlayerView from './PlayerView';
import SelectBox from './SelectBox';
import { guilds, colors, playerTypes } from './models/enums';
import Score from './models/Score';
import Guild from './models/Guild';
import Player from './models/Player';

class App extends Component {
  constructor(props) {
    super(props);

    const savedState = this.loadState() || {};
    this.state = {
      guilds: savedState.guilds || [
        new Guild(guilds.farmer),
        new Guild(guilds.merchant),
        new Guild(guilds.alchemist),
        new Guild(guilds.knight),
        new Guild(guilds.noble),
        new Guild(guilds.monk),
      ], inactivePlayers: savedState.inactivePlayers || [
        new Player(colors.red, playerTypes.human),
        new Player(colors.blue, playerTypes.human),
        new Player(colors.yellow, playerTypes.human),
        new Player(colors.pink, playerTypes.human),
        new Player(colors.green, playerTypes.human),
        new Player(colors.grey, playerTypes.human),
        new Player(colors.black, playerTypes.ai),
      ], players: savedState.players || [],
      selectBox: { hidden: true, renderer: null }
    };

    this.epoch = 1;
    this.refreshGuilds = this.refreshGuilds.bind(this);
    this.nextEraAndScore = this.nextEraAndScore.bind(this);
    this.startSelect = this.startSelect.bind(this);
    this.endSelect = this.endSelect.bind(this);
    this.moveLocation = this.moveLocation.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.renderResetPrompt = this.renderResetPrompt.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="feudum-logo" alt="logo" />
          {/* <p class="feudum-logo-subtitle">COMPANION</p> */}
          <div class="reset-button" onClick={() => this.startSelect(this.renderResetPrompt)}></div>
        </header>
        <div className="guilds">
          <GuildView guild={this.state.guilds[0]} />
          <GuildView guild={this.state.guilds[1]} />
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

  renderActivePlayers() {
    const players = this.state.players.map((p, i) => <PlayerView key={i} player={p} refreshGuilds={this.refreshGuilds} startSelect={this.startSelect} endSelect={this.endSelect} moveLocation={this.moveLocation} />);
    return players;
  }

  renderInactivePlayers() {
    const players = this.state.inactivePlayers
      .map((p, i) => <div key={i} className={`add-player pawn-color-${p.color}`} onClick={() => this.addPlayer(p)}></div>);
    return players;
  }

  renderResetPrompt() {
    return <div>
        <h3>reset game?</h3>
        <button onClick={this.resetGame}>yes</button>
        <button onClick={this.endSelect}>no</button>
      </div>
  }

  refreshGuilds(player, statusQuo) {
    const guilds = this.state.guilds;
    let influence = player.getInfluence();
    for (let g of guilds) {
      g.setInfluence(player.color, influence, statusQuo);
    }
    this.setState({ guilds });
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

  moveLocation(key, target) {
    const players = this.state.players;
    const sourcePlayer = players.filter(p => p.locs.filter(l => l.key === key).length === 1)[0];
    const location = sourcePlayer.removeLocation(key);
    const targetPlayer = players.filter(p => p.color === target)[0];
    targetPlayer.addLocation(location);

    this.refreshGuilds(sourcePlayer);
    this.refreshGuilds(targetPlayer);
    this.setState({ players });
  }
  
  componentDidUpdate(prevProps, prevState){
    console.log('updated', this.state)
    let stateCopy = {...this.state};
    delete stateCopy.selectBox;
    localStorage.setItem('feudum-companion-state', JSON.stringify(stateCopy));
  }

  resetGame() {
    const state = {};
    state.guilds = this.state.guilds.map(g => g.reset());
    state.inactivePlayers = [
      new Player(colors.red, playerTypes.human),
      new Player(colors.blue, playerTypes.human),
      new Player(colors.yellow, playerTypes.human),
      new Player(colors.pink, playerTypes.human),
      new Player(colors.green, playerTypes.human),
      new Player(colors.grey, playerTypes.human),
      new Player(colors.black, playerTypes.ai),
    ];
    state.players = [];
    this.setState(state);
    this.endSelect();
  }

  loadState() {
    console.log('loading state');
    const state = JSON.parse(localStorage.getItem('feudum-companion-state'));
    if(state){
      return {
        guilds: state.guilds.map(g => Guild.fromPOCO(g)),
        inactivePlayers: state.inactivePlayers.map(p => Player.fromPOCO(p)),
        players: state.players.map(p => Player.fromPOCO(p)),
      };
    }
  }
}

export default App;
