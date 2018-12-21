// Dump text in toCopy into clipboard
function copyToClipboard(toCopy) {

    // Id of temporary form element for the selection and copy
    var hiddenTextAreaId = "_CopyButtonTextArea_";

    // Get scrollbar position to restore it afterwards
    var scrollPos = window.scrollY;

    // Create hidden text element
    var hid = document.createElement("textarea");
    hid.id = hiddenTextAreaId;
    document.getElementsByTagName("body")[0].appendChild(hid);

    hid.textContent = toCopy;

    // Select the content
    hid.focus();
    hid.setSelectionRange(0, toCopy.length);

    // Copy the selection
    document.execCommand("copy");

    // Clear temporary content
    document.getElementById(hiddenTextAreaId).remove()

    // Restore scrollbar position
    window.scrollTo(0, scrollPos)
}

window.onload = function () {

    var buttonId = '_copyButton_';
    var button = null;
    var offset = null

    let preElements = document.getElementsByTagName('pre');

    for (let index = 0; index < preElements.length; index++) {
        const element = preElements[index];

        element.onmouseenter = function () {

            if (!button) {

                button = document.createElement("button");

                button.textContent = "Copy";
                button.classList.add(buttonId);

                // CSS is copied from .post-tag class, to ensure proper style when stylish is present
                // Not just cloned, because there are too many properties that trip up jquery
                // Button isn't just enclased as post-tag, to make sure nothing interferes with positioning

                let copycat = document.querySelector('span.post-tag');
                let copycatStyle = getComputedStyle(copycat)

                // button.style.display = 'none';
                button.style.opacity = "0";
                button.style.transition = '0.2s';
                button.style.position = 'absolute';
                button.style.cursor = 'pointer';
                button.style.margin = '0px';
                button.style.padding = copycatStyle.padding;
                button.style.color = copycatStyle.color;
                button.style["font-size"] = copycatStyle["font-size"];
                button.style["font-family"] = copycatStyle["font-family"];
                button.style.backgroundColor = copycatStyle.backgroundColor;
                button.style["border-color"] = copycatStyle["border-color"];
                button.style["border-width"] = copycatStyle["border-width"];
                button.style["border-style"] = copycatStyle["border-style"];
                button.style["border-radius"] = copycatStyle["border-radius"];

                // Calculating button width
                // Element needs to be present in DOM to calculate it's width
                // I blame Hakon Wium Lie
                document.getElementsByTagName("body")[0].appendChild(button);
                offset = button.clientWidth;
                button.remove();

                // For some reason, offset is still too low. I blame W3C.
                offset += 30;
            }

            // Calculating the right position for the button to appear
            var pos = element.clientWidth - offset;

            // Button is cloned, so jquery won't trip up, and then moved
            // var clone = button.cloneNode(true)

            element.insertBefore(button, element.firstChild);

            button.style["margin-left"] = pos + "px"

            // Setting click event
            button.onclick = function (e) {
                var toCopy = element.querySelector("code").textContent;
                copyToClipboard(toCopy);
            }

            setTimeout(() => {
                element.getElementsByTagName("button")[0].style.opacity = "1"
            }, 1)
            // button.style.display = "block"
        }

        element.onmouseleave = function () {
            button.style.opacity = "0"
            // button.style.display = "none"
            setTimeout(() => {
                element.getElementsByClassName(buttonId)[0].remove()
            }, 200)
        }
    }

}
