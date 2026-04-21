import mongoose, {mongoose, Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: [true, "Video is required to upload"] 
        },
        thumbnail: {
            type: String,
            required: [true, "Thumbnail is required for the video"]
        },
        title: {
            type: String,
            required: [true, "Thumbnail is required for the video"]
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // comes from cloudinary
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)