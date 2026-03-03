#!/bin/sh

echo "1️⃣ start web server" 
node app/typescript/src/main.js &
echo "2️⃣ start ascii server" 
exec app/rust/ascii-server
