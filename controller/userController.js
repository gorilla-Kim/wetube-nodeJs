import passport from "passport";
import routes from "../routes";
import User from "../models/User"

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = async (req, res, next) => {
    const { 
        body: {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else {
        // 유저 회원가입 처리하기
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        }catch(error) {
            console.log(`❌  Error occure! | Controller Join | ${error}`);
            res.redirect(routes.home)
        }
        // 할일 : 사용자 로그인
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login"});
}

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async(accessToken, refreshToken, profile, cb) => {
    const { 
        _json:{ id, avatar_url, name, email }
    } = profile;
    try {
        const user = await User.findOne({email});
        console.log(`⭕  Find user !! ${user}`);
        if(user){
            user.githubId = id;
            if(!user.avatarUrl){
                user.avatarUrl = avatar_url;
            }
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name,
            email,
            githubId: id,
            avatarUrl: avatar_url
        })
        return cb(null, newUser);
        
    } catch (error) {
        console.log(`❌  Error occure | githubLoginCallback | ${error}`);
        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // 할일 : Process Log out
    req.logout();
    res.redirect(routes.home);
}

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user : req.user});
}
export const users = (req, res) => res.render("users", { pageTitle: "Users"});
export const userDetail = async(req, res) => {
    const { params: {id} } = req;
    try {
        const user = await User.findById(id).populate("videos");
        console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user});
    } catch (error) {
        console.log(`❌  Error occure | 잘못된접근입니다. | ${error} `);
        res.redirect(routes.home);
    }
}
export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile"});
export const postEditProfile = async(req, res) => {
    const {
        body: {name, email},
        file
    } = req;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            email,
            name,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    } catch (error) {
        console.log(`❌  Error occure | postEditProfile | ${error} `);
        res.redirect(routes.editProfile);
    }
}
export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password"});
export const postChangePassword = async(req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if( newPassword !== newPassword1) {
            console.log(`❌  Error occure | postChangePassword | new password is not equal `);
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        console.log(`❌  Error occure | postChangePassword | ${error} `);
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
}

