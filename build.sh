#!/bin/bash

DOCKER_IMAGE_NAME=game-of-life
cd backend
yarn install
cd ..
cd frontend
yarn install
npm run build
cd ..

docker build -t $DOCKER_IMAGE_NAME:latest .
