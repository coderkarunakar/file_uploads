                        //POSTS ARE GETTING CREATED WITH THIS CODE...


//method to submit the form data for new post using AJAX

{
     console.log('hello');
     let createPost=function(){
        //getting the form from the home.ejs with it's id,and $ means jquery language all the all the functions they begin with $ only.,and this is the post creation id ,
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            //and with this preventDefault  ,if we try to click on submit button then it wont work,thats the work it does.
            e.preventDefault();
            
            //by using the ajax queries we can submit..
            $.ajax({
                type:'post', //since it is an post request
                url:'/posts/create',  //this was took from the home.ejs file ,from that form action
                //this converts the form data into the json,like content would be the key and value is filled in the form 
                data:newPostForm.serialize(),
                //creating a function
                success:function(data){
                        let newPost= newPostDom(data.data.post);
                        // append to an list ,this below one is took from the home.ejs there we can see this id and ul tag..,and prepend means putting at the first position
                        $('#posts-list-container>ul').prepend(newPost);

                },error:function(error){
                    console.log(error.responseText);//in error it is responsetext
                }


            }) 

        });

     }

     //ONCE WE SUBMIT THIS WE RECEIVE IN THE POST CONTROLLER
//METHOD TO CREATE A POST IN DOM (IT IS VERY EASY..)
//we need a function which will help us in converting this text of html in post.ejs into jquery object 
let newPostDom = function(post){  //passing the post data i.e the data which i have received below simply added the _post.js file code only..and made some changes
    return $(`  <li id="post-${ post._id%}">  
                  <P>
                      <small>
                          <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                      </small>
     
  
                      ${ post.content}
                      <br>
                      <small>
                          ${ post.user.name }
                      </small>
                  </P>
  
  
  
                          <!-- COMMENTS... -->
  
  
  
                              <!-- creating a form page for comments... -->
                  <div class="post-comments">
                          <form action="/comments/create" method="POST">
                              <input type="text" name="content" placeholder="type here to add comment.." required>
  
                              <!-- id of the post to which comment need  to be added either we allow user to send that or place it in an hidden input -->
                              <input type="hidden" name="post" value="${ post._id }">
                              <input type="submit" value="Add Comment">
  
                          </form>                  
  
  
  
                                      <!-- deleting comments -->
  
  
                      <div class="post-comments-list">
                          <ul id="post-comments -${post._id}">
                      
  
                          </ul>
                      </div>
          
                  </div>
  </li>`) //backtick is a feature of es-6 where in  i can interpolate(insert) strings

}



//method to delete a post from dom 
//this is the function sending ajax request

let deletepost=function(deletelink){ //deletelink since we will pass on a tag of the post.ejs file
    $(deletelink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deletelink).prop('href'), //this is how we get the value of href in a tag of post.ejs file in views folder
            success:function(data){

                $(`#post-${data.data.post_id}`).removed();//here we took data.data. since we included data key
                deletePost($(' .delete-post-button', newPost)); //this is took from post.ejs class
            },error:function(error){
                console.log(error.responseText); //with this we can display the error ..
            }




        });
    })
    
}

     createPost();
}