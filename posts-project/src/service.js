import axios from 'axios';
import fire from './fire'


export function signup(user) {
    console.log(user);
    const promise = new Promise((resolve, rejects) => {
        fire.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(
                async (data) => {
                    console.log("here");
                    const u = fire.auth().currentUser;
                    console.log(u);
                    const token = u && (await u.getIdToken());
                    console.log(data);
                    console.log(token);
                    //
                    axios.post('http://localhost:4000/signup/token', user)
                        .then(
                            res => {
                                console.log("signup");
                                console.log(res.data);
                                resolve(true);
                            },
                            err => {
                                console.log("error signup")
                                console.log(err)
                                rejects(false)
                            }
                        );
                }
            ).catch((error) => {
                console.error('Incorrect username or password');
                rejects(false)
            });
    });
    return promise;
}

// const createToken = async () => {
//     const user = fire.auth().currentUser;
//     console.log(user);
//     const token = user && (await user.getIdToken());
//     console.log(token);
//     const payloadHeader = {
//         headers: {
//             host: 'localhost:4000',
//             'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0',
//             accept: 'application/json, text/plain, */*',
//             'accept-language': 'en-US,en;q=0.5',
//             'accept-encoding': 'gzip, deflate',
//             origin: 'http://localhost:3000',
//             connection: 'keep-alive',
//             referer: 'http://localhost:3000/login',
//             'if-none-match': 'W/"1f-pZK48A3ZbwxVl8UtZcC9y8sBFbw"',

//             // 'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`,
//         }
//     };
//     return payloadHeader;
// }

// const createToken = async () => {
//     const user = fire.auth().currentUser;
//     const token = user && (await user.getIdToken());
//     const payloadHeader = {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//     };
//     return payloadHeader;
// }



export function login(email, password) {
    const promise = new Promise((resolve, rejects) => {
        fire.auth().signInWithEmailAndPassword(email, password).then(
            async (data) => {
                console.log(data);
                const user = await fire.auth().currentUser;
                console.log(user);
                const token = user && (await user.getIdToken());
                console.log(token);

                await axios.get(`http://localhost:4000/login/${email}/${password}/${token}`)
                    .then(
                        res => {
                            console.log("login")
                            console.log(res.data)
                            localStorage.setItem('token', res.data.token)
                            resolve(true)
                        },
                        err => {
                            console.log("error login" + err)
                            rejects(false)
                        }
                    );
            },
            err => {
                console.error('Incorrect username or password');
                rejects(false)
            }
        );
    });
    return promise;
}

export function watchPost(post) {
    const token = localStorage.getItem('token');
    console.log(token);
    const promise = new Promise((resolve, rejects) => {
        axios.post(`http://localhost:4000/watchPost/${token}`, post)
            .then(
                res => {
                    console.log("post watched");
                    console.log(res.data);
                    resolve(res.data);
                },
                err => {
                    console.log("error adding post")
                    rejects(err);
                }
            );
    })
    return promise;
}

export function addPost(post) {
    const token = localStorage.getItem('token');
    console.log(token);
    const promise = new Promise((resolve, rejects) => {
        axios.post(`http://localhost:4000/addPost/${token}`, post)
            .then(
                res => {
                    console.log("post added");
                    console.log(res.data);
                    resolve(res.data);
                },
                err => {
                    console.log("error adding post")
                    rejects(err);
                }
            );
    })
    return promise;
}

export function getMyPosts() {
    const promise = new Promise((resolve, rejects) => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:4000/getMyPosts/${token}`)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    rejects(err)
                }
            );
    })
    return promise;
}




export function getHistoryPosts() {
    const promise = new Promise((resolve, rejects) => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:4000/getHistoryPosts/${token}`)
            .then(
                res => {
                    resolve(res.data)
                },
                err => {
                    rejects(err)
                }
            );
    })
    return promise;
}


export function deleteUserPost(postId) {
    const token = localStorage.getItem('token');
    const promise = new Promise((resolve, rejects) => {
        axios.delete(`http://localhost:4000/deletePost/${token}/${postId}`)
            .then(
                res => {
                    console.log("post deleted")
                    console.log(res.data)
                    resolve(res.data)
                },
                err => {
                    console.log("error deleting post")
                    console.log(err)
                    rejects(err)
                }
            );
    })
    return promise;
}




export function updatePost(post) {
    const token = localStorage.getItem('token');
    const promise = new Promise((resolve, rejects) => {
        axios.put(`http://localhost:4000/updatePost/${token}`, post)
            .then(
                res => {
                    console.log("post updated")
                    console.log(res.data)
                    resolve(res.data)
                },
                err => {
                    console.log("error update post")
                    console.log(err)
                    rejects(err)
                }
            );
    });
    return promise;
}




