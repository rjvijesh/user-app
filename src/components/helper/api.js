import axios from 'axios';
import qs from 'qs';
import config from '../config.json';
import history from '../prevHistory';
export function getapidata(apiUrl, userDetails) {
    var headers = {};
    if (localStorage.getItem('userDetails')) {
        var encodedUserDetails = localStorage.getItem('userDetails');
        var decodedUserDetails = atob(encodedUserDetails);
        var parseDecodedUserDetails = JSON.parse(decodedUserDetails);
        var usertoken = parseDecodedUserDetails.usertoken;

        if (usertoken !== '') {
            if (!/login/.test(apiUrl) && !/register/.test(apiUrl)) {
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${usertoken}`
                };
            }
        }
    }
    var apiDomain = config.apiDomain;
    var finalApiUrl = apiDomain + apiUrl;
    var method = 'get';
    var data = {};
    if (/login/.test(apiUrl) || /register/.test(apiUrl)) {
        method = 'post';
        if (/login/.test(apiUrl)) {
            if (userDetails) {
                var username = userDetails['username'];
                var password = userDetails['password'];
                data = qs.stringify({ username: username, password: password });
            }
        }
        if (/register/.test(apiUrl)) {
            if (userDetails) {
                data = qs.stringify(userDetails);
            }
        }
    }
    return axios({
        method: method,
        url: finalApiUrl,
        data: data,
        headers: headers
    })
        .then(response => {
            if (response != undefined && response != '') {
                if (response.data && response.data.status !== undefined && response.data.status === 101) {
                    alert("authorization failed");
                    history.push("/login");
                }
                return response;
            }
        })
        .catch(err => {
            console.log(err);
        })
}