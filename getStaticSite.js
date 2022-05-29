// This snippet is intended to be run in browser DevTools to update the static site at /public/index.html.
(async () => {
    function removeAllTags(htmlCollection) {
        while (htmlCollection.length !== 0) {
            htmlCollection[0].remove();
        }
    }

    // Prepare document for extraction by removing and replacing what's not needed
    removeAllTags(document.getElementsByTagName("script"));
    removeAllTags(document.getElementsByTagName("noscript"));
    const toolboxCards = document.getElementsByClassName("ToolBox-Card");
    for (let i = 0; i < toolboxCards.length; i++) {
        const toolName = toolboxCards[i].getElementsByTagName("h2")[0].innerText;
        toolboxCards[i].getElementsByTagName("p")[0].innerText = `To use the ${toolName}, please enable JavaScript.`;
    }
    // Remove leftover form elements from Format Checker
    while (toolboxCards[1].children[2] != null) {
        toolboxCards[1].children[2].remove();
    }

    let rawDocument = "<!DOCTYPE html><html lang=\"en\">";
    const extractedHead = document.createElement("head");
    for (let i = 0; i < document.head.children.length; i++) {
        if (document.head.children[i].tagName.toLowerCase() === "link" && document.head.children[i].rel === "stylesheet") {
            // We need to extract the stylesheet since its href can change in the future
            const response = await fetch(document.head.children[i].href);
            const blob = await response.blob();
            const cssText = await blob.text();
            const extractedStyle = document.createElement("style");
            extractedStyle.innerText = cssText;
            // Remove source mapping comment
            extractedStyle.innerText = extractedStyle.innerText.replace(new RegExp('\\/\\*[^*]*\\*+([^/*][^*]*\\*+)*\\/', 'gm'), "")
            extractedHead.appendChild(extractedStyle);
        } else {
            let outerHTML = document.head.children[i].outerHTML;
            // We need to revert the public URL part back to the template placeholder
            outerHTML = outerHTML.replace("/rfc3339-iso8601", "%PUBLIC_URL%");
            extractedHead.innerHTML += outerHTML;
        }
    }
    rawDocument += extractedHead.outerHTML;
    rawDocument += document.body.outerHTML;
    rawDocument += "</html>";
    const documentBlob = new Blob([rawDocument], {
        type: "text/html"
    });
    const virtualLink = document.createElement("a");
    virtualLink.download = "index.html";
    virtualLink.href = URL.createObjectURL(documentBlob);
    virtualLink.click();
    // We don't need the rather large URL around in memory after the "click"
    URL.revokeObjectURL(virtualLink.href);
})();
