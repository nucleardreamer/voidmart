// refresh timer

async function initRefreshTimer()
{
    window.ref = setInterval(function() {
        refreshIt()
    }, window.refreshTimer)
}
async function refreshIt()
{
    location.reload()
    clearInterval(window.ref)
    initRefreshTimer()
}

initRefreshTimer()
