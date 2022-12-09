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
 * API Name : 회원 정보 관리 페이지
 * [GET] /users/edit/:userId
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userId
   * jwt - userIdx
   * Middleware: idx, nickname
   */
  const loggedInUserIdx = req.verifiedToken.userIdx;
  const pageUserIdx = req.userIdx;

  if (!loggedInUserIdx == pageUserIdx) {
    return res.send(errResponse(baseResponse.USER_IDX_NOT_MATCH));
  }

  return res.send(response(baseResponse.SUCCESS, req.nickname));
};

// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : id, passsword
 */
exports.login = async function (req, res) {
  const { id, password } = req.body;

  // 빈 값 체크
  if (!id) return res.send(errResponse(baseResponse.SIGNIN_ID_EMPTY));
  // 형식 체크 (by 정규표현식)
  if (regexEmail.test(id))
    return res.send(errResponse(baseResponse.SIGNIN_ID_ERROR_TYPE));

  const email = id + "@gnu.ac.kr";

  // 빈 값 체크
  if (!password)
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));

  const signInResponse = await userService.postSignIn(email, password);

  return res.send(signInResponse);
};

/**
 * API Name : 비밀번호 재설정 API
 * [POST] /reset-password
 * body : password
 * cookie : email
 */
exports.resetPassword = async function (req, res) {
  const { password } = req.body;
  const { email } = req.cookies;

  // 빈 값 체크
  if (!password)
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
  if (!email)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_SESSION_EXPIRE));

  // 정규표현식 체크
  if (!regexPassword.test(password)) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
  }

  const resetPasswordResponse = await userService.resetPassword(
    email,
    password
  );

  // 쿠키 초기화
  res.clearCookie("email");

  return res.send(resetPasswordResponse);
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
