const COMMENT = require("../models/comment");
const POST = require("../models/post")
const Like = require("../models/like")

module.exports.create = async function (req, res) {
    try {
        // console.log(req.body);

        // post_id
        // content
        // req.user
        const { post_id, content } = req.body;
        // console.log(req.body);

        let post = await POST.findById(post_id);

        // console.log("commenting on post", post);

        let comment = await COMMENT.create({
            content: content,
            user: req.user._id,
            post: post_id,
        })

        // await POST.findByIdAndDelete(post_id, {
        //     $push: {
        //         comments: comment
        //     }
        // })
        comment = await comment.populate("user", "name email");

        post.comments.push(comment);
        await post.save();


        res.status(200).json({
            message: "Your comment is published",
            success: true,
            data: {
                comment: comment,
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

module.exports.list = async function (req, res) {
    try {
        const postId = req.query.post_id;
        console.log("showing commensts for post", postId);

        let postComments = await POST.findById(postId).populate("comments");

        console.log("Comments for post", postComments);

        return res.status(200).json({
            "message": "List of comments on post_id 5e518d8bcf801b96af039bbe",
            "success": true,
            "data": {
                comments: postComments
            }
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        })
    }

}