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
  res.clearCookie("hashAuth");

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
 * [GET] /users/edit/:userIdx
 */
exports.getUserById = async function (req, res) {
  /**
   * Path Variable: userIdx
   * jwt - userIdx
   */

  // 사용자 검증
  const loggedInUserIdx = req.verifiedToken.userIdx;
  const pageUserIdx = parseInt(req.params.userIdx);

  // 빈 값 체크
  if (!pageUserIdx) return res.send(errResponse(baseResponse.USERIDX_EMPTY));

  if (!loggedInUserIdx == pageUserIdx) {
    return res.send(errResponse(baseResponse.USER_IDX_NOT_MATCH));
  }

  const user = await userProvider.retrieveUser(pageUserIdx);

  if (!user) {
    return res.send(errResponse(baseResponse.USER_NOT_EXIST));
  }

  return res.send(response(baseResponse.SUCCESS, user.nickname));
};

/**
 * API Name : 사용자 개인정보 변경 API
 * [POST] /users/edit/:userIdx
 */
exports.editUserInfo = async function (req, res) {
  /**
   * Path Variable: userIdx
   * body: nickname, password
   * jwt - userIdx
   */
  const loggedInUserIdx = req.verifiedToken.userIdx;
  const pageUserIdx = parseInt(req.params.userIdx);
  const { nickname, password } = req.body;

  // 빈 값 체크
  if (!pageUserIdx) return res.send(errResponse(baseResponse.USERIDX_EMPTY));

  // 사용자 검증
  if (loggedInUserIdx != pageUserIdx) {
    return res.send(errResponse(baseResponse.USER_IDX_NOT_MATCH));
  }

  // 닉네임 형식 체크
  if (!nickname) {
    return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
  } else if (nickname.length > regexNickname) {
    return res.send(errResponse(baseResponse.SIGNUP_NICKNAME_TOO_LONG));
  }

  // 패스워드 값 입력 안할 시, 닉네임만 변경
  // 패스워드 값 입력 시, 닉네임+패스워드 변경
  if (!password) {
    const editUserInfoResponse = await userService.editUserNickname(
      loggedInUserIdx,
      nickname
    );
    return res.send(editUserInfoResponse);
  } else {
    // 패스워드 regex 체크
    if (!regexPassword.test(password)) {
      return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_ERROR_TYPE));
    }
    const editUserInfoResponse = await userService.editUserNicknamePassword(
      loggedInUserIdx,
      nickname,
      password
    );
    return res.send(editUserInfoResponse);
  }
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
