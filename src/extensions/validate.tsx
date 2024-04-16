
const EMAIL_VALIDATE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email: string) {
    return EMAIL_VALIDATE.test(String(email).toLowerCase());
}

function validatePassword(password: string) {
    return password.length >= 6 && password.length <= 100;
}

function validateName(password: string) {
    return password.length >= 4 && password.length <= 20;
}

function validateText(password: string) {
    return password.length >= 10 && password.length <= 200;
}

function validateInputString(value: string, type: string) {
    switch (type) {
        case "email":
            return validateEmail(value);
        case "password":
            return validatePassword(value);
        default:
            return validateName(value);
    }
}

export default validateInputString;

