# 과제 일지

## 25.03.23

- [ ] 요구사항 읽어보기
- [ ] 테스트 코드 훑어보기
- [ ] 지식 뭉치 읽어보기

## 25.03.22

- [x] 배포 먼저 하기
- [x] push 된 변경사항 감지해서 deploy 하는 브랜치 main 설정
- [x] permissions contents: write 설정하고 PERSOAL_TOKEN 에서도 권한 설정해주기
- [x] 빌드 과정 명령어 입력해주기: 체크아웃 - 패키지 설치 - 빌드 - 배포
- [x] 이때, 배포 단계에서 secret 에 입력해둔 PERSOAL_TOKEN 키로 가져오기
- [x] actions 빌드 후 assets 참조할 수 있도록 vite config base 속성 상대 경로 설정하기
- [x] 배포 성공

### 에러 로그

```
Warning: This action runs on a fork and not found auth token, Skip deployment
```

- [x] auth token 발견 못해서 배포 건너뛴 문제 발생 (즉, PERSOAL_TOKEN 키를 명시하지 않으면 생기는 문제)

```
Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

- [x] PERSONAL_TOKEN 에 설정된 권한 중 content: write 권한이 없으면 생기는 문제

```Setup auth token
[INFO] setup GITHUB_TOKEN
Error: Action failed with "You deploy from main to main
This operation is prohibited to protect your contents
```

- [x] 굳이 publish_branch: main 지정하면 main->main 브랜치로 배포해서 생긴 문제 발생, 지정해줄 필요없음.

### 궁금한 것

- [ ] playwright이 뭐지?

### 배운 것

#### yaml 과 github actions

- ci.yml 파일과 구분하여 deploy.yml 파일 작성하기
- yml 컨벤션 잘 지켜서 작성하기: 하이픈, uses, run 등
- workflow_dispatch 하면 워크플로우 볼 수 있음.

### 질문할 것

- [ ] 배포 주소 하이픈 수정하나? `_` -> `-`
