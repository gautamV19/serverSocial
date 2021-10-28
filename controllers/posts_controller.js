const POST = require('../models/post');
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
    try {
        console.log("token: ", req.header("Authorization"));
        const post = await POST.create({
            content: req.body.content,
        })

        return res.status(200).json({
            success: true,
            data: {
                post: post,
            },
            message: "Post created!",
        });
    } catch (err) {
        console.log("Error in creating post--->", err);
    }
}