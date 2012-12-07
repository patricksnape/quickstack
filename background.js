function copy(str) {
    var sandbox = $('#clipboard').val(str).select();
    document.execCommand('copy');
    sandbox.val('');
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    copy(request);
});