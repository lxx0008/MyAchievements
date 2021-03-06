Template.loginForm.onRendered(function(){
 $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });
});
Template.loginForm.helpers({
    username: function(){
            return localStorage.username;
    },
    password: function(){
            return localStorage.password;
    },
    isChecked: function(){
        return localStorage.ischecked;
    }
});
Template.loginForm.events({
    'submit form': function(e){
        e.preventDefault();
        var username = $(e.target).find('[name=username]').val();
        var password = $(e.target).find('[name=password]').val();
        var remember = $(e.target).find('[name=remember]');
        if (username === "" || password === ""){
            $('div#error-message').html("用户名密码不能为空");
            Meteor.setTimeout(function(){
                $('div#error-message').html("");
            },3000);
        }else{

            Meteor.loginWithPassword(username,password,function(error){
                if(error){
                    $('div#error-message').html("请检查用户名和密码是否正确");
                }else{
                    var user = Meteor.user();
                    if (user.profile.root === "admin"){
                        Router.go('admin');
                    }else if(user.profile.root === "teacher" || user.profile.root === "assistant"){
                        Router.go('teachersHomeworkList');
                    }else if(user.profile.root === "student"){
                        Router.go('student');
                    };

                    if(remember.is(":checked")){//记住密码
                        localStorage.username=username;
                        localStorage.password=password;
                        localStorage.ischecked=true;
                    }else{
                        localStorage.username="";
                        localStorage.password="";
                        localStorage.ischecked=""
                    }
                }
            });
        }
    },

     'click .submit-email': function(){
         var email = $("input#email").val();
         if(!email){
             Materialize.toast("Your email ?",3000);
         }else{
             var options = {
                 email: email,
             };
             Accounts.forgotPassword(options,function(error){
                 if(error)
                     Materialize.toast(error.reason,3000,'teal');
                 else{
                     Materialize.toast("We have send a email to you,please check.",3000,'teal');}
             });
         };
     }
});

