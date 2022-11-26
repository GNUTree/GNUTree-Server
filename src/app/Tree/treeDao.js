// 전체 장식품 조회
async function selectDecorations(connection, userIdx) {
  const selectDecorationListQuery = `
                SELECT nickname, imageUrl
                  FROM Decoration
                 WHERE userIdx = ? AND status = "NORMAL";
                `;
  const [decorationListRow] = await connection.query(
    selectDecorationListQuery,
    userIdx
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

module.exports = {
  selectDecorations,
  selectUserIdx,
};
