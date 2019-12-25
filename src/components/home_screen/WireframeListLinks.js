import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeListCard from './WireframeListCard';
import { getFirestore } from 'redux-firestore';


class WireframeListLinks extends React.Component {

    moveToTop(wireframe){
        let id = this.props.auth.uid;
        let list = this.props.wireframeLists.filter(frame => frame.key !== wireframe.key);
        list.unshift(wireframe);
        getFirestore().collection('users').doc(id).update({
            wireframeLists: list
        })
    }

    render() {
        const wireframeLists = this.props.wireframeLists;
        const id = this.props.auth.uid;
        console.log(wireframeLists);
        return (
            <div className="todo-lists section">
                {wireframeLists && wireframeLists.map(wireframeList => (
                    <Link onClick={()=>this.moveToTop(wireframeList)} to={'/Wireframer/'+id+'/'+wireframeList.key} key={wireframeList.key}>
                        <WireframeListCard wireframeList={wireframeList} delete={this.props.delete} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframeLists: state.firebase.profile.wireframeLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeListLinks);