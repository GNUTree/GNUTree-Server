# GNUTree-Server

GNUTree 프로젝트의 백엔드 코드를 관리하는 저장소입니다.

# 사용 기술

| 분류              | 이름      |
| ----------------- | --------- |
| Language          | `Node.js` |
| Backend Framework | `Express` |
| Database          | `MySQL`   |
| Package Manager   | `Npm`     |

```
GNUTree-Server
├─ .gitignore
├─ README.md
├─ config
│  ├─ baseResponseStatus.js      # Response 시의 Status들을 모아 놓은 곳.
│  ├─ database.js                # 데이터베이스 관련 설정
│  ├─ express.js                 # express Framework 설정 파일
│  ├─ jwtMiddleware.js           # jwt 관련 미들웨어 파일
│  ├─ nodemailer.js              # nodemailer 라이브러리 설정
│  ├─ regex.js                   # regex들을 모아 놓은 곳.
│  ├─ response.js                # Response 함수들을 모아 놓은 곳.
│  └─ winston.js                 # logger 라이브러리 설정
├─ index.js                   # 포트 설정 및 시작 파일
├─ package.json               # 프로그램 이름, 버전, 필요한 모듈 등 노드 프로그램의 정보를 기술
└─ src
   └─ app
      ├─ API                        # API 도메인 폴더
      │  ├─ apiController.js           # API req, res 처리
      │  ├─ apiDao.js                  # API 관련 데이터베이스
      │  ├─ apiProvider.js             # API R에 해당하는 로직 처리
      │  ├─ apiRoute.js                # API 라우터 관리
      │  └─ apiService.js              # API CUD에 해당하는 서버 로직 처리
      ├─ Tree                        # Tree 도메인 폴더
      │  ├─ treeController.js          # Tree req, res 처리
      │  ├─ treeDao.js                 # Tree 관련 데이터베이스
      │  ├─ treeMiddleware.js          # Tree 미들웨어 파일
      │  ├─ treeProvider.js            # Tree R에 해당하는 로직 처리
      │  ├─ treeRoute.js               # Tree 라우터 관리
      │  └─ treeService.js             # Tree CUD에 해당하는 서버 로직 처리
      └─ User                        # User 도메인 폴더
         ├─ userController.js          # User req, res 처리
         ├─ userDao.js                 # User 관련 데이터베이스
         ├─ userProvider.js            # User R에 해당하는 로직 처리
         ├─ userRoute.js               # User 라우터 관리
         └─ userService.js             # User CUD에 해당하는 서버 로직 처리
```
