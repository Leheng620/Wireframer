import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { getFirestore } from 'redux-firestore';


class Navbar extends React.Component {

  fixKey = (auth,profile) => {
    if(auth.uid){
      let wireframeLists = profile.wireframeLists;
      for(let i = 0; i < wireframeLists.length; i++){
          wireframeLists[i].key = i;
      }
      getFirestore().collection('users').doc(auth.uid).update({
        wireframeLists: wireframeLists
      })
    }
    
  }
  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;
    //const path = auth.uid ? "/wireframe/" + auth.uid : "/";

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link onClick={() => this.fixKey(auth,profile)} to="/" className="brand-logo" id="go-home">@todo</Link>
          {links}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);