FROM nginx:alpine

COPY . /usr/share/nginx/html

# ES Modules için doğru JS MIME type
RUN sed -i 's/application\/octet-stream/application\/javascript/' /etc/nginx/mime.types
