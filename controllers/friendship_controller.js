const User = require("../models/user");
const Friendship = require("../models/friendshipTogel");

module.exports.addFriend = async function (req, res) {

    try {
        const toUser = await User.findById(req.query.user_id);
        const fromUser = req.user;
        // console.log("fromUser: " + fromUser, "toUser: " + toUser);

        const newFriendship = await Friendship.create({
            from_user: fromUser,
            to_user: toUser,
        })

        await fromUser.friendship.push(newFriendship);
        await fromUser.save();

        return res.status(200).json({
            "message": `Now you're friends with ${toUser.name}`,
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

module.exports.fetch_user_friends = async function (req, res) {
    // const friendship = User.findById(req.user._id).populate("friendship");
    const allFriends = await Friendship.find({ from_user: req.user });

    return res.status(200).json({
        "message": "List of friends for user id 5e33fc7c9cd14572518c16fa",
        "success": true,
        data: { "friends": allFriends },
    })

}