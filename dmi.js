var dmi_input_div = document.getElementById("dmi-input-div");
var dmi_items_div = document.getElementById("dmi-items-div");
var dmi_items = document.getElementById("dmi-items");
var listeElemani = dmi_items.getElementsByTagName("li");
var output = document.createElement("output");
var input = document.createElement("input");

output.style.cursor = "pointer";
dmi_items_div.style.display = "none";
dmi_items.style.listStyle = "none";
dmi_items.style.padding = "0";
input.id = "dmi-input2";

//liste haricine tıklanırsa liste kapanacak
window.onclick = function (e) {
    var target = event.target || event.srcElement;
    var id = target.parentNode.id;
    if (target.parentNode.id !== "dmi-input-div" && target.parentNode.id !== "dmi-items") {
        listeyiKapat();
    }
}

//listeden seçim yapıldı
dmi_items.addEventListener("click", function (e) {
    input.value = e.target.innerHTML;
    listeyiKapat();
});

//input a yazı yazıldı
input.addEventListener("input", function () {
    var i;
    var sonucVar = 0;

    for (i = 0; i < listeElemani.length; i++) {
        if (listeElemani[i].innerHTML.indexOf(input.value) === -1) {
            listeElemani[i].style.opacity = 0;
            listeElemani[i].style.display = "none";
        } else {
            listeElemani[i].style.opacity = 1;
            listeElemani[i].style.display = "";
            sonucVar = 1;
        }

        if (sonucVar === 1) {
            listeyiAc();
        } else {
            listeyiKapat();
        }
    }
});

var node = document.createTextNode('\u25BC');
//tuşa basıldı
output.addEventListener("click", function () {
    if (dmi_items_div.style.display === "none") {
        listeyiAc();
    } else {
        listeyiKapat();
    }
});

output.appendChild(node);
dmi_input_div.appendChild(input);
dmi_input_div.appendChild(output);

function listeyiKapat() {
    dmi_items_div.style.display = "none";
    output.innerHTML = "\u25BC";
}

function listeyiAc() {
    dmi_items_div.style.display = "inline";
    output.innerHTML = "\u25B2";
}

