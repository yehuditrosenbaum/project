const { returnToken, returnUser } = require('../jwt');
const User = require('../models/user');
const { deletePost } = require('./post');

const firebase = require("firebase-admin");

const credentials = require("../firebase/posts-project-84627-firebase-adminsdk-6hek4-dcfc61bc6e.json");

firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    databaseURL: "https://posts-project-84627.firebaseapp.com",
});


const getAll = async (req, res) => {
    const c = await User.find();
    res.send(c);
}

const createUser = async (req, res) => {

    try {
        // const decodedToken = await firebase.auth().verifyIdToken(req.params.token);
        // console.log(decodedToken);
        const newUser = new User(req.body);
        await newUser.save()
        res.status(200).json({ message: "user created", newUser: newUser })
    }
    catch (err) {
        res.status(500).json({ error: err + "hvgh" })
    }
}


const getUser = async (req, res) => {
    try {
        const decodedToken = await firebase.auth().verifyIdToken(req.params.token);
        // console.log(decodedToken);
        // console.log('get user');
        // console.log(req.params);
        const x = {
            email: req.params.email,
            password: req.params.password
        }
        await User.findOne(x).then(
            data => {
                console.log(data)
                if (data) {
                    const token = returnToken(x);
                    console.log(token);
                    res.status(200).json({ message: "user found", token: token })
                }
                else {
                    console.log('not found');
                    res.send('user not found')
                }
            },
            err => {
                console.log(err);
            }
        );
    }
    catch (err) {
        res.status(500).json({ error: err, message: " error finding user" })
    }
}
// is it right to do this in controller?
async function getIdByUser(user) {
    console.log('kdgvwduivtgw,ufvgw,ufvgw,jfgvw,jfgvhdgvkwgjdfv');
    // console.log("hereeeeee");
    const u = await User.findOne(user);
    return u._id;
}

async function addPostToUser(user, postId) {
    const currentUser = await User.findOne(user);
    await currentUser.posts.push(postId);
    await currentUser.save();
    //
    console.log(currentUser.posts);
}
// async function addPostToUserHistory(user, postId) {
//     const currentUser = await User.findOne(user);
//     await currentUser.historyPosts.push(postId);
//     await currentUser.save();
//     //
//     console.log(currentUser.posts);
// }


const getUserPosts = async (req, res) => {
    try {
        const token = req.params.token;
        const user = returnUser(token);
        if (user) {
            const u = await User.findOne(user);
            const us = await u.populate('posts').execPopulate();
            res.send(us.posts)
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const getHistoryPosts = async (req, res) => {
    try {
        const token = req.params.token;
        const user = returnUser(token);
        if (user) {
            const u = await User.findOne(user);
            const us = await u.populate('historyPosts').execPopulate();
            res.send(us.historyPosts)
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const deleteMyPost = async (req, res) => {
    try {
        const token = req.params.token;
        const user = returnUser(token);
        if (user) {
            const u = await User.findOne(user);
            await u.posts.pull({ '_id': req.params.postId })
            console.log(u)
            await u.save();
            console.log("saved!!!!!!" + u)
            await deletePost(req.params.postId)
            console.log(u + "saved!");
            res.send(req.params.postId)
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

// const getIdByUser = async (user) => {
//     const u = await User.findOne(user)
//     console.log(u)
//     return u._id;
// }

// const addPostToUser = async (user, postId) => {
//     const currentUser = await User.findOne(user);
//     await currentUser.posts.push(postId);
//     await currentUser.save();
//     //
//     console.log(currentUser.posts);
// }

module.exports = { createUser, getUser, getUserPosts, deleteMyPost, addPostToUser, getIdByUser, getHistoryPosts,getAll }