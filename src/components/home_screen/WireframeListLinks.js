import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeListCard from './WireframeListCard';

class WireframeListLinks extends React.Component {
    render() {
        const wireframeLists = this.props.wireframeLists;
        console.log(wireframeLists);
        return (
            <div className="todo-lists section">
                {wireframeLists && wireframeLists.map(wireframeList => (
                    <Link to={'/todoList/' + wireframeList.id} key={wireframeList.id}>
                        <WireframeListCard wireframeList={wireframeList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframerLists: state.firebase.profile.wireframeLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeListLinks);