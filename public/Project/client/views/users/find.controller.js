"use strict";

(function(){
    angular
        .module("BonAppetitApp")
        .controller("FindController", FindController);

    function FindController ($location,$rootScope,UserService) {

        var vm = this;

        function init() {

            UserService.findAllUsers()
            .then(function(users){
                vm.allUsers = users.data;
            },function(err){

            });

            UserService.findFriends($rootScope.currentUser._id)
                .then(function(users){
                    vm.friends = users.data;
                },function(err){

                });

            UserService.findFollowers($rootScope.currentUser._id)
                .then(function(users){
                    vm.followers = users.data;
                },function(err){

                });



        }
        init();

        vm.isCurrentUser = isCurrentUser;
        vm.addFriend = addFriend;
        vm.removeFriend = removeFriend;
        vm.isFriend = isFriend;
        vm.hasNotification = hasNotification;
        vm.undoNotify = undoNotify;


        function undoNotify(friend){
            console.log(friend);
            UserService.undoNotify(friend)
            .then(function(user){
                console.log("notify undone");
                $location.url("/api/profile/"+friend.followerName+"/profile");
            })
        }

        function hasNotification(notify){
            if(notify == "yes"){
                return true;
            }
            return false;
        }

        function isCurrentUser(username){
            if( $rootScope.currentUser != null && $rootScope.currentUser.username == username ){
                return true;
            }
            return false;
        }

        function isFriend(user){
            if ($rootScope.currentUser != null && $rootScope.currentUser.friends.length > 0){
                if($rootScope.currentUser.friends.indexOf(user._id) != -1){
                    return true;
                }
            }
            return false;
        }

        function addFriend(friend){
            UserService.addFriend($rootScope.currentUser._id,$rootScope.currentUser.username,friend)
            .then(
                function(userFriend){
                    vm.message= "Added as Friend";
                        var friends = [];
                    friends = $rootScope.currentUser.friends;
                    friends.push(userFriend.data.followerId);

                    var updatedUser = {
                        username: $rootScope.currentUser.username,
                        password: $rootScope.currentUser.password,
                        firstName: $rootScope.currentUser.firstName,
                        lastName: $rootScope.currentUser.lastName,
                        email: $rootScope.currentUser.email,
                        phones: $rootScope.currentUser.phones,
                        review: $rootScope.currentUser.review,
                        likes: $rootScope.currentUser.likes,
                        friends : friends
                    };

                    UserService.updateUser( $rootScope.currentUser._id, updatedUser)
                        .then(
                            function (updatedUser){
                                if (updatedUser.data != null) {
                                    UserService.setUser(updatedUser.data);
                                    vm.message = "User updated successfully";
                                }
                                else
                                {
                                    vm.message = "Cannot update User";
                                }
                            },
                            function (error){
                                vm.message = "Cannot update User";
                            });

                    UserService.findFriends($rootScope.currentUser._id)
                        .then(function(users){
                            vm.friends = users.data;
                        },function(err){

                        });

                },function(err){

                }
            )
        }

        function removeFriend(fname){

            UserService.findUserByUsername(fname)
            .then(function(userFriend){

                UserService.removeFriend($rootScope.currentUser._id,userFriend._id)
                    .then(
                        function(userFriend){
                            vm.message= "removed as Friend";
                            var friends = [];
                            friends = $rootScope.currentUser.friends;
                            friends.splice(friends.indexOf(userFriend._id),1);

                            var updatedUser = {
                                username: $rootScope.currentUser.username,
                                password: $rootScope.currentUser.password,
                                firstName: $rootScope.currentUser.firstName,
                                lastName: $rootScope.currentUser.lastName,
                                email: $rootScope.currentUser.email,
                                phones: $rootScope.currentUser.phones,
                                review: $rootScope.currentUser.review,
                                likes: $rootScope.currentUser.likes,
                                friends : friends
                            };

                            UserService.updateUser( $rootScope.currentUser._id, updatedUser)
                                .then(
                                    function (updatedUser){
                                        if (updatedUser.data != null) {
                                            UserService.setUser(updatedUser.data);
                                            vm.message = "User updated successfully";
                                        }
                                        else
                                        {
                                            vm.message = "Cannot update User";
                                        }
                                    },
                                    function (error){
                                        vm.message = "Cannot update User";
                                    });

                            UserService.findFriends($rootScope.currentUser._id)
                                .then(function(users){
                                    vm.friends = users.data;
                                },function(err){

                                });

                        },function(err){

                        }
                    )

            });

        }

    }
})();