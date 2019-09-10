const express = require('express');
const router = express.Router();
const UserValidation = require('../validations/users_validation');
const UserController = require('../controllers/UserController');
let user_controller = new UserController();
/*router.post('/users/login',
    auth_manager.Authenticate.bind(auth_manager),
    UserValidation,
    user_controller.login.bind(user_controller));

router.get('/users/get_contact_info/:email',
    auth_manager.Authenticate.bind(auth_manager),
    UserValidation,
    user_controller.get_contact_info.bind(user_controller));
*/
// router.post(
//         '/users/create_new_session',
//         UserValidation,
//         user_controller.create_new_session.bind(user_controller));

/*router.post('/users/recover',
    UserValidation,
    user_controller.recover.bind(user_controller));

router.get('/users/password_reset/:recovery_token',
    user_controller.password_reset.bind(user_controller));

router.post('/users/reset_password',
    UserValidation,
    user_controller.reset_password.bind(user_controller));

router.post('/users/change_password',
    auth_manager.Authenticate.bind(auth_manager),
    UserValidation,
    user_controller.change_password.bind(user_controller));*/

router.post('/users/register',
    //auth_manager.Authenticate.bind(auth_manager),
    UserValidation,
    user_controller.register.bind(user_controller));



module.exports = router;
