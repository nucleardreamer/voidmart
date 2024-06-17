# voidmart

What is it? A kiosk. What does it do? You will have to find out. Where am I going with this? Wherever the wind blows.

## Installing

This repo contains submodules, its best to do a `git clone --recursive` when you are cloning for the first time.

## Hardware

The printer code is specific to the [Epson TM-T88V-I (M265A)](https://epson.com/For-Work/POS-System-Devices/POS-Printers/OmniLink-TM-T88VI-Single-station-Thermal-Receipt-Printer/p/C31CE94061).

The printer often changes devices paths in `/dev` when the machine is unplugged (not shut down properly). I wrote UDEV rules that are hard coded to the productID and vendorID. If you brands of printers are switched, these rules need to be changed to match the new IDs in `src/49-printer-symlink.rules`.

## Environment variables

- ENABLE_GPU: 1
- GLITCH_COUNT: 6
- GLITCH_DELAY: 50
- GLITCH_MAX: 60000
- GLITCH_MIN: 500
- ENABLE_GLITCH: false
- KIOSK: 1
- LAUNCH_URL: http://localhost/
- NODE_ENV: production
- PERSISTENT: 0
- PORT: 80
- PRINTER_DEV_PATH: /dev/usb/lp3
- REFRESH_TIMER: 60000
- ROTATE_DISPLAY: left
- SHOW_CURSOR: 0