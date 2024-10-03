# voidmart

This project is called "Void Mart". It lives inside an industrial self-serve shopping kiosk. The experience is my take on Faust and Mephistopheles (the classic "make a deal/pact with the devil" trope), but a crappy automated chuck-e-cheese prize counter version...

There are 15 different "items" to choose from, powers/abilities ranging from "Always Find a Parking Spot" to "Avoid Small Talk at a Party". One item per customer, for the low low price of `One Fraction of Your Intangible Essence". The terms and conditions are explicit, and you get a printed receipt of your transaction when you are finished.

<img src="https://raw.githubusercontent.com/nucleardreamer/voidmart/main/voidmart.jpg" width="200">

## Installing

This repo contains submodules, its best to do a `git clone --recursive` when you are cloning for the first time.

## Hardware

The printer code is specific to the [Epson TM-T88V-I (M265A)](https://epson.com/For-Work/POS-System-Devices/POS-Printers/OmniLink-TM-T88VI-Single-station-Thermal-Receipt-Printer/p/C31CE94061).

The printer often changes devices paths in `/dev` when the machine is unplugged (not shut down properly). I wrote UDEV rules that are hard coded to the productID and vendorID. If you brands of printers are switched, these rules need to be changed to match the new IDs in `src/49-printer-symlink.rules`.

## Containers

The `docker-compose.yml` is setup to be mostly specific to the balena platform, but should run on any machine without the `util` container.

- `voidmart`: The main app, express server that serves the front end and talks to the printer
- `browser`: Runs small chromium and hosts its own xserver
- `wifi-connect`: Spins up an access point with configuration when it loses wifi (not needed totally, but handy)
- `util`: Sets the machine hostname via balena supervisor API, and runs a nightly restart cron

## Environment variables

- ENABLE_GPU: 1
- GLITCH_COUNT: 6
- GLITCH_DELAY: 50
- GLITCH_MAX: 60000
- GLITCH_MIN: 500
- ENABLE_GLITCH: false
- KIOSK: 1
- LAUNCH_URL: http://127.0.0.1:8080/
- PORT: 8080
- NODE_ENV: production
- PERSISTENT: 0
- PRINTER_DEV_PATH: /dev/usb/lp3
- REFRESH_TIMER: 60000
- ROTATE_DISPLAY: left
- SHOW_CURSOR: 0
- SET_HOSTNAME: voidmart
- PORTAL_SSID: voidmart
- REDIS_URI: rediss://******
- REDIS_CONNECT_RETRY: 20