export default function authHeader() {
    const JwtToken = localStorage.getItem('JwtToken');

    if (JwtToken) {
        return { Authorization: 'Bearer ' + JwtToken };
    } else {
        return {};
    }
}