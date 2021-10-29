const COMMENT = require("../models/comment");
const POST = require("../models/post")

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

}