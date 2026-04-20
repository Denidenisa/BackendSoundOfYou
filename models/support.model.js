const {Schema,model}=require('mongoose')
const supportSchema=new Schema(
    
    { 
        message: {
            type:String,
            required : true,
            trim:true
        },
        songId:{
            type:Schema.Types.ObjectId,
            ref:'Song',
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    
},
{
    collection:'Support',
    timestamps:true
}
)
const Support = model('Support',supportSchema)
module.exports=Support