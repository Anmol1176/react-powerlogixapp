FROM node:20.12.0

# Create a directory for our application in the container 
RUN mkdir -p /usr/src/mantis_free_react_admin_template_main

# Set this new directory as our working directory for subsequent instructions
WORKDIR /usr/src/mantis_free_react_admin_template_main

# Copy all files in the current directory into the container
COPY . .

# Set the PYTHONPATH environment variable, which is occasionally necessary for certain node packages
# 'PWD' is an environment variable that stores the path of the current working directory
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

# Set the environment variable for the application's port
# (Be sure to replace '4200' with your application's specific port number if different)
ENV PORT 8080

# Install 'serve', a static file serving package globally in the container
RUN npm install -g serve

# Install all the node modules required by the React app
RUN npm install
# Build the React app
RUN npm run build

# Serve the 'build' directory on port 4200 using 'serve'
CMD ["serve", "-s", "-l", "8080", "./build"]