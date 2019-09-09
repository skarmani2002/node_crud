const _ = require("underscore");

const customErrors = {
    
    ESS40301: {
        status: 403,
        error_code: 'ESS40301',
        error_summary: 'Forbidden',
        error_message: 'Your request is not authorized to access the endpoint.'
    },
    ESS40401: {
        status: 404,
        error_code: 'ESS40401',
        error_summary: 'Not Found',
        error_message: 'The requested resource at specified endpoint could not be found.'
    },
    ESS42201: {
        status: 422,
        error_code: 'ESS42201',
        error_summary: 'Field Validation Failed',
        error_message: `Required field validation failed.`
    },
    ESS42202: {
        status: 422,
        error_code: 'ESS42202',
        error_summary: 'Account Already Exists',
        error_message: 'An account already exists for this username. Please login or register with a different username.'
    },
    ESS42203: {
        status: 422,
        error_code: `ESS42203`,
        error_summary: `Member Email Not Found`,
        error_message: `Email not found. Please try again or signup.`
    },
    
    
    ESS42214: {
        status: 422,
        error_code: 'ESS42214',
        error_summary: 'Password Reset Failure',
        error_message: 'Failed to reset password. Please try again.'
    },
    ESS42215: {
        status: 422,
        error_code: 'ESS42215',
        error_summary: 'Look Not Found',
        error_message: 'Look not found. Please try again.'
    },
    ESS42216: {
        status: 422,
        error_code: 'ESS42216',
        error_summary: 'Invalid Email Domain',
        error_message: 'The email host (domain) does not exist. Please enter a valid email address and try again.'
    },
    ESS42217: {
        status: 422,
        error_code: `ESS42217`,
        error_summary: `Device Token Registration Failure`,
        error_message: `The device token could not be registered.`
    },
    ESS42401: {
        status: 424,
        error_code: `ESS42401`,
        error_summary: `Unknown Data Exception`,
        error_message: `Something went wrong. Please try again.`
    },
    ESS42901: {
        status: 429,
        error_code: `ESS42901`,
        error_summary: `Too Many Requests`,
        error_message: `You are making too many requests in a configured timeframe. Please spread out your requests.`
    },
    ESS50001: {
        status: 500,
        error_code: 'ESS50001',
        error_summary: 'Internal Server Error',
        error_message: 'There was a problem with the server. Try again later.'
    },
    ESS50301: {
        status: 503,
        error_code: 'ESS50301',
        error_summary: 'Service Unavailable',
        error_message: `We're sorry. The service is temporarily unavailable. Please try again later.`
    },
    ESS50302: {
        status: 503,
        error_code: 'ESS50302',
        error_summary: 'Service Unavailable',
        error_message: `We're sorry. The service is temporarily offline for a scheduled maintenance. Please try us again later.`
    },
   
    
    
    
    ESS20408: {
        status: 503,
        error_code: 'ESS50306',
        error_summary: 'Customer not found.',
        error_message: 'Sorry! We could not find customer'  
    },
    ESS20409: {
        status: 503,
        error_code: 'ESS50306',
        error_summary: 'Something went wrong',
        error_message: 'Sorry! Something went wrong please try again'  
    },
   
};

const getError = (error_code, exception) => {
    let err = customErrors[error_code];
    if (exception) {
        err.stack = exception.stack.toString();
    }
    return err;
};

const getOKTAAPIError = (exception) => {
    let err = _.pick(exception, 'status');
    err.error_code = exception.errorCode;
    err.error_summary = exception.errorSummary;
    err.error_message = exception.errorSummary;
    if (exception.errorCauses.length > 0) {
        let parts = exception.errorSummary.split(': ');
        let errorSummary = exception.errorCauses.shift().errorSummary;
        err.error_message = errorSummary.replace(parts[parts.length - 1] + ': ', '');
    }
    return err;
};

const validationError = (joi_errors, next = null) => {
    let err = getError('ESS42201');
    err.error_message = `Required field validation failed for : ${ _.pluck(joi_errors, 'message')[0] || ''}`;
    return err;
};

module.exports = {
    getError: getError,
    validationError: validationError,
    getOKTAAPIError: getOKTAAPIError
};
