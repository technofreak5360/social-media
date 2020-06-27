const posts = require('../temp');
const { authCheck } = require('../helpers/auth');

//querry
const totalPosts = () => posts.length;
const allposts = async (parent, args, { req }) => {

    await authCheck(req);
    return posts
};


//mutation
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