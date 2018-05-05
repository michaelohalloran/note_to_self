import React from 'react';
import '../index.css';
class Note extends React.Component {
    render() {
        return(
            <div className="note">
                <p>{this.props.note}</p>
            </div>
        );
    }
}
export default Note;