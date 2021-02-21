const Post = require('../models/post')
const { returnUser } = require('../jwt')
// const { addPostToUser, getIdByUser } = require('./user')
const { getIdByUser, addPostToUser, addPostToUserHistory } = require('../ourFunctions/workingFunctions')

const addPost = async (req, res) => {
    try {
        const token = req.params.token;
        const user = returnUser(token);
        if (user) {
            const userId = await getIdByUser(user);
            console.log(userId);
            const newPost = new Post({
                title: req.body.title, body: req.body.body, user: userId
            });
            const post = await newPost.save();
            addPostToUser(user, post._id)
            res.status(200).json({ message: "post created", post: post })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const watchPost = async (req, res) => {
    try {
        const token = req.params.token;
        console.log(token);
        const user = returnUser(token);
        console.log(user);
        if (user) {
            const userId = await getIdByUser(user);
            console.log(userId);
            let post
            const newPost = new Post({
                userId: req.body.userId, id: req.body.id, title: req.body.title, body: req.body.body, user: userId
            });
            // console.log(req.body.userId == '101')
            if (req.body.userId !== '101') {
                post = await newPost.save();
                console.log("post"+post);
            }
            else {
                post = req.body;
            }
            addPostToUserHistory(user, post._id)
            console.log("history");
            res.status(200).json({ message: "post watched", post: post })
        }
    }
    catch (err) {
        res.status(500).json({ error: err })
    }

}
const deletePost = async (postId) => {
    try {
        console.log('i came here');
        const post = await Post.findByIdAndDelete(postId);
        console.log(post);
    }
    catch (err) {
        console.log(err + "delete post");
    }
}

const updatePost = async (req, res) => {
    try {
        const token = req.params.token;
        const user = returnUser(token);
        if (user) {
            Post.findByIdAndUpdate(req.body._id, req.body, {
                returnOriginal: false
            }).then((post) => {
                // post.save().then(post => {
                Post.findById(post._id).then(post => res.status(200).json({ post: post })
                )
                // })
            }).catch(err => { console.log(err); })
        }
    }
    catch (err) {
        res.send(err);
    }


}

module.exports = { addPost, deletePost, updatePost, watchPost }