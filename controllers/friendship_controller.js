const User = require("../models/user");
const Friendship = require("../models/friendshipTogel");

module.exports.addFriend = async function (req, res) {

    try {
        const toUser = await User.findById(req.query.user_id);
        const fromUser = req.user;

        const newFriendship = await Friendship.create({
            from_user: fromUser,
            to_user: toUser,
        })

        fromUser.friendship.push(newFriendship);
        fromUser.save();

        return res.status(200).json({
            "message": "Now you're friends with Aakash",
            "success": true,
            data: { "friendship": newFriendship }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}