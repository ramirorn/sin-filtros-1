import { model, Schema } from "mongoose";

const PostSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        tags: [String],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const PostModel = model("Post", PostSchema);