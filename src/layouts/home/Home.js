import React, { Component } from 'react'
import { AccountData, ContractForm, ContractData } from 'drizzle-react-components'

// Components
import ShowRealm from "../../components/showRealm/ShowRealm";

// Assets
import logo from '../../logo.png'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Crypto Guys</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

            <br/><br/>
          </div>
        
          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          {/* <div className="pure-u-1-1">
            <h2>SimpleStorage</h2>
            <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
            <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
            <ContractForm contract="SimpleStorage" method="set" />

            <br/><br/>
          </div> */}

          <div className="pure-u-1-1">
            <h2>Your Guys</h2>
            <ShowRealm account={this.props.accounts[0]} />
            {/* <TokenCard contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]}/> */}
            {/* {this.props.drizzleStatus.initialized ? this.props.SimpleStorage.storedData.data() : 'Loading...'} */}
          </div>
        </div>
      </main>
    )
  }
}

export default Home
