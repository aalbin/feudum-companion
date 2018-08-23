import './Guild.css';
import React, { Component } from 'react';

class GuildView extends Component{
    constructor(props) {
        super(props);

        this.guild = props.guild;
        this.renderMember = this.renderMember.bind(this);
        this.renderSecondaryInfluenceTrack = this.renderSecondaryInfluenceTrack.bind(this);
    }

    // show location type improving influence on guild
    // show players that have guild locations but no primary influence
    render(){
        return (
            <div className={`guild-wrapper guild-${this.guild.guild}`}>
                <img className={`guild-portrait guild-portrait-${this.guild.guild}`} />

                <br/>
                <img className={`location-icon location-icon-dummy`} />
                <img className={`guild-icon guild-icon-${this.guild.guild}`} />
                <img className={`location-icon location-icon-${this.guild.getSecondaryInfluenceLocation()}`} />
                <br/>

                {this.renderMember('apprentice', this.guild.apprentice(), this.guild.getInfluence(this.guild.apprentice()))}
                {this.renderMember('journeyman', this.guild.journeyman(), this.guild.getInfluence(this.guild.journeyman()))}
                {this.renderMember('master', this.guild.master(), this.guild.getInfluence(this.guild.master()))}

                {this.renderSecondaryInfluenceTrack()}

                {/* <p>{JSON.stringify(this.guild.getSecondaryRankings())}</p> */}

                {/* <div>
                    <p>master: {(this.guild.master() || 'none')}</p>
                    <p>journeyman: {(this.guild.journeyman() || 'none')}</p>
                    <p>apprentice: {(this.guild.apprentice() || 'none')}</p>
                </div> */}
            </div>
        );
    }

    renderMember(position, color, influence) {
        return (
            <div className={`hexagon-wrapper-${position}`}>
                <div className="hexagon-container">
                    <div className={`hexagon color-${color}`}>
                        <div className="hexagon-content">
                            {influence}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderSecondaryInfluenceTrack() {
        return this.guild.getSecondaryRankings().map((r, i) => <div key={i} className={`guild-secondary-influence-tracker color-${r.color}`}><div className="guild-secondary-influence-tracker-content">{r.value}</div></div>);
    }
}

export default GuildView;
