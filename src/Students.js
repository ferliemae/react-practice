import React from 'react';
import Student from './Student';
import fire from './fire';

const ref = fire.database().ref('users');
class Students extends React.Component {
    
    state = ({
        student_list: [],
        firstName: 'Ferlie',
        lastName: 'Penido',
        studentNo: 0
      });

    componentDidMount() {
      ref.on("child_added", snap => {
        let student = {
          firstName: snap.val().firstName,
          lastName: snap.val().lastName,
          studentNo: snap.val().studentNo,
          id: snap.key()
        };
        this.setState({
          student_list: [...this.student_list, student ]
        })
      });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }

    handleSubmit = (event) => {
        const student = {firstName: this.state.firstName, studentNo: this.state.studentNo, lastName: ''};
        event.preventDefault();
        console.log(student);
        ref.push().set(student)
    }
    render() {
      return (
        <div className="App">
        {/* <form onSubmit={this.handleSubmit}> */}
        <input name = "firstName" onChange={this.handleInputChange} placeholder="Enter student name" />
        <input name="studentNo" type="number" onChange={this.handleInputChange}/>
        {this.state.student_list.map(student => <Student name={student.firstName} student_no={student.studentNo} />)}
        <button onClick={this.handleSubmit}>Submit </button> 
        {/* </form> */}
        </div>
      );
    }
  }
  
  export default Students;