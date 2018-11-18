//DEPENDENCIES
const mongoose = require('mongoose')

//USER SCHEMA
let UserSchema = new mongoose.Schema (
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String,
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

//SCHEMA METHODS
//Follow an author
UserSchema.methods.follow = function (user_id) {
    if  (this.following.indexOf(user_id) === -1) {
        this.following.push(user_id)
    }
    return this.save
}

//Add follower to user
UserSchema.methods.addFollower = function (fan) {
    this.followers.push(fan)
}

module.exports = mongoose.model('User', UserSchema)