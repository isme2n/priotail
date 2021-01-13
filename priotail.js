
const BASE_URL = 'https://happy-wilson-dcd15d.netlify.app/'

function getQueryString() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

function priotail() {
    if(priotail_tag) {
        var priotail_shop = getQueryString('pt_shop')
        var priotail_productNo = getQueryString('product_no')
        var priotail_tag = getQueryString('pt_tag')

        var pt_frame = document.createElement("iframe");
        pt_frame.id = 'iframe_priotail_section'
        pt_frame.src = `${BASE_URL}${priotail_shop}/${priotail_productNo}/${priotail_tag}`
        pt_frame.style = 'position: relative; display: block; width: 100%; box-sizing: border-box; border-radius: 0px;'

        var element = document.getElementById("priotail_section");
        element.appendChild(pt_frame);

        window.addEventListener("message", function(e) {
            if(e.data.messageFrom == "priotail"){
                document.getElementById("iframe_priotail_section").height = (document.getElementById("priotail_section").offsetWidth * e.data.ratio) + 10;
            }
        });
    }
}

if (document.readyState == 'complete') {
    priotail();
} else {
    window.addEventListener('load', priotail);
}
