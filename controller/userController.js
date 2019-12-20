import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = (req, res) => {
    const { 
        body: {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else {
        // 할일 : 유저 회원가입 처리하기
        // 할일 : 사용자 로그인
        res.redirect(routes.home)
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login"});
}

export const postLogin = (req, res) => {
    const {
        body: {email, password}
    } = req;

    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // 할일 : Process Log out
    res.redirect(routes.home);
}

export const users = (req, res) => res.render("users", { pageTitle: "Users"});
export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});

