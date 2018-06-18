import ShowRealm from './ShowRealm'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    RealmBase: state.contracts.RealmBase,
  }
}

const ShowRealmContainer = drizzleConnect(ShowRealm, mapStateToProps);

export default ShowRealmContainer
