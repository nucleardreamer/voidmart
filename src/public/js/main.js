// refresh timer

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

initRefreshTimer()

window.onload = function() {
    var gl = Object.create(glitch_exec);
    gl.start(document.body);
}
