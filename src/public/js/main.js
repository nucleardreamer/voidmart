// store the current selection for details page and printing
let details = {
    name: '',
    desc: '',
    url: ''
}

// simple nav that just adds/removes a class per .page element
function goto(pageToShow) {
    console.log(pageToShow)
    $('.page').each((index, el) => {
        console.log(el)
        $(el).removeClass('show')
    })
    $(pageToShow).addClass('show')
}

// fill in the elements on the details page, store them above
function fillDetails(name, desc, url) {
    console.log(name, desc)
    details.name = name
    details.desc = desc
    details.url = url
    $('.detail .body .title').text(name)
    $('.detail .body .desc').text(desc)
    $('.detail .img img').attr('src', url)
}

function sendPrint() {
    $.post('/printit', details)
}

// refresh the page after thank you screen
function resetPage (delay) {
    setTimeout(() => {
        window.location.reload()
    }, delay)
}

// setup the sig pad on the checkout screen
let padCanvas, signaturePad;

$(document).ready(() => {
    padCanvas = document.querySelector(".pad")
    signaturePad = new SignaturePad(padCanvas, {
        minWidth: 1,
        maxWidth: 6,
    })
})

// turn off annoying stuff when you are in dev mode
if (window.DEV !== "dev") {

    // reset the page if no interactions happen
    function idleTimer() {

        function reload() {
            window.location.reload()
        }
        let t

        function resetTimer() {
            clearTimeout(t)
            t = setTimeout(reload, window.REFRESH_TIMER || 60000)
        } 

        window.addEventListener('mousemove', resetTimer, true)
        window.addEventListener('mousedown', resetTimer, true)
        window.addEventListener('touchstart', resetTimer, true)
        window.addEventListener('touchmove', resetTimer, true)
        window.addEventListener('click', resetTimer, true)
        window.addEventListener('scroll', resetTimer, true)
        window.addEventListener('wheel', resetTimer, true)
    }

    idleTimer()

    // kill right click
    document.addEventListener('contextmenu', ev => ev.preventDefault())
    
    window.onload = function() {
        var gl = Object.create(glitch_exec)
        gl.start(document.body)
    }
}