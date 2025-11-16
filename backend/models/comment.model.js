import { model, Schema } from "mongoose";

const CommentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const CommentModel = model("Comment", CommentSchema);