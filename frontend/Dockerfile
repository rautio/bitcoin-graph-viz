# Bitcoin Graph Visualization Frontend
FROM nginx:alpine

# Create the working directory
RUN mkdir -p /home/app

# Install dependencies
ADD package.json ./
RUN npm install

# Build the source code
RUN npm run prod

# Copy source
COPY . .

# This is the open port
EXPOSE 80

# Run the nginx server