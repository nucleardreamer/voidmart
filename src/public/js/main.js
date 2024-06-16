// refresh timer

let details = {
    name: '',
    desc: ''
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

function fillDetails(name, desc) {
    console.log(name, desc)
    details.name = name
    details.desc = desc
    $('.detail .title').text(name)
    $('.detail .desc').text(desc)
}

function something() {
    console.log(arguments)
}

if (window.DEV !== "dev") {
    // initRefreshTimer()
    window.onload = function() {
        var gl = Object.create(glitch_exec);
        gl.start(document.body);
    }
}
