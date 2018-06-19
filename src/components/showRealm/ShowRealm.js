import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Phaser from "phaser"
import styles from "./styles.css";

import GameScene from "../gameScene";

class ShowRealm extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      tiles: {}
    }

    this.contracts = context.drizzle.contracts
    console.log(this.props)

  }

  componentDidMount() {
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game",
      scene: new GameScene(this)
    };
    this.game = new Phaser.Game(config);
  }

  shouldComponentUpdate(nextProps, nextState){
		return false;
  }

  render() {
    // If the data is here, get it and display it
    return (
      <div ref="game" id="game" className={styles.game}>
      </div>
    )
  }
}

ShowRealm.contextTypes = {
  drizzle: PropTypes.object
}

export default ShowRealm;