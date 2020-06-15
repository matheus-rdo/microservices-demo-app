FROM nginx:alpine


COPY dist/frontend /usr/share/nginx/html

ADD entrypoint.sh entrypoint.sh
RUN chmod 755 entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
