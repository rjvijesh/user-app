import React, { Component } from 'react';
import { userservice } from './services/userservice';
import history from '../components/prevHistory';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: ''
        }
        this.userLogout = this.userLogout.bind(this);
    }

    userLogout(evt) {
        if (localStorage.getItem('userDetails')) {
            var encodedUserDetails = localStorage.getItem('userDetails');
            var decodedUserDetails = atob(encodedUserDetails);
            var parseDecodedUserDetails = JSON.parse(decodedUserDetails);
            var userId = parseDecodedUserDetails.id;
            userservice.logout(userId)
                .then(result => {
                    if (result.data.status === 1) {
                        history.push('/login');
                    }
                })
        }
    }
    componentDidMount() {
        if (localStorage.getItem('userDetails')) {
            var encodedUserDetails = localStorage.getItem('userDetails');
            var decodedUserDetails = atob(encodedUserDetails);
            var parseDecodedUserDetails = JSON.parse(decodedUserDetails);
            var userId = parseDecodedUserDetails.id;
            userservice.userprofile(userId)
                .then(result => {
                    if (result !== undefined && result.data && result.data[0]) {
                        this.setState({ email: result.data[0].email, username: result.data[0].username, firstname: result.data[0].firstname, lastname: result.data[0].lastname });
                    }
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>User Details</h1>
                <table id="details">
                    <tr>
                        <td>Firstname : </td>
                        <td>{this.state.firstname}</td>
                    </tr>
                    <tr>
                        <td>Lastname : </td>
                        <td>{this.state.lastname}</td>
                    </tr>
                    <tr>
                        <td>Username : </td>
                        <td>{this.state.username}</td>
                    </tr>
                    <tr>
                        <td>Email : </td>
                        <td>{this.state.email}</td>
                    </tr>
                </table>
                <button className="logoutbtn" onClick={this.userLogout}>Logout</button>
            </React.Fragment >
        )
    }
}

export default Profile;