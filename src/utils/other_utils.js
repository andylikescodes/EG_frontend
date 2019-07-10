// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
// function copyToClipboard(text) {
//     if (window.clipboardData && window.clipboardData.setData) {
//         // IE specific code path to prevent textarea being shown while dialog is visible.
//         return clipboardData.setData("Text", text);

//     } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
//         var textarea = document.createElement("textarea");
//         textarea.textContent = text;
//         textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
//         document.body.appendChild(textarea);
//         textarea.select();
//         try {
//             return document.execCommand("copy");  // Security exception may be thrown by some browsers.
//         } catch (ex) {
//             console.warn("Copy to clipboard failed.", ex);
//             return false;
//         } finally {
//             document.body.removeChild(textarea);
//         }
//     } else {
//         return "fail"
//     }
// }
/**
 * Copy a string to clipboard
 * @param  {String} string         The string to be copied to clipboard
 * @return {Boolean}               returns a boolean correspondent to the success of the copy operation.
 */
function copyToClipboard(string) {
    let textarea;
    let result;
  
    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = string;
  
      document.body.appendChild(textarea);
  
      textarea.focus();
      textarea.select();
  
      const range = document.createRange();
      range.selectNodeContents(textarea);
  
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  
      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      document.body.removeChild(textarea);
    }
  
    // manual copy fallback using prompt
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
      if (!result) {
        return "fail";
      }
    }
    return true;
  }

  function iOS() {

    var iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];
  
    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }
  
    return false;
  }
// function iosCopyToClipboard(el) {
//     var oldContentEditable = el.contentEditable,
//         oldReadOnly = el.readOnly,
//         range = document.createRange();

//     el.contentEditable = true;
//     el.readOnly = false;
//     range.selectNodeContents(el);

//     var s = window.getSelection();
//     s.removeAllRanges();
//     s.addRange(range);

//     el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

//     el.contentEditable = oldContentEditable;
//     el.readOnly = oldReadOnly;

//     document.execCommand('copy');
// }
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

export {
    copyToClipboard,
    downloadURI,
    iOS
    //iosCopyToClipboard
}
