FROM cypress5.6.0
COPY package.json package.json
RUN npm install
RUN npm run pretest
COPY . .
RUN ls /cypress/*