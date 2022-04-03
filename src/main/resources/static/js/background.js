chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action=="ajaxGet"){
        $.ajax(request.data).then(sendResponse,sendResponse)
        return true //telling chrome to wait till your ajax call resolves
    }
})