import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeListCard from './WireframeListCard';

class WireframeListLinks extends React.Component {
    render() {
        const wireframeLists = this.props.wireframeLists;
        const id = this.props.auth.uid;
        console.log(wireframeLists);
        return (
            <div className="todo-lists section">
                {wireframeLists && wireframeLists.map(wireframeList => (
                    <Link to={'/wireframe/'+id+'/'+wireframeList.key} key={wireframeList.key}>
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