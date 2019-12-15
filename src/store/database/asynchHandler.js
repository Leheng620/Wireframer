import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
      let type = err.code.split('/')[1];
      document.getElementById('login-error').innerHTML=type;
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then((resp) => {
        firestore.collection('users').doc(resp.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
          admin: false,
          wireframeLists: new Array(),
        });
    }).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
        checkError(err);
      });
};

export const checkError = (err) => {
  let type = err.code.split('/')[1];
  if (type.search('email') !== -1){
    document.getElementById('email-error').innerHTML = err.message;
  }else{
    document.getElementById('email-error').innerHTML = "";
  }
  if (type.search('password') !== -1){
    document.getElementById('password-error').innerHTML = err.message;
  }
}
