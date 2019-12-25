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
                <NavLink to={"/Wireframer/"+this.props.auth.uid+"/databaseTester"}><Button style={{marginTop:'10px'}}>Database Tester</Button></NavLink>
            );
        }else{
            return null;
        }
    }

    createWireframe = () => {
        const { wireframeLists } = this.props;
        const id = this.props.auth.uid; //current account
        let list = {
            "key": 0,
            "name": "Unknown",
            "width":500,
            "height":500,
            "controls": []
        };
        wireframeLists.splice(0, 0, list);
        this.fixKey(wireframeLists);
        this.props.history.push({pathname: ""+id + "/"+list.key});
        getFirestore().collection('users').doc(id).update({
            wireframeLists: wireframeLists
        })
    }

    deleteWireframe = (key, event) => {
        event.stopPropagation();
        event.preventDefault();
        const { wireframeLists } = this.props;
        const id = this.props.auth.uid; //current account
        let list = wireframeLists.filter(wireframe => wireframe.key !== key);
        this.fixKey(list);
        getFirestore().collection('users').doc(id).update({
            wireframeLists: list
        })
    }

    fixKey = (wireframeLists) => {
        for(let i = 0; i < wireframeLists.length; i++){
            wireframeLists[i].key = i;
        }
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/Wireframer/login" />;
        }
        
        return (
            <div className="dashboard container">
                <Redirect to={"/Wireframer/"+this.props.auth.uid} />
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeListLinks delete={this.deleteWireframe} />
                    </div>
                    <div className="col s8">
                        <div className="banner">
                            Wireframer<sup style={{top:'-1em'}}>TM</sup><br /><br/>
                        </div>
                        <div className="home_new_list_container" style={{paddingTop:'5px'}}>
                                <Button className="home_new_list_button" waves="light" large style={{height:'120px',width:'100%'}} onClick={this.createWireframe}>
                                    Create a New Wireframe
                                </Button>
                        </div>
                        {this.administrator()}
                    </div>
                    
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