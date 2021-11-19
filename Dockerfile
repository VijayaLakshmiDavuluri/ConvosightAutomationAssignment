FROM cypress/included:9.0.0
COPY package.json package.json
RUN npm install
COPY . .
RUN npx cypress run
