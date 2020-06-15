#! /bin/bash
cd frontend
npm run build
cd ..
rm -rf ./server/public
cp -R ./frontend/build ./server/public
