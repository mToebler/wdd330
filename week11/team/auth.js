//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import { makeRequest } from './authHelpers.js';
export default class Auth {
   constructor() {
      this.jwtToken = '';
      this.user = {};
   }

   // async login(callback) {
   login(callback) {
      const _this = this;
      // let's first prevent default on button
      callback.preventDefault();
      // replace the ids below with whatever you used in your form.
      const password = document.getElementById('password');
      const username = document.getElementById('username');
      const postData = {
         email: username.value,
         password: password.value
      };
      try {         
         if (true) {
            shame();
            console.warn('short circuting this version due to no node server running');
            return { 'status': 'short circuting this version due to no node server running' };
         }
            
         // 1. use the makeRequest function to pass our credentials to the server
         makeRequest('login', 'POST', postData)
            // 2. if we get a successful response...we have a token!  Store it since we will need to send it with every request to the API.
            .then(res => {
               //return new Promise(() => this.jwtToken = res, (e) => { throw new Error(e) });
               // if(res) {
               this.jwtToken = res.accessToken;
               return new Promise(() => {this.getCurrentUser(username.value); }, (e) => { throw Error(e);});
               // }

            })
            .then(resUser => {
               console.log(resUser);
               this.user = resUser;
               // console.log(`Hello ${_this.user.email}`);
               // console.log(`Hello ${user}`);
               // console.log(`Hello ${this.user}`);
               // console.log(`Hello ${resUser}`);
               document.getElementById('login').classList.add('hidden');
               document.querySelector('section').classList.toggle('hidden');
               // clear the password
               password.value = '';
               return resUser;
            }, e => { throw Error(e) });
         // let's get the user details as well and store them locally in the class
         // you can pass a query to the API by appending it on the end of the url like this: 'users?email=' + email
         // .then(np => {
         //    this.user = this.getCurrentUser(username.value);               
         //    document.getElementById('login').classList.add('hidden');
         //    // clear the password
         //    password.value = '';


         // this.user = await this.getCurrentUser(username.value);
         // hide the login form.
         // document.getElementById('login').classList.add('hidden');
         // // clear the password
         // password.value = '';

         // since we have a token let's go grab some data from the API by executing the callback if one was passed in
         if(callback instanceof Auth) {
            callback();
         }
      } catch(error) {
         // if there were any errors display them
         console.log(error);
         console.log('moving forward in presentation mode...');
         shame();
      }
   }
   // uses the email of the currently logged in user to pull up the full user details for that user from the database
   // async getCurrentUser(email) {
   getCurrentUser(email) {
      try {
         makeRequest(`users?email=${email}`, 'GET', null, this.jwtToken)
            .then(res => {
               console.log(res);
               shame();
               return res[0];
            }).catch(e => { throw Error(e) });
      } catch(error) {
         // if there were any errors display them
         throw Error(error);
      }
   }

   set token(value) {
      // we need this for the getter to work...but we don't want to allow setting the token through this.
   }
   get token() {
      return this.jwtToken;
   }
} // end auth class

function shame() {
   document.getElementById('login').classList.add('hidden');
   document.querySelector('section').classList.toggle('hidden');               
}