FROM node:8
ENV NETWORK_TYPE DEFAULT_NETWORK_TYPE
ENV NPM_CONFIG_LOGLEVEL warn
ARG RELEASE=latest

RUN apt update && \
    apt install -y python make g++ git build-essential && \
    npm install -g pm2@2.7.1 && \
    mkdir /app
WORKDIR /app

RUN npm install -g chronobank-middleware --unsafe
RUN mkdir src && cd src && \
    dmt init && \
    dmt install middleware-check-bot"#$RELEASE" \
CMD pm2-docker start /mnt/config/${NETWORK_TYPE}/ecosystem.config.js
