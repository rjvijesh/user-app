import React, { Component } from 'react';
import { userservice } from './services/userservice';
import history from '../components/prevHistory';

class Parent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signup: false,
            login: true
        }
        this.switchForm = this.switchForm.bind(this);
        this.changeFormState = this.changeFormState.bind(this);
    }
    switchForm(event) {
        event.preventDefault();
        var signup, login;
        var flag = event.target.attributes.getNamedItem('formFlag').value;
        if (flag == "signup") {
            signup = true;
            login = false;
        } else {
            login = true;
            signup = false;
        }
        return this.setState({ login: login, signup: signup })
    }
    changeFormState(formParam) {
        if (formParam !== undefined && formParam === 'login') {
            this.setState({ login: true, signup: false });
        }
    }

    render() {
        return (
            <div>
                <div id="buttons">
                    <p id="signupButton" formflag="signup" onClick={this.switchForm} className={this.state.signup ? "signupactive signupbtn" : "signupbtn"}>Sign Up</p>
                    <p id="loginButton" formflag="login" onClick={this.switchForm} className={this.state.login ? "loginactive loginbtn" : "loginbtn"}> Login</p>
                </div>

                {this.state.signup ? <Signup changeFormState={this.changeFormState} /> : null}
                {this.state.login ? <Login /> : null}
            </div>
        )
    }
}

class Signup extends Component {
    constructor(props) {
        super(props)
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    handlesubmit(e) {
        e.preventDefault();
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmpassword = document.getElementById("confirmpassword").value;
        if (firstname == '') {
            alert("Firstname cannot be blank");
            return false;
        } else if (email == '') {
            alert("Email cannot be blank");
            return false;
        } else if (username == '') {
            alert("Username cannot be blank");
            return false;
        } else if (password == '') {
            alert("Password cannot be blank");
            return false;
        } else if (confirmpassword == '') {
            alert("Confirm Password cannot be blank");
            return false;
        } else if (password !== confirmpassword) {
            alert("Password and Confirm Password Mismatch");
            return false;
        } else {
            var userDetails = [];
            userDetails['firstname'] = firstname;
            userDetails['lastname'] = lastname;
            userDetails['email'] = email;
            userDetails['username'] = username;
            userDetails['password'] = password;
            userDetails['confirmpassword'] = confirmpassword;
            console.log("userDetails", userDetails);
            userservice.register(userDetails)
                .then(result => {
                    if (result !== undefined && result.data !== undefined && result.data.status !== undefined && result.data.status === 1) {
                        alert(result.data.msg);
                        alert("Kindly login to continue")
                        this.props.changeFormState("login");
                    } else if (result !== undefined && result.data !== undefined && result.data.status !== undefined) {
                        alert(result.data.msg);
                        return false;
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handlesubmit} >
                    <div id="signup" class="container">
                        <input type="text" id="firstname" placeholder="First Name" />
                        <input type="text" id="lastname" placeholder="Last Name" />
                        <input type="email" id="email" placeholder="Email" />
                        <input type="text" id="username" placeholder="Username" />
                        <input type="password" id="password" placeholder="Password" />
                        <input type="password" id="confirmpassword" placeholder="Confirm Password" />
                        <button id="send">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    handlesubmit(e) {
        e.preventDefault();
        const uname = document.getElementById("uname").value;
        const password = document.getElementById("password").value;
        if (uname == '' && password == '') {
            alert("Username and Password cannot be blank");
            return false;
        } else if (uname == '') {
            alert("Username cannot be blank");
            return false;
        } else if (password == '') {
            alert("Password cannot be blank");
            return false;
        } else {
            userservice.login(uname, password)
                .then(result => {
                    if (result !== undefined && result.data !== undefined && result.data.status !== undefined && result.data.status === 1) {
                        history.push('/userprofile');
                        alert(result.data.msg);
                    } else if (result !== undefined && result.data !== undefined && result.data.status !== undefined) {
                        alert(result.data.msg);
                        return false;
                    }
                })
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handlesubmit} >
                    <div id="login" class="container">
                        <input type="text" id="uname" placeholder="Username" />
                        <input type="password" id="password" placeholder="Password" />
                        <button id="send">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Parent;