import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        // 장고의 Object.all() 과 같음
        const videos = await Video.find({}).sort({_id: -1});
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home" });
    }
}
export const search = async (req, res) =>{ 
    const { 
        query: { term: searchingBy } 
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" }
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos});

}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
}
export const postUpload = async (req, res) => {
    const {
        body: {title, description},
        file: {path}
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    console.log(newVideo);
    // 할일 : video 업로드 및 저장
    res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async (req, res) => {
    const {params: {id}} = req;
    try {
        // 특정 테이블에서 특정 ID 속성(Attribute)값을 가진 데이터를 불러옵니다.
        const video = await Video.findById(id).populate("creator");
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(`❌  Error Occur | Video Details | ${error}`);
        res.redirect(routes.home);
    }
}
export const getEditVideo = async (req, res) => {
    const {params: {id}} = req;
    try {
        // 특정 테이블에서 특정 ID 속성(Attribute)값을 가진 데이터를 불러옵니다.
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: "Edit Video", video});
        }
    } catch (error) {
        console.log(`❌  Error Occur | Edit Video | ${error}`);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: {id},
        body: {title, description}
    } = req;
    try {
        // 특정 테이블에서 특정 ID 속성(Attribute)값을 가진 데이터를 불러옵니다.
        await Video.findOneAndUpdate({ _id: id }, { title, description })
        res.redirect(routes.videoDetail(id))
    } catch (error) {
        console.log(`❌  Error Occur | Edit Video | ${error}`);
        res.redirect(routes.home);
    }
}
export const deleteVideo = async (req, res) => {
    const {
        params : {id}
    } = req;
    try {
        // 특정 테이블에서 특정 ID 속성(Attribute)값을 가진 데이터를 불러온뒤 삭제합니다.
        const video = await Video.findById(id);
        if(video.creator !== req.user.id){
            throw Error();
        } else {
            await Video.findOneAndRemove({_id: id});
        }
    } catch (error) {
        console.log(`❌  Error Occur | Delete Video | ${error}`);
    }
    res.redirect(routes.home);
}