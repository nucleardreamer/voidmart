FROM balenalib/amd64-debian:run

RUN install_packages dbus curl cron jq

COPY scripts/ /scripts/

RUN chmod 0744 /scripts/*.sh

CMD ["sh", "/scripts/start.sh"]