import { signout } from './api-auth.js'



const auth = {
    isAuthenticated() {
        if (typeof window == "undefined") return false;
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'));
        else return false;
    },
    authenticate(jwt, cb) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('jwt', JSON.stringify(jwt));
        cb();
    },
    clearJWT(cb) {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('jwt');
        cb();
        signout().then(() => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    },
    updateUser(user, cb) {
        if (typeof window !== "undefined") {
            if (sessionStorage.getItem('jwt')) {
                let auth = JSON.parse(sessionStorage.getItem('jwt'));
                auth.user = user;
                sessionStorage.setItem('jwt', JSON.stringify(auth));
                cb();
            }
        }
    },
    runLogoutTimer(timer) {
        setTimeout(() => {
            signout();
            alert('Vui lòng đăng nhập lại');
            this.clearJWT(() => window.location.reload());
        }, timer)
    }
}

export default auth;