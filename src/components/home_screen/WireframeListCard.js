import React from 'react';
import { Modal, Button } from 'react-materialize';

class WireframeListCard extends React.Component {

    stop = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        const { wireframeList } = this.props;
        console.log("wireframeList, wireframeList.id: " + wireframeList.key);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframeList.name}</span>
                </div>
                <Modal 
                    actions={[
                    <Button className="red" modal="close" onClick={(e) => this.props.delete(wireframeList.key, e)} style={{marginRight:'10px'}}>Confirm</Button>,
                    <Button modal="close" onClick={this.stop}>cancel</Button>]}
                    trigger={<Button node="button" onClick={this.stop}>Delete</Button>}
                    header="Delete wireframe?"
                >
                    <strong style={{fontSize:"X-large"}}>Are you sure you want to delete the wireframe?</strong>
                    <br/>
                    <strong style={{fontSize:"x-large",fontWeight:'bolder'}}>Deletion cannot be undone.</strong>
                </Modal>
            </div>
        );
    }
}
export default WireframeListCard;