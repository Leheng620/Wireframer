import React from 'react'
import { connect } from 'react-redux';
import wireframeJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';


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
            return <Redirect to="/Wireframer/login" />;
        }
        return (
            <div style={{textAlign:'center'}}>
                <div style={{textAlign:'center', width:'50%',height:'50%',position:'relative',display:'inline-block'}}>
                    <Button onClick={this.handleClear} style={{margin:'10px'}}>Clear Database</Button>
                    <Button onClick={this.handleReset} style={{margin:'10px'}}>Reset Database</Button>
                </div>
                
                <div>
                    <Link to={"/Wireframer/"+this.props.auth.uid}><Button>Go Back</Button></Link>
                </div>
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