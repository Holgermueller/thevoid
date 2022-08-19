#/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -add
git commit -m 'New Deployment'
git push -f git@github.com:Holgermueller/thevoid.git master:gh-pages

cd -