#!/bin/bash

# 빌드
npm run build

# gh-pages 브랜치 생성 및 전환
git checkout -b gh-pages

# dist 폴더의 내용을 루트로 복사
cp -r dist/* .

# 기존 파일들 제거 (dist 폴더 내용 제외)
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'assets' ! -name 'index.html' -exec rm -rf {} +

# 변경사항 커밋
git add .
git commit -m "Deploy to gh-pages"

# gh-pages 브랜치 푸시
git push origin gh-pages --force

# 원래 브랜치로 돌아가기
git checkout -

# 임시 브랜치 삭제
git branch -D gh-pages