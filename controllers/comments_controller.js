const COMMENT = require("../models/comment");
const POST = require("../models/post")
const Likes = require("../models/like")

module.exports.create = async function (req, res) {
    try {
        // console.log(req.body);

        // post_id
        // content
        // req.user
        const { post_id, content } = req.body;

        let post = await POST.findOne({ id: post_id });

        let comment = await COMMENT.create({
            content: content,
            user: req.user._id,
            post: post_id,
        })


        post.comments.push(comment);
        await post.save();

        // comment = await comment.populate("user", "name email").execPopulate();

        res.status(200).json({
            message: "Your comment is published",
            success: true,
            data: {
                comment
            }
        });
    } catch (err) {
        console.log("Error in comment create", err);
    }
}

module.exports.destroy = async function (req, res) {

    try {
        const commentId = req.query.comment_id;
        await Like.deleteMany({ onModel: "Comment", likeable: req.params.id });

        // console.log("commentId: ", commentId, "user ", req.user);

        let comment = await COMMENT.findById(commentId);


        if (comment.user == req.user.id) {
            let postId = comment.post;

            await POST.findByIdAndUpdate(postId, {
                $pull: {
                    comments: commentId,
                },
            });

            await comment.remove();

            return res.status(200).json({
                message: "Comment deleted successfully", success: true
            })
        }
        else {
            return res.status(400).json({
                message: "Unauthorized"
            })
        }
    } catch (err) {
        console.log("Error in removing comment from post", err);
        return res.json(500, {
            message: "Internal server error",
        });
    }
}