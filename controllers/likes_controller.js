//likes/toggle?likeable_id=<post/comment id>&likeable_type=<Post or Comment>
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.toggle = async function (req, res) {


    const { likeable_id, likeable_type } = req.query;

    let likeable;
    let deleted;
    if (likeable_type == "Post") {
        likeable = await Post.findById(likeable_id).populate("likes");
    } else if (likeable_type == "Comment") {
        likeable = await Comment.findById(likeable_id).populate("likes");
    } else {
        res.json({ message: "Invalid type" });
    }

    const existingLike = await Like.findOne({
        user: req.user,
        likeable: likeable_id,
        onModel: likeable_type
    })

    if (existingLike) {
        // deleting the like
        likeable.likes.pull(existingLike._id);
        likeable.save();

        existingLike.remove();
        deleted = true;

        return res.status(200).json({
            "message": "Request successful!",
            "success": true,
            "data": {
                "deleted": true
            }
        });
    }
    else {
        // create a new like

        let like = await Like.create({
            user: req.user,
            likeable: likeable_id,
            onModel: likeable_type
        })

        likeable.likes.push(like._id);
        likeable.save();

        return res.status(200).json({
            "message": "Request successful!",
            "success": true,
            "data": {
                "deleted": false
            }
        })
    }
}