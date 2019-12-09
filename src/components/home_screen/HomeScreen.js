import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeListLinks from './WireframeListLinks';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {

    administrator = () => {
        if(this.props.profile.admin){
            return (
                <NavLink to="/databaseTester">Database Tester</NavLink>
            );
        }else{
            return null 
        }
        
    }

    createWireframeList = () => {
        const { wireframeLists } = this.props;
        const { id } = this.props.auth.uid;
        let list = {
            "key": 0,
            "name": "Unknown",
			"selected": null,
            "controls": []
        };
        wireframeLists.splice(0, 0, list);
        getFirestore().collection('users').doc(id).update({
            wireframeLists: wireframeLists
        }).then(doc => {
            this.props.history.push({pathname: "/wireframe/"+id + "/"+doc.id});
        });

    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeListLinks />
                    </div>
                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        <div className="home_new_list_container" style={{paddingTop:'5px'}}>
                                <Button className="home_new_list_button" waves="light" large style={{height:'120px'}}>
                                    Create a New To Do List
                                </Button>
                        </div>
                    </div>
                    {this.administrator()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        wireframeLists: state.firebase.profile.wireframeLists,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(HomeScreen);