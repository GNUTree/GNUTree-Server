// 전체 장식품 조회
async function selectDecorations(connection, userIdx) {
  const selectDecorationListQuery = `
                SELECT idx, nickname, imageUrl
                  FROM Decoration
                 WHERE userIdx = ? AND status = "NORMAL";
                `;
  const [decorationListRow] = await connection.query(
    selectDecorationListQuery,
    userIdx
  );

  return decorationListRow;
}

async function selectDecoration(connection, decorationIdx) {
  const selectDecorationQuery = `
                SELECT idx, nickname, imageUrl, message
                  FROM Decoration
                 WHERE idx = ? AND status = "NORMAL";
                `;
  const [decorationListRow] = await connection.query(
    selectDecorationQuery,
    decorationIdx
  );

  return decorationListRow;
}

async function selectUserIdx(connection, userEmail) {
  const selectUserIdxQuery = `
                SELECT idx
                  FROM User
                 WHERE email = ?
                `;
  const [userIdxRow] = await connection.query(selectUserIdxQuery, userEmail);

  return userIdxRow[0];
}

async function insertDecoration(connection, postDecorationInfoParams) {
  const insertDecorationQuery = `
                INSERT INTO Decoration (imageUrl, nickname, message, userIdx)
                 VALUE (?, ?, ?, ?)
                `;
  const insertDecorationRow = await connection.query(
    insertDecorationQuery,
    postDecorationInfoParams
  );

  return insertDecorationRow[0];
}

async function deleteDecoration(connection, decorationIdx) {
  const deleteDecorationQuery = `
                UPDATE Decoration
                SET status = "DELETED"
                WHERE idx = ?
                `;
  const deleteDecorationRow = await connection.query(
    deleteDecorationQuery,
    decorationIdx
  );

  return deleteDecorationRow[0];
}

async function existDecoration(connection, decorationIdx) {
  const existDecorationQuery = `
                SELECT idx
                FROM Decoration
                WHERE idx = ?
                `;
  const [decorationRow] = await connection.query(
    existDecorationQuery,
    decorationIdx
  );

  return decorationRow[0] ? true : false;
}

module.exports = {
  selectDecorations,
  selectDecoration,
  selectUserIdx,
  insertDecoration,
  deleteDecoration,
  existDecoration,
};
