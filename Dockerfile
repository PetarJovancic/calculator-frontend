FROM node:20.11.1 as build-stage

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

FROM nginx:1.21.6-alpine as production-stage

COPY --from=build-stage /frontend/build /usr/share/nginx/html

ARG REACT_DOCKER_PORT=80
EXPOSE $REACT_DOCKER_PORT

CMD ["nginx", "-g", "daemon off;"]
