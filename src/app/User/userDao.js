// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 상세 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT idx, nickname, status, email, password
                FROM User
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// 유저 idx로 회원 조회
async function selectUserIdx(connection, idx) {
  const selectUserIdxQuery = `
                SELECT nickname
                FROM User
                WHERE idx = ?;
                `;
  const [userRows] = await connection.query(selectUserIdxQuery, idx);
  return userRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT nickname
                 FROM User
                 WHERE email = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// 유저 생성
async function insertUser(connection, insertUserParams) {
  const insertUserInfoQuery = `
                INSERT INTO User(email, nickname, password)
                VALUES (?, ?, ?);
                `;
  const insertUserRow = await connection.query(
    insertUserInfoQuery,
    insertUserParams
  );

  return insertUserRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
                SELECT email, nickname, password
                FROM UserInfo 
                WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
    selectUserPasswordQuery,
    selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
                SELECT status, id
                FROM UserInfo 
                WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
    selectUserAccountQuery,
    email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
                UPDATE User
                SET nickname = ?
                WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

async function updateUserPassword(connection, updateUserPasswordParams) {
  const updateUserPasswordQuery = `
                UPDATE User
                SET password = ?
                WHERE email = ?;
                `;
  const updateUserPasswordRow = await connection.query(
    updateUserPasswordQuery,
    updateUserPasswordParams
  );
  return updateUserPasswordRow[0];
}

async function updateUserNickname(connection, params) {
  const updateUserNicknameQuery = `
                UPDATE User
                SET nickname = ?, password = ?
                WHERE idx = ?;
                `;
  const updateUserNicknameRow = await connection.query(
    updateUserNicknameQuery,
    params
  );
  return updateUserNicknameRow[0];
}

module.exports = {
  selectUser,
  selectUserEmail,
  selectUserIdx,
  selectUserId,
  insertUser,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  updateUserPassword,
  updateUserNickname,
};
