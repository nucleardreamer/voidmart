const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer')
const path = require('path')

async function printit() {
    const p = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: process.env.PRINTER_DEV_PATH || '/dev/usb/lp3',
        options: {
            timeout: 1000,
        },
        width: 42,
        characterSet: CharacterSet.PC437_USA,
        breakLine: BreakLine.WORD,
        removeSpecialCharacters: false,
        lineCharacter: '-',
    })

    const isConnected = await p.isPrinterConnected()
    console.log('Printer connected:', isConnected)

    p.setTypeFontA()
    p.alignCenter()
    await p.printImage('./public/images/logo_small.png')

    p.println(' '); p.newLine();
    p.println(' '); p.newLine();
    p.drawLine('/')
    p.println('* Thank you for shopping at VOID MART *')
    p.drawLine('/')
    p.println(' '); p.newLine();
    p.println(' '); p.newLine();

    p.alignRight()
    p.println(`Order #: ${Math.floor(Math.random() * 100000)}`)
    p.println('Timed Delivery Order')
    p.println(`Date: ${formatTime()} ${formatDate()}`)
    p.drawLine('')

    p.alignLeft()
    p.println(' '); p.newLine();
    p.println('Order:')
    p.println(' '); p.newLine();
    p.println('A 3% Increase in the Likelihood of Finding Money on the Street')
    p.println(' '); p.newLine();

    p.drawLine()
    p.table(['Subtotal', '', '', '$0.00']);
    p.table(['Total Tax', '', '', '$0.00']);
    p.table(['Service Fee', '', '', '$0.00']);
    p.drawLine()

    p.bold(true)
    p.table(['Total', '', '', '$0.00']);
    p.bold(false)

    p.println('')
    p.println('')
    p.println(' '); p.newLine();
    p.println(' '); p.newLine();
    p.println(' '); p.newLine();
    p.newLine()
    p.alignCenter()
    await p.printImage('./public/images/separator1.png')
    p.println('** You FREE fortune **')
    p.println(' '); p.newLine();

    p.bold(true)
    p.println('"The shadows of your digital footprint will echo in the halls of eternity."')
    p.bold(false)
    p.setTextSize(0,0)
    await p.printImage('./public/images/separator1.png')

    p.println(' '); p.newLine();
    p.println(' '); p.newLine();
    p.println(' '); p.newLine();

    p.println(' '); p.newLine();
    p.println('PLEASE RETAIN THIS FOR YOUR RECORDS.')
    p.println(' '); p.newLine();

    p.alignLeft()
    p.println('Please note that all transactions are final. Due to the unique nature of our products and services, refunds, returns, or exchanges cannot be accommodated. We appreciate your understanding and are confident you will enjoy your purchase. Should you have any questions or concerns, our customer support team will not be available to assist you.')
    p.println(' '); p.newLine();
    p.cut()

    console.log(p.getText())

    try {
        await p.execute()
        console.log('Print success.')
    } catch (error) {
        console.error('Print error:', error)
    }
}

function formatTime() {
    const date = new Date();

    let hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const formattedTime = `${hours}:${formattedMinutes} ${period}`

    return formattedTime
}

function formatDate() {

    const date = new Date();
    
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()
    
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
}

printit()