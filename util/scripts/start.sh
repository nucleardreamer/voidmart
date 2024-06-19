#!/bin/bash

/scripts/hostname.sh

(crontab -l 2>/dev/null;echo "0 0 * * * /scripts/reboot.sh > /proc/1/fd/1 2>/proc/1/fd/2") | crontab -u root -

exec cron -f