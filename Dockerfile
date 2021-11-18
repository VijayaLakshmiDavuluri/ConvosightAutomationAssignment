FROM cypress/included:3.2.0
COPY package.json package.json
RUN npm install
COPY . .
RUN ls /cypress/*
