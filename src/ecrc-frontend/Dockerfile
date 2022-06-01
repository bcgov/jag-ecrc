FROM node:16-alpine as build

WORKDIR /app

COPY ./package*.json ./

ENV NODE_ENV=production

RUN npm ci \
    && npm add --dev react-app-rewired # this line makes sure that react-app-rewired scripts will be in the PATH. It can
                                              # be removed when the react-app-rewired module is no longer required to the project.
COPY . .

RUN npm run build

CMD ["npm","run","start"]

##############################################################################################
####                                 PRODUCTION IMAGE                                      ###
##############################################################################################
FROM nginx:1.21-alpine

RUN rm -rf /usr/share/nginx/html/
COPY --from=build --chown="nginx:nginx" /app/build /usr/share/nginx/html

WORKDIR /etc/nginx/html/ecrc

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown :nginx g+rwx /var/cache/nginx /var/log/nginx

EXPOSE 8080
USER nginx

CMD ["nginx", "-g", "daemon off;"]



