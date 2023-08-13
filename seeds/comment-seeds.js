const { Comment } = require('../models');

const commentData = [{
    comment_text: "How ya doing?!?!?!",
    user_id: 1,
    post_id: 1
},
{
    comment_text: "Fogeet about it!!!",
    user_id: 2,
    post_id: 2
},
{
    comment_text: "What are ya gona do???",
    user_id: 3,
    post_id: 3
}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;