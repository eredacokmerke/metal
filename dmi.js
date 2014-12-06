var dmi_input_div = document.getElementById("dmi-input-div");
var dmi_items_div = document.getElementById("dmi-items-div");
var dmi_items = document.getElementById("dmi-items");
var listeElemani = dmi_items.getElementsByTagName("li");
var output = document.createElement("output");
var dmi_input = document.getElementById("dmi-input");
var ilkInput = 0; //input alanına tıklandığı zaman yazı silinecek mi
output.style.cursor = "pointer";
dmi_items_div.style.display = "none";
dmi_items.style.listStyle = "none";
dmi_items.style.padding = "0";

//liste haricine tıklanırsa liste kapanacak
window.onclick = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var id = target.parentNode.id;
    if (target.parentNode.id !== "dmi-input-div" && target.parentNode.id !== "dmi-items") {
        listeyiKapat();
    }
};

//listeden seçim yapıldı
dmi_items.addEventListener("click", function (e) {
    dmi_input.value = e.target.innerHTML;
    listeyiKapat();
    ilkInput = 1;
});

//input a tıklandı. ilk tıklamaysa input silinecek
dmi_input.addEventListener("click", function () {
    if (ilkInput === 0) {
        ilkInput = 1;
        dmi_input.value = "";
    }
});

//input a yazı yazıldı
dmi_input.addEventListener("input", function () {
    var i;
    var sonucVar = 0;
    ilkInput = 1;

    for (i = 0; i < listeElemani.length; i++) {
        var yazi = yaziyiGetir(listeElemani[i]);

        if (yazi.toLowerCase().indexOf(dmi_input.value.toLowerCase()) === -1) {
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
dmi_input_div.appendChild(output);

//iç etiketlerden yazıları getirir
function yaziyiGetir(eleman) {
    var a = 0;
    var icElemanSayisi = eleman.children.length;
    var yazi = "";

    if (icElemanSayisi === 0) {
        yazi = eleman.innerHTML;
    } else {
        for (a = 0; a < icElemanSayisi; a++) {
            yazi = yazi + yaziyiGetir(eleman.children[a]);
        }
    }
    return yazi;
}

function listeyiKapat() {
    dmi_items_div.style.display = "none";
    output.innerHTML = "\u25BC";
}

function listeyiAc() {
    dmi_items_div.style.display = "inline";
    output.innerHTML = "\u25B2";
}
