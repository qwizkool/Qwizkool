describe('Model :: User', function () {

    // Create test data for the user model
    var time = new Date().getTime();
    var testUser = "User" + time;
    var testPwd = "Pwd" + time;
    var testEmail = testUser + "@email.com";


    beforeEach(function () {
        var that = this,
            done = false;

        require(['modules/user'], function (User) {
            //  that.users = new User.Collection();
            that.user = new User.Model();
            done = true;
        });

        waitsFor(function () {
            return done;
        }, "Create Models");

    });

    afterEach(function () {
        /*       var done = false,
         isDone = function () {
         return done;
         };

         this.user.fetch({
         success:function (c) {
         c.each(function (m) {
         m.destroy();
         });
         done = true;
         }
         });

         waitsFor(isDone);

         done = false;
         this.user.destroy({
         success:function () {
         done = true;
         }
         });

         waitsFor(isDone);*/

    });

    describe('Create User', function () {


        it('should create a user', function () {
            var done = false;

            // Registration completed event handler.
            var userRegisterEvent = function () {
                if (this.user.get('isRegistered') === true) {
                    done = true;
                } else {
                    done = false;
                }
            };

            // Register the User
            this.user.set('name', testUser);
            this.user.set('email', testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-registration-event', userRegisterEvent, this);
            this.user.register();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isRegistered')).toEqual(true);
                expect(this.user.get('id')).toEqual(jasmine.any(String));
                expect(this.user.get('registrationStatus')).not.toBeNull();
            });

        });

        it('should fail creating a user with same user name', function () {
            var done = false;

            // Registration completed event handler.
            var userRegisterEvent = function () {
                if (this.user.get('isRegistered') === true) {
                    done = false;
                } else {
                    done = true;
                }
            };

            // Register the Same User different email
            this.user.set('name', testUser);
            this.user.set('email',  new Date().getTime()+ testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-registration-event', userRegisterEvent, this);
            this.user.register();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isRegistered')).toEqual(false);
                expect(this.user.get('id')).toBeNull();
                expect(this.user.get('registrationStatus')).toEqual("Bad Request");
            });

        });

        it('should fail creating a user with same email', function () {
            var done = false;

            // Registration completed event handler.
            var userRegisterEvent = function () {
                if (this.user.get('isRegistered') === true) {
                    done = false;
                } else {
                    done = true;
                }
            };

            // Register the new User but same email
            this.user.set('name', testUser + new Date().getTime());
            this.user.set('email', testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-registration-event', userRegisterEvent, this);
            this.user.register();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isRegistered')).toEqual(false);
                expect(this.user.get('id')).toBeNull();
                expect(this.user.get('registrationStatus')).toEqual("Bad Request");
            });

        });


    });

    describe('Login/Logout User', function () {



        it('should prevent login of an invalid user', function () {
            var done = false;

            // Login  completed event handler.
            var userLoginEvent = function () {
                if (this.user.get('isLoggedIn') === true) {
                    done = false;
                } else {
                    done = true;
                }
            };

            // Register the User
            this.user.set('name', testUser + new Date().getTime());
//            this.user.set('email', testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-login-event', userLoginEvent, this);
            this.user.login();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isLoggedIn')).toEqual(false);
                expect(this.user.get('id')).toBeNull();
                expect(this.user.get('loginStatus')).toEqual("Unauthorized");
            });

        });

        it('should allow login of a valid user', function () {
            var done = false;

            // Login  completed event handler.
            var userLoginEvent = function () {
                if (this.user.get('isLoggedIn') === true) {
                    done = true;
                } else {
                    done = false;
                }
            };

            // Register the User
            this.user.set('name', testUser);
            //           this.user.set('email', testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-login-event', userLoginEvent, this);
            this.user.login();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isLoggedIn')).toEqual(true);
                expect(this.user.get('id')).toEqual(jasmine.any(String));
                expect(this.user.get('loginStatus')).not.toBeNull();

                // Set the ID
                this.user.id=this.user.get('id');

            });

        });

        it('should allow to fetch a logged in user', function () {

            var done = false;

            // Login  completed event handler.
            var userLoginEvent = function () {
                if (this.user.get('isLoggedIn') === true) {
                    done = true;
                } else {
                    done = false;
                }
            };

            // Register the User
            this.user.set('name', testUser);
            //           this.user.set('email', testEmail);
            this.user.set('password', testPwd);
            this.user.on('user-login-event', userLoginEvent, this);
            this.user.login();

            waitsFor(function () {
                return done;
            });

            // Validate the registration
            runs(function () {
                expect(this.user).not.toBe(null);
                expect(this.user.get('isLoggedIn')).toEqual(true);
                expect(this.user.get('id')).toEqual(jasmine.any(String));
                expect(this.user.get('loginStatus')).not.toBeNull();

                this.user.action="none";
                this.user.id=this.user.get('id');


                this.user.fetch({
                    success:function (c) {

                        done = true;
                    }
                });

                waitsFor(function () {
                    return done;
                });


                // Validate the registration
                runs(function () {
                    expect(this.user).not.toBe(null);
                    expect(this.user.get('isLoggedIn')).toEqual(true);
                    expect(this.user.get('id')).toEqual(jasmine.any(String));
                    expect(this.user.get('loginStatus')).not.toBeNull();
                });

            });



        });


    });
});


//TODO : how to use spy with jasmine??
/*   it('should fail creating a title-less user', function() {
 var spy = jasmine.createSpy();
 this.user.on('error', spy);
 this.user.save({});
 expect(spy.callCount).toEqual(1);
 expect(this.user.id).toBeUndefined();

 });*/