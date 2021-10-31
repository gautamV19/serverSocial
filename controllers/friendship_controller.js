const User = require("../models/user");
const Friendship = require("../models/friendshipTogel");

module.exports.addFriend = async function (req, res) {

    try {

        const friendId = req.query.user_id;

        const user = await User.findById(req.user.id);
        const hisFriend = await User.findById(friendId);

        //creating new friendship

        const newFriendship = await Friendship.create({
            from_user: user,
            to_user: hisFriend,
        });

        await newFriendship.populate("from_user to_user", "name id email");
        user.friendship.push(newFriendship);
        user.save();

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

module.exports.removeFriend = async function (req, res) {
    try {
        const hisId = req.query.user_id;
        const user = await User.findById(hisId);

        const reqFriendship = await Friendship.find({
            from_user: req.user,
            to_user: user,
        });
        reqFriendship.remove();
        req.user.friendship.pull(hisId);

        return res.status(200).json({
            message: "Friends removed",
            success: true,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}