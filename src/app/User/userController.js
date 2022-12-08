const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const {
  regexPassword,
  regexEmail,
  regexNickname,
} = require("../../../config/regex");

/**
 * API Name : 유저 생성 (회원가입) API
 * [POST] /sign-up
 */
exports.postSignUp = async function (req, res) {
  /**
   * Body: password, nickname, authenticationNumber
   * Cookie: email
   */
  const { nickname, password } = req.body;
  const { email } = req.cookies;

  // 빈 값 체크
  if (!email)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_SESSION_EXPIRE));
  if (!password)
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
  if (!nickname)
    return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_EMPTY));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email)) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
  }
  if (nickname.length > regexNickname) {
    return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_TOO_LONG));
  }
  if (!regexPassword.test(password)) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
  }

  const signUpResponse = await userService.createUser(
    email,
    nickname,
    password
  );

  // 쿠키 초기화
  res.clearCookie("email");

  return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {
  /**
   * Query String: email
   */
  const email = req.query.email;

  if (!email) {
    // 유저 전체 조회
    const userListResult = await userProvider.retrieveUserList();
    return res.send(response(baseResponse.SUCCESS, userListResult));
  } else {
    // 유저 검색 조회
    const userListByEmail = await userProvider.retrieveUserList(email);
    return res.send(response(baseResponse.SUCCESS, userListByEmail));
  }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userId
   */
  const userId = req.params.userId;

  if (!userId) return res.send(errResponse(baseResponse.USERID_EMPTY));

  const userByUserId = await userProvider.retrieveUser(userId);
  return res.send(response(baseResponse.SUCCESS, userByUserId));
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {
  const { email, password } = req.body;

  // 형식적 Validation 처리
  if (!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
  if (!password)
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

  const signInResponse = await userService.postSignIn(email, password);

  return res.send(signInResponse);
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {
  // jwt - userId, path variable :userId

  const userIdFromJWT = req.verifiedToken.userIdx;

  const userId = req.params.userId;
  const nickname = req.body.nickname;

  if (userIdFromJWT != userId) {
    res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
  } else {
    if (!nickname)
      return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

    const editUserInfo = await userService.editUser(userId, nickname);
    return res.send(editUserInfo);
  }
};

/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
  const userIdResult = req.verifiedToken.userId;
  console.log(userIdResult);
  return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
