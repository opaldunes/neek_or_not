# Lightweight base image
FROM nginx:alpine

# Copy HTML files to the web server directory
COPY index.html /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the web server
CMD ["nginx", "-g", "daemon off;"]
