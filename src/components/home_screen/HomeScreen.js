import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeListLinks from './WireframeListLinks';
import {Button} from 'react-materialize';

class HomeScreen extends Component {

    createWireframeList = () => {
        
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

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(HomeScreen);