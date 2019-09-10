'use strict';
class UserController {

    constructor() {
        this.firebase  = global.firebaseapp;
    }

    async register(req, res, next){
        try{
            console.log(this.firebase);
            await this.firebase.database().ref('/TestMessages').set({TestMessage: 'GET Request'});
            console.log("Here we go");
        }catch(ex){
            console.log("rttot",ex)
        }
    }
}
module.exports = UserController;
