import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Student from './Student';
import fire from './fire';


const ref = fire.database().ref('users');
const auth = fire.auth();

class Main extends React.Component{
    state = ({
        student_list: [],
        firstName: 'Ferlie',
        lastName: 'Penido',
        studentNo: 0,
        logged: false
      });
    componentDidMount() {
        var students = [];
        ref.on("child_added", snap => {
          let student = {
            firstName: snap.val().firstName,
            lastName: snap.val().lastName,
            studentNo: snap.val().studentNo,
            id: snap.key
          };
          students = [...students, student];
          this.setState({
            student_list: students
            })

          console.log(this.state.student_list); 
        });
        

        ref.on("child_removed", snap => {
            var myArray = this.state.student_list.filter(function( obj ) {
                return obj.id !== snap.key;
              })
            console.log(myArray);
            this.setState({
                student_list: myArray
            });
          }
        );
      }

    deleteStudent = (event) => {
        let key = event.target.value;
        return ref.child(key).remove().then((()=> {
              console.log("delete succeed");
        }));
        
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }

    logOut = () => {
        auth.signOut();
    }
    handleSubmit = (event) => {
        const student = {firstName: this.state.firstName, studentNo: this.state.studentNo, lastName: this.state.lastName};
        event.preventDefault();
        ref.push().set(student)
    }
    render() {
        return (
              <main>
                  {/* <Switch> */}
                      <Route exact path="/" component={Home} />
                      <Route path="/students" component={this.Students} />
                  {/* </Switch> */}
              </main>
        );
    }

    Students = () => (
        <div className="App">
            <input name = "firstName" onChange={this.handleInputChange} placeholder="Enter first name" />
            <input name = "lastName" onChange={this.handleInputChange} placeholder="Enter last name" />
            <input name="studentNo" placeholder="Enter student no" type="number" onChange={this.handleInputChange}/>
            {this.state.student_list.map(student => <Student name={student.firstName} onClick={this.deleteStudent} student_no={student.studentNo} last={student.lastName} id={student.id}/>)}
            <button value = {"gege"} onClick={this.handleSubmit}>Submit </button>
            <button onClick={this.logOut} >Log out </button> 
        </div>
    )
}
export default Main;