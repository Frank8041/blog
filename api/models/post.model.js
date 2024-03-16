import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: "https://www.chess-universe.shop/cdn/shop/articles/move-in-silence-only-speak-when-its-time-to-say-checkmate._39b46e41-12cc-45d5-a4e6-68459d5eb784_1024x1024.jpg?v=1657019591",
        },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;