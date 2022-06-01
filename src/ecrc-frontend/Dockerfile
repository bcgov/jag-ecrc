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

COPY --from=build /app/build /usr/share/nginx/html/criminalrecordcheck
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


