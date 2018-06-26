import React from 'react';

export class Student extends React.Component {
    render() {
        return (
        <div>
            {this.props.student_no} {this.props.name} {this.props.last}
            <button value={this.props.id} onClick={this.props.onClick}>Delete</button>
        </div>
        );
    }
}

export default Student;