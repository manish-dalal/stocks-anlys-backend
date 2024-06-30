FROM nikolaik/python-nodejs:latest
USER pn
RUN mkdir -p /home/pn/app/node_modules && chown -R pn:pn /home/pn/app
WORKDIR /home/pn/app
COPY package*.json ./
RUN npm install && pip install requests
COPY --chown=pn:pn . .
EXPOSE 4000
CMD [ "npm", "start" ]
