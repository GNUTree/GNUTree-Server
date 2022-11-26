// 전체 장식품 조회
async function selectDecorations(connection, treeIdx) {
  const selectDecorationListQuery = `
                SELECT nickname, imageUrl
                  FROM Decoration
                 WHERE treeIdx = ?;
                `;
  const [decorationListRow] = await connection.query(
    selectDecorationListQuery,
    treeIdx
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

async function selectTreeIdx(connection, userIdx) {
  const selectTreeIdxQuery = `
                SELECT Tree.idx
                  FROM Tree
                  JOIN User
                    ON Tree.idx = ?
                `;
  const [treeIdxRow] = await connection.query(selectTreeIdxQuery, userIdx);

  return treeIdxRow[0];
}

module.exports = {
  selectDecorations,
  selectUserIdx,
  selectTreeIdx,
};
