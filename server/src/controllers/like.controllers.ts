import * as likeService from "../services/like.services";

//User like movie
export const likeMovie = async(req: any, res:any) => {
    const userid = req.user?.userid;
    const movieid = Number(req.params.movieid);
    const like = await likeService.likeMovie(userid, movieid);
    if(!like) return res.status(400).json({message: "Movie already liked"});
    res.status(201).json({message: "Movie Liked"});
};

//Deleted Liked
export const unlikeMovie = async(req:any, res:any) => {
    const userid = req.user.userid;
    const movieid = Number(req.params.movieId);
    await likeService.removeLiked(userid, movieid);
    res.json({message: "Like Removed"});
};