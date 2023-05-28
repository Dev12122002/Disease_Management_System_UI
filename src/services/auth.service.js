import axios from "axios";

const API_URL = "/api/Auth/Login";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL , {
                "email": email,
                "password": password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("JwtToken", response.data);
                }

                return response.data;
            })
            // .catch((error) => {
            //     console.log(error.response.data);
            //     toast.error(error.response.data)
            //     return error;
            // });
    }

    logout() {
        localStorage.removeItem("JwtToken");
    }

    getCurrentUserJWT() {
        return localStorage.getItem('JwtToken');
    }

    // checkLoggedIn = (stateChange) => {
    //     if (localStorage.getItem('JwtToken')){
    //         stateChange(true)
    //         return true;
    //     }
    //     else
    //         return false;
    // }

    checkLoggedIn() {
        if (localStorage.getItem('JwtToken')) 
            return true;
        else
            return false;
    }
}

export default new AuthService();