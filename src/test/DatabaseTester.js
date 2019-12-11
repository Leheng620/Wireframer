import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        const id = this.props.auth.uid;
        // fireStore.collection('todoLists').get().then(function(querySnapshot){
        //     querySnapshot.forEach(function(doc) {
        //         console.log("deleting " + doc.id);
        //         fireStore.collection('todoLists').doc(doc.id).delete();
        //     })
        // });
        fireStore.collection('users').doc(id).update({
            wireframeLists : []
        })
    }

    handleReset = () => {
        const fireStore = getFirestore();
        const id = this.props.auth.uid;
        const wireframeLists = this.props.profile.wireframeLists;
        wireframeJson.wireframeLists.forEach(wireframeListJson => {
            wireframeLists.push({
                    key: wireframeListJson.key,
                    name: wireframeListJson.name,
                    selected: wireframeListJson.selected,
                    width: wireframeListJson.width,
                    height: wireframeListJson.height,
                    controls: wireframeListJson.controls
                })
        });
        fireStore.collection('users').doc(id).update({
            wireframeLists: wireframeLists
        }).then(() => {
            console.log("DATABASE RESET");
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        if (!this.props.auth.uid || !this.props.profile.admin) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);