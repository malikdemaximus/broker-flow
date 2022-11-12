FROM node:16.14.2-stretch-slim as build-prod
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:prod

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build-prod /app/dist /usr/share/nginx/html
EXPOSE 8000