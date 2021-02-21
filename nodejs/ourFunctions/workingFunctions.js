const User = require('../models/user');

const getIdByUser = async (user) => {
    const u = await User.findOne(user)
    console.log(u)
    return u._id;
}

const addPostToUser = async (user, postId) => {
    const currentUser = await User.findOne(user);
    await currentUser.posts.push(postId);
    await currentUser.save();
    //
    console.log(currentUser.posts);
}
const addPostToUserHistory = async (user, postId) => {
    const currentUser = await User.findOne(user);
    await currentUser.historyPosts.push(postId);
    await currentUser.save();
    console.log(currentUser.historyPosts);
}
module.exports = { getIdByUser, addPostToUser, addPostToUserHistory };