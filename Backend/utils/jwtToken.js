//this file is basically created to give generate the cookies or token at the time of userRegistration.

//this sendToken function will generate the token.

//here we are calling the getJWTToken() funtion and generating the token with the help of function which is present in the userSchema

export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // we have to make it true because when you will not give it true then token will be generate but it will give the many issues as well.

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
  });
};
