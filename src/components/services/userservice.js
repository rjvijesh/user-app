import { getapidata } from '../helper/api';
export const userservice = {
    login,
    userprofile,
    logout,
    register
}

function login(username, password) {
    if (localStorage.getItem('userDetails')) {
        localStorage.removeItem('userDetails');
    }
    if (username !== '' && password !== '') {
        var apiUrl = 'login';
        var userDetails = [];
        userDetails['username'] = username;
        userDetails['password'] = password;
        var a = getapidata(apiUrl, userDetails);
        return a.then(function (result) {
            if (result !== undefined && result.data !== undefined && result.data.status !== undefined && result.data.status === 1) {
                if (result.data && result.data !== '') {
                    var userDetails = { id: result.data.data[0]._id, email: result.data.data[0].email, username: result.data.data[0].username, usertoken: result.data.token };
                    var jsonUserDetails = JSON.stringify(userDetails);
                    localStorage.setItem('userDetails', btoa(jsonUserDetails));
                }
            }
            return result;
        });
    }
}

function userprofile(userId) {
    if (userId !== '') {
        var apiUrl = 'userprofile/' + userId;
        var a = getapidata(apiUrl);
        return a.then(function (result) {
            return result;
        });
    }
}

function logout(userId) {
    if (userId !== '') {
        var apiUrl = 'logout/' + userId;
        var a = getapidata(apiUrl);
        return a.then(function (result) {
            if (result.data.status === 1) {
                if (localStorage.getItem('userDetails')) {
                    localStorage.removeItem('userDetails');
                }
            }
            return result;
        });
    }
}

function register(userDetails) {
    if (userDetails !== '') {
        var apiUrl = 'register';
        var a = getapidata(apiUrl, userDetails);
        return a.then(function (result) {
            return result;
        });
    }
}