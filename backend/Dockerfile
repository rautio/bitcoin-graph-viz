# Bitcoin Graph Visualization Backend
FROM node:latest

# Create the working directory
RUN mkdir -p /home/app

# Install dependencies
ADD package.json ./
RUN npm install

# Copy source
COPY . .

# This is the open port for the API
EXPOSE 3001

# Run the production version (see package.json)
CMD ["npm", "run", "prod"]