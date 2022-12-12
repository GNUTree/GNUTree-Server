const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createUser = async function (email, nickname, password) {
  // 이메일 중복 확인
  const emailRows = await userProvider.emailCheck(email);
  if (emailRows.length > 0)
    return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 암호화
    const insertUserParams = [email, nickname, hashedPassword];
    await userDao.insertUser(connection, insertUserParams);
    await connection.commit();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - createUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.resetPassword = async function (email, password) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 암호화
    const updateUserPasswordParams = [hashedPassword, email];
    await userDao.updateUserPassword(connection, updateUserPasswordParams);
    await connection.commit();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - resetPassword Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (email, password) {
  try {
    // 이메일 여부 확인
    const userRows = await userProvider.emailCheck(email);
    if (userRows.length < 1)
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

    const hashedPassword = userRows[0].password;

    // 비밀번호 확인
    const isSameNumber = bcrypt.compareSync(password, hashedPassword);

    if (!isSameNumber) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    // 계정 상태 확인
    if (userRows[0].status === "BANNED") {
      return errResponse(baseResponse.SIGNIN_BANNED_ACCOUNT);
    } else if (userRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //토큰 생성 Service
    let token = await jwt.sign(
      {
        userIdx: userRows[0].idx,
      }, // 토큰의 내용(payload)
      process.env.JWT_SECRET, // 비밀키
      {
        expiresIn: "365d",
        subject: "user",
      } // 유효 기간 365일
    );

    return response(baseResponse.SUCCESS, {
      userIdx: userRows[0].idx,
      jwt: token,
    });
  } catch (err) {
    logger.error(
      `App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(
        err
      )}`
    );
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editUser = async function (id, nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const editUserResult = await userDao.updateUserInfo(
      connection,
      id,
      nickname
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUser Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.editUserNickname = async function (userIdx, nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const infoParams = [nickname, userIdx];
    await userDao.updateUserNickname(connection, infoParams);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(`App - editUserNickname Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.editUserNicknamePassword = async function (
  userIdx,
  nickname,
  password
) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 암호화
    const infoParams = [nickname, hashedPassword, userIdx];
    await userDao.updateUserNickname(connection, infoParams);
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    logger.error(
      `App - editUserNicknamePassword Service error\n: ${err.message}`
    );
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
