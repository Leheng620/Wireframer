import React from 'react';
import { Modal, Button,Icon } from 'react-materialize';

class WireframeListCard extends React.Component {

    stop = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        const { wireframeList } = this.props;
        console.log("wireframeList, wireframeList.id: " + wireframeList.key);
        return (
            <div className="card z-depth-0 todo-list-link wireframe-card">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title" style={{width:'70%',overflowWrap:'break-word',display:'inline-block'}}>{wireframeList.name}</span>
                    <Modal 
                        actions={[
                        <Button className="red" modal="close" onClick={(e) => this.props.delete(wireframeList.key, e)} style={{marginRight:'10px',width:'100px'}}>Confirm</Button>,
                        <Button modal="close" onClick={this.stop} style={{width:'100px'}} >cancel</Button>]}
                        trigger={<Button floating small className="right wireframe-delete-button" node="button" onClick={this.stop} icon={<Icon style={{fontFamily:'none'}}>&#9747;</Icon>}></Button>}
                        header="Delete wireframe?"
                    >
                        <strong style={{fontSize:"X-large"}}>Are you sure you want to delete the wireframe?</strong>
                        <br/>
                        <strong style={{fontSize:"x-large",fontWeight:'bolder'}}>Deletion cannot be undone.</strong>
                    </Modal>
                </div>
                
            </div>
        );
    }
}
export default WireframeListCard;