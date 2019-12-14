import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { logoutHandler } from '../../store/database/asynchHandler'
import { getFirestore } from 'redux-firestore';

class LoggedInLinks extends React.Component {

  fixKey = (uid,wireframeLists) => {
    let newWireframeLists = wireframeLists;
    for(let i = 0; i < newWireframeLists.length; i++){
      newWireframeLists[i].key = i;
    }
    getFirestore().collection('users').doc(uid).update({
      wireframeLists: newWireframeLists
    })
  }

  // As in SignIn.jsx we need to use a function that gets as an argument firebase object
  handleLogout = () => {
    const { firebase } = this.props;
    let wireframeLists = this.props.profile.wireframeLists;
    this.fixKey(this.props.uid,wireframeLists);
    this.props.signOut(firebase);
  }

  render() {
    const { profile } = this.props;
    return (
      <ul className="right">
        <li><NavLink to="/" onClick={this.handleLogout}>Log Out</NavLink></li> {/* I left NavLink instead of anchor tag because I'm using airbnb eslint rules */}
        <li><NavLink to="/" className="btn btn-floating pink lighten-1">{profile.initials}</NavLink></li>
      </ul>
    );
  };
}

const mapDispatchToProps = dispatch => ({
  signOut: firebase => dispatch(logoutHandler(firebase)),
});

export default compose(
  firebaseConnect(),
  connect(null, mapDispatchToProps),
)(LoggedInLinks);