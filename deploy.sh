#!/usr/bin/env sh

set -e

cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ZhahaSy/vue-source-read.git master:gh-pages

cd -