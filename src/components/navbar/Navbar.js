import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';



class Navbar extends React.Component {

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks uid={auth.uid} profile={profile} /> : <LoggedOutLinks />;
    //const path = auth.uid ? "/wireframe/" + auth.uid : "/";
    const home = auth.uid ? <div className="brand-logo" id="go-home" style={{cursor:'default'}}>Wireframer!</div> : 
      <Link to="/" className="brand-logo" id="go-home">Wireframer!</Link>


    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          {home}
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