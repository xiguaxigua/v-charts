#!/usr/bin/env sh

set -e
npm run docs:build
cd docs/.vuepress/dist

# echo 'v-charts.js.org' > CNAME TODO: open while deploy

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:vue-echarts/vue-echarts.github.io.git master
# git push -f git@github.com:ElemeFE/v-charts.git master:gh-pages TODO: open while deploy

cd -
