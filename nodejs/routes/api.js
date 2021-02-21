const router = require('express').Router()
const user = require('../controllers/user');
const post = require('../controllers/post');
router.post('/signup/:token', user.createUser)
router.get('/login/:email/:password/:token', user.getUser)
router.post('/addPost/:token', post.addPost)
router.get('/getMyPosts/:token', user.getUserPosts);
router.delete('/deletePost/:token/:postId',user.deleteMyPost)
router.put('/updatePost/:token',post.updatePost);
router.post('/watchPost/:token',post.watchPost);
router.get('/getHistoryPosts/:token',user.getHistoryPosts);
router.get('/getAll',user.getAll);


// router.get('/getAllUsers', user.getAll)
// router.get('/getUser/:id', user.getUserById)

// router.post('/newUser', user.saveUser);
// router.post('/newTask', task.newTask);

// router.patch('/updateUser/:id', user.updateUser)
// router.delete('/deleteUser/:id', user.deleteUser)

// router.delete('/deleteByName', user.deleteByName)
// router.delete('/deleteByNameSend/:name', user.deleteByNameSend)

module.exports = router;