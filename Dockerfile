FROM	node:7.2
RUN apt-get update && apt-get install -y ruby ruby-dev && npm install -g grunt
RUN gem install sass && gem install compass
WORKDIR /home/dev/code
COPY . tmp
RUN cd tmp; npm install && grunt prod
RUN cp -r tmp/build build && cp tmp/server.js . && cp tmp/package.json .
RUN rm -r tmp && npm install --only=production
CMD ["node", "server.js"]
EXPOSE 3000
