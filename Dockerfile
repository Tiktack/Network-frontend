FROM node:latest as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

#Stage 2 - the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]