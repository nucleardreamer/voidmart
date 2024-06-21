#!/bin/bash

PRINTER="/dev/epson"

check_printer_access() {
    if [ ! -w "$PRINTER" ]; then
        echo "Error: Cannot access $PRINTER. Make sure you have the right permissions."
        exit 1
    fi
}

get_printer_status() {
    # referenced here: https://download4.epson.biz/sec_pubs/pos/reference_en/escpos/dle_eot.html
    echo -en '\x10\x04\x04' > "$PRINTER"
    sleep 0.1
    response=$(xxd -b "$PRINTER" | head -n 1 | awk '{print $2}')
    echo "$response"
}

interpret_status() {
    local binary="$1"
    
    echo "Binary status: $binary"
    
    # check bits 2 and 3 for roll paper near-end sensor
    near_end="${binary:2:2}"
    case "$near_end" in
        "00") echo "NEAR-end sensor: paper adequate" ;;
        "11") echo "NEAR-end sensor: paper near-end" ;;
        *) echo "NEAR-end sensor: unknown status ($near_end)" ;;
    esac
    
    # check bits 5 and 6 for roll paper end sensor
    paper_end="${binary:5:2}"
    case "$paper_end" in
        "00") echo "END sensor: paper present" ;;
        "11") echo "END sensor: paper not present" ;;
        *) echo "END sensor: unknown status ($paper_end)" ;;
    esac
}

check_printer_access
status=$(get_printer_status)
interpret_status "$status"