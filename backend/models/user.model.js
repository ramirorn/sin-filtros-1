import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            firstname: {
                type: String,
                required: true,
                trim: true
            },
            lastname: {
                type: String,
                required: true,
                trim: true
            },
            profile_picture: {
                type: String,
                default: 'url_imagen_default.png'
            },
            biography: {
                type: String,

                trim: true
            },
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        saved_posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        device_tokens: {
            type: [String],
            default: [],
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const UserModel = model("User", UserSchema);