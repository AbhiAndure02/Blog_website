import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required :true,
        },
        content: {
            type:String,
            required: true,
        },
        title:{
            type:String,
            required: true,
            unique: true,
        }, 
        image:{
            type: String,
            default:'https://bloggerspassion.com/wp-content/uploads/2019/12/best-programming-blogs.jpg',

        },
        category:{
            type:String,
            default:"uncatogorized"
        },
        slug:{
            type:String,
            required: true,
            unique: true,
        }, 
    },{timestamps: true}
);
const Post = mongoose.model('post', postSchema);
export default Post;