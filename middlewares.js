import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    // 접속된 유저 확인하기(세션 확인하기)
    // console.log(req.user);
    next();
}

export const uploadVideo = multerVideo.single("videoFile");