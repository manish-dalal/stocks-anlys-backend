FROM nikolaik/python-nodejs:latest
USER pn
RUN mkdir -p /home/pn/app/node_modules && chown -R pn:pn /home/pn/app
WORKDIR /home/pn/app
COPY package*.json ./
COPY --chown=pn:pn . .
RUN npm install && pip install requests && python download.py
EXPOSE 4000
CMD [ "npm", "start" ]
