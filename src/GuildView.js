import './Guild.css';
import React, { Component } from 'react';

class GuildView extends Component{
    constructor(props) {
        super(props);

        this.guild = props.guild;
        this.renderMember = this.renderMember.bind(this);
    }

    // show guild portrait
    // show guld symbol
    // show location type improving influence on guild
    // show which players are "almost" in guild
    // show players that have guild locations but no primary influence
    render(){
        return (
            <div className={`guild-wrapper guild-${this.guild.guild}`}>
                <img className={`guild-portrait guild-portrait-${this.guild.guild}`} />
                <img className={`guild-icon guild-icon-${this.guild.guild}`} />

                {this.renderMember(this.guild.apprentice(), this.guild.getInfluence(this.guild.apprentice()))}
                {this.renderMember(this.guild.journeyman(), this.guild.getInfluence(this.guild.journeyman()))}
                {this.renderMember(this.guild.master(), this.guild.getInfluence(this.guild.master()))}

                {/* <div>
                    <p>master: {(this.guild.master() || 'none')}</p>
                    <p>journeyman: {(this.guild.journeyman() || 'none')}</p>
                    <p>apprentice: {(this.guild.apprentice() || 'none')}</p>
                </div> */}
            </div>
        );
    }

    renderMember(color, influence) {
        return (
            <div class="hexagon-wrapper">
                <div class="hexagon-container">
                    <div class={`hexagon color-${color}`}>
                        <div className="hexagon-content">
                            {influence}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GuildView;
