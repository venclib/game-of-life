FROM node:6-alpine
RUN mkdir -p /backend/node_modules
COPY backend/index.js /backend/
COPY backend/node_modules/ /backend/node_modules/
COPY frontend/dist /frontend/
WORKDIR /frontend/app

CMD ["node", "/backend/index.js"]