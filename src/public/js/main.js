let details = {
    name: '',
    desc: '',
    url: ''
}

async function initRefreshTimer()
{
    window.ref = setInterval(function() {
        refreshIt()
    }, window.REFRESH_TIMER)
}

async function refreshIt()
{
    location.reload()
    clearInterval(window.ref)
    initRefreshTimer()
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

function resetPage (delay) {
    setTimeout(() => {
        window.location.reload()
    }, delay)
}

let padCanvas, signaturePad;

$(document).ready(() => {
    padCanvas = document.querySelector(".pad")
    signaturePad = new SignaturePad(padCanvas, {
        minWidth: 1,
        maxWidth: 6,
    })
})

if (window.DEV !== "dev") {

    // kill right click
    document.addEventListener('contextmenu', ev => ev.preventDefault())
    
    window.onload = function() {
        var gl = Object.create(glitch_exec)
        gl.start(document.body)
    }
    // initRefreshTimer()
}
