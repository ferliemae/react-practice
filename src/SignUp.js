import React from 'react';
import firebase from 'firebase';

const auth = firebase.auth();
const ref = firebase.database().ref('users');

class SignUp extends React.Component {
    state = ({
        email: '',
        password: '',
        auth: {}
    })

    userLogin = () => {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(user){ 
                console.log(user);
            })
            .catch(function(error) {
                alert(error.message);
            })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(this.state[name])
        this.setState({
            [name]: value
          });
    }
    render(){
        return(
            <div>
                <input onChange={this.handleInputChange} type="email" placeholder="Email address" name="email"/>
                <input onChange={this.handleInputChange} type="text" placeholder="Password" name="password"/>
                <button onClick={this.userLogin} >Sign up</button>
            </div>
        )
    }
}

export default SignUp;