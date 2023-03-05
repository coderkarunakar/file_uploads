const { redirect } = require('express/lib/response');
const Comment=require('../models/comments')
const Post=require('../models/post')
//here action is create since we are creating ..
module.exports.create=async function(req,res){
    try{
        
        let post=await Post.findById(req.body.post);
            if(post){
                let comment=await Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                });
            

        //this was given by mongodb,here comment is pushed to mongodb
                    post.comments.push(comment);
                    post.save();

                    res.redirect('/');
                }
            


        }catch(err){
            console.log('Error',err);
            return;
        }
}



//deleting a comment(authorized)

//creating action for deleting a comment
module.exports.destroy=async function(req,res){
    try{
        //find the comment
        let comment= await Comment.findById(req.params.id).sort('-createdAt');
            if(comment.user==req.user.id){
                //before deleting we need to set the post id of the comment,findit and delete it ..
                let postId=comment.post;
                comment.remove();
                let post= Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
                    return res.redirect('back');

                
            }else{
                return res.redirect('back');

            }
       
    }catch(err){
        console.log('Error',err);
        return;

    }
}



        