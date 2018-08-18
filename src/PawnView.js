import './Pawn.css';
import React, { Component } from 'react';
import { guilds } from './models/enums';

class PawnView extends Component{
    constructor(props) {
        super(props);

        this.pawn = props.pawn;
        this.nPawn = props.nPawn;
        this.migratePawn = props.migratePawn;
        this.removePawn = props.removePawn;
        this.startSelect = props.startSelect;
        this.endSelect = props.endSelect;

        this.renderPawnSelect = this.renderPawnSelect.bind(this);
    }

    render(){
        return (
            <div className={`pawn-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.startSelect(this.renderPawnSelect)}>
                <div className={`pawn-content pawn-${this.pawn.type}${this.getInactiveClass(this.pawn)}`} >
                </div>
            </div>
        );
    }

    getInactiveClass(pawn) {
        if(!pawn.type)
            return ' pawn-inactive';
        return '';
    }

    renderPawnSelect() {
        if(this.pawn.type)
            return <div>
                <button onClick={() => this.removePawn(this.nPawn)}>remove pawn</button>
            </div>
        else
            return <div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.farmer)}>
                        <div className={`pawn-content pawn-${guilds.farmer}`} >
                        </div>
                    </div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.merchant)}>
                        <div className={`pawn-content pawn-${guilds.merchant}`} >
                        </div>
                    </div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.alchemist)}>
                        <div className={`pawn-content pawn-${guilds.alchemist}`} >
                        </div>
                    </div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.knight)}>
                        <div className={`pawn-content pawn-${guilds.knight}`} >
                        </div>
                    </div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.noble)}>
                        <div className={`pawn-content pawn-${guilds.noble}`} >
                        </div>
                    </div>
                    <div className={`pawn-select-wrapper pawn-color-${this.pawn.color}`} onClick={() => this.migratePawn(this.nPawn, guilds.monk)}>
                        <div className={`pawn-content pawn-${guilds.monk}`} >
                        </div>
                    </div>
                </div>
    }
}

export default PawnView;
