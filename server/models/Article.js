const mongoose = require('mongoose')

//ARTICLE SCHEMA

let ArticleSchema = new mongoose.Schema (
    {
        text: String,
        title: String,
        description: String,
        feature_img: String,
        claps: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);

//METHODS FOR ARTICLE SCHEMA
//Clap method will increase the clap count when user pushes clap button
ArticleSchema.methods.clap = function() {
    this.clap++
    return this.save()
}

//Comment method will allow users to comment on the article
ArticleSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}

//Add Author method?
ArticleSchema.methods.addAuthor = function(author_id) {
    this.author = author_id
    return this.save()
}

//Get User Article method
ArticleSchema.methods.getUserArticle = function(_id) {
    Article.find({'author': _id}).then((article) => {
        return article
    })
}

module.exports = mongoose.model('Article', ArticleSchema)