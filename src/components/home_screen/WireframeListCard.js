import React from 'react';

class WireframeListCard extends React.Component {

    render() {
        const { wireframeList } = this.props;
        console.log("wireframeList, wireframeList.id: " + wireframeList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframeList.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframeListCard;