import multer from "multer";
import routes from "./routes";
 
const multerVideo = multer({ dest: "uploads/videos/" });

const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    // 접속된 유저 확인하기(세션 확인하기)
    // console.log(req.user);
    next();
}

export const onlyPublic = (req, res, next) => {
    if(req.user){
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");