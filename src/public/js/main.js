let details = {
    name: '',
    desc: '',
    url: ''
}

function resetPage (delay) {
    setTimeout(() => {
        window.location.reload()
    }, delay)
}

function goto(pageToShow) {
    console.log(pageToShow)
    $('.page').each((index, el) => {
        console.log(el)
        $(el).removeClass('show')
    })
    $(pageToShow).addClass('show')
}

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

let padCanvas, signaturePad;

$(document).ready(() => {
    padCanvas = document.querySelector(".pad")
    signaturePad = new SignaturePad(padCanvas, {
        minWidth: 1,
        maxWidth: 6,
    })
})

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
    window.addEventListener('keydown', resetTimer, true)
    window.addEventListener('scroll', resetTimer, true)
    window.addEventListener('wheel', resetTimer, true)
}

idleTimer()

if (window.DEV !== "dev") {

    // kill right click
    document.addEventListener('contextmenu', ev => ev.preventDefault())
    
    window.onload = function() {
        var gl = Object.create(glitch_exec)
        gl.start(document.body)
    }
    // initRefreshTimer()
}