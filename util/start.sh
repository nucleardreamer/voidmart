#!/bin/bash

./hostname.sh

(crontab -l 2>/dev/null;echo "0 0 * * * /reboot.sh") | crontab -u root -

balena-idle