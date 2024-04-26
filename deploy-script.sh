# remove junk
cd ./backend/
rm -rf /build 
rm -rf /node_modules
cd ..

# build front end
cd ./frontend
npm install
npm run build
mv ./build ../backend/

# build backend
cd ../backend
npm install

# start server
# npm start

