export const passwordValidator = (rule, value, cb) => {
  if (value.length < 8) {
    cb('Password length must be more than or equal to 8 characters')
  } else if (!value.match(/(?=.*[A-Z])[A-Z]/)) {
    cb('Minimum Combination Password of 1 Uppercase')
  } else if (!value.match(/(?=.*[a-z])[a-z]/)) {
    cb('Minimum Combination Password of 1 Lowercase')
  } else if (!value.match(/(?=.*[0-9])[0-9]/)) {
    cb('Minimum Combination Password of Number 0-9')
  } else {
    return cb()
  }
}

export const comparePasswordValidator = (rule, password, confirmPassword, cb) => {
  if (!password || confirmPassword === password) {
    return cb()
  }
  return cb('The two passwords that you entered do not match!');
}

export const usernameValidator = (rule, value, cb) => {
  if (value.indexOf(' ') >= 0) {
    return cb('Username cannot use space characters')
  } else if (value.match(/(?=.*[A-Z])[A-Z]/)) {
    return cb('Username is required to use lowercase')
  } else if (value.length < 6)  {
    return cb('Username must be at least 6 characters long')
  } else {
    return cb()
  }
}
export const phoneNumberValidator = (rule, value, cb) => {
  if (value !== '' &&
    value !== undefined &&
    (!/^\d*$/.test(value) || value.length < 8 || value.length > 13)) {
    return cb('Not valid phone number')
  } else {
    return cb()
  }
}
