const posts = require('../temp');
const totalPosts = () => posts.length;
const allposts = () => posts;
const newPost = (parent, args) => {
    const post = {
        id: posts.length++,
        // title: args.input.title,
        // desc: args.input.desc
        // or we can use spreat operator
        ...args.input
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