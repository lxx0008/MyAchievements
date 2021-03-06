Template.allUser.helpers({
    admins: function(){
        return Meteor.users.find({'profile.root':'admin'});
    },
    teachers: function(){
        return Meteor.users.find({'profile.root':'teacher'});
    },
    TAs: function(){
        return Meteor.users.find({'profile.root':'assistant'});
    },
    students: function(){
        return Meteor.users.find({'profile.root':'student'},{sort: {'profile.group': 1}});
    }
});
Template.showAdmin.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
Template.showStudent.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
Template.showTeacher.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
Template.showTeachAssistan.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
