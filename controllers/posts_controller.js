const POST = require('../models/post');
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
    try {
        const post = await POST.create({
            content: req.body.content,
            user: req.user,
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

module.exports.showPosts = async function (req, res) {
    try {
        const page = req.query.page;
        const limit = req.query.limit;

        let posts = await POST.find({}).populate("user");

        let len = posts.length;

        if (len > limit * page) {
            posts.splice(0, limit * (page - 1));
        }

        return res.status(200).json({
            "message": "List of posts", "success": true,
            "data": {
                "next": {
                    "page": 2,
                    "limit": 5
                },
                "posts": posts
            }
        })

    } catch (err) {
        console.log("Error in showPosts--->", err);
    }
}