import React from 'react';
import firebase from 'firebase';

const auth = firebase.auth();

class LogIn extends React.Component {
    state = ({
        email: '',
        password: '',
        auth: {}
    })


    userLogin = () => {
        console.log(this.state.email);
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(authdata){ 
                console.log("logged ins")
            })
            .catch(function(error) {
                console.log(error.message);
            })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }
    render(){
        return(
            <div>
                <input onChange={this.handleInputChange} type="email" placeholder="Email address" name="email"/>
                <input onChange={this.handleInputChange} type="password" placeholder="Password" name="password"/>
                <button onClick={this.userLogin} >Log in</button>
            </div>
        )
    }
}

export default LogIn;