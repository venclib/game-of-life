FROM node:6-alpine
COPY backend/ /backend/
COPY frontend/dist /frontend/
WORKDIR /frontend/app

CMD ["node", "/backend/index.js"]