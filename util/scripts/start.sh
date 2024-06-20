#!/bin/bash

/scripts/hostname.sh

# midnight pst, machine is UTC
(crontab -l 2>/dev/null;echo "0 7 * * * /scripts/reboot.sh > /proc/1/fd/1 2>/proc/1/fd/2") | crontab -u root -

exec cron -f