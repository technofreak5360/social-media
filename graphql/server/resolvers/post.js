const posts = require('../temp');
const totalPosts = () => posts.length;
const allposts = () => posts;
const newPost = (parent, args) => {
    const post = {
        id: posts.length++,
        title: args.title,
        desc: args.desc
    };
    posts.push(post);
    return post;
};

module.exports = {
    Query: {
        totalPosts,
        allposts,
    },
    Mutation: {
        newPost
    }
};