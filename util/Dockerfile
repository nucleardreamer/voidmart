FROM balenalib/amd64-debian:run

RUN install_packages dbus curl cron jq

COPY start.sh reboot.sh hostname.sh /

RUN chmod +x start.sh && \
    chmod +x reboot.sh && \
    chmod +x hostname.sh

CMD ["sh", "start.sh"]