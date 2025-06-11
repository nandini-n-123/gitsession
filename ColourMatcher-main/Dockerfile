# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the static files from the build context into the Nginx HTML directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Make port 80 available to the world outside this container
EXPOSE 80