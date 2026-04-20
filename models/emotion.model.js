const {Schema, model}=require('mongoose')

const emotionSchema=new Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        emoji: {
            type:String,
            required:true,
            
        },
        color: {
            type:String,
            required:true,
        }
        
    },
    {
        collection: 'Emotion',
        timestamps:true,
    }
)
const Emotion=model('Emotion', emotionSchema)
module.exports=Emotion