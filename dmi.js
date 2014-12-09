var INDEKS = "indeks";
var dmi_div = document.getElementsByClassName("dmi-div");
var dmiSayisi = dmi_div.length;
var dmi_input_div = document.getElementsByClassName("dmi-input-div");
var dmi_items_div = document.getElementsByClassName("dmi-items-div");
var dmi_items = document.getElementsByClassName("dmi-items");

var ilkInput = [];
var listeElemanlari = [];
var outputlar = [];

for (var indeks = 0; indeks < dmiSayisi; indeks++) {
    var listeElemani = dmi_items[indeks].getElementsByTagName("li");
    var output = document.createElement("output");
    var dmi_input = document.getElementsByClassName("dmi-input");
    listeElemanlari.push(listeElemani);
    ilkInput.push(0); //input alanına tıklandığı zaman yazı silinecek mi
    output.setAttribute(INDEKS, indeks);
    output.style.cursor = "pointer";
    var node = document.createTextNode('\u25BC');
    output.appendChild(node);
    outputlar.push(output);
    dmi_input_div[indeks].appendChild(output);
    dmi_items_div[indeks].style.display = "none";
    dmi_items[indeks].style.listStyle = "none";
    dmi_items[indeks].style.padding = "0";
    dmi_input[indeks].setAttribute(INDEKS, indeks);
    dmi_items[indeks].setAttribute(INDEKS, indeks);

    //listeden seçim yapıldı
    dmi_items[indeks].addEventListener("click", function (e) {
        var ii = this.getAttribute(INDEKS);
        dmi_input[ii].value = e.target.innerHTML;
        listeyiKapat(ii);
        ilkInput[ii] = 1;
    });

    //input a tıklandı. ilk tıklamaysa input silinecek
    dmi_input[indeks].addEventListener("click", function () {
        var ii = this.getAttribute(INDEKS);
        if (ilkInput[ii] === 0) {
            ilkInput[ii] = 1;
            dmi_input[ii].value = "";
        }
    });

    //input a yazı yazıldı
    dmi_input[indeks].addEventListener("input", function () {
        var ii = this.getAttribute(INDEKS);
        var sonucVar = 0; //listeyi açıp kapatabilmek için
        ilkInput[ii] = 1;
        var liste = listeElemanlari[ii];

        for (var i = 0; i < liste.length; i++) {
            var yazi = yaziyiGetir(liste[i]);

            if (yazi.toLowerCase().indexOf(dmi_input[ii].value.toLowerCase()) === -1) {
                liste[i].style.opacity = 0;
                liste[i].style.display = "none";
            } else {
                liste[i].style.opacity = 1;
                liste[i].style.display = "";
                sonucVar = 1;
            }

            if (sonucVar === 1) {
                listeyiAc(ii);
            } else {
                listeyiKapat(ii);
            }
        }
    });

    //tuşa basıldı
    output.addEventListener("click", function () {
        var ii = this.getAttribute(INDEKS);
        if (dmi_items_div[ii].style.display === "none") {
            listeyiAc(ii);
        } else {
            listeyiKapat(ii);
        }
    });
}

//liste haricine tıklanırsa liste kapanacak
window.onclick = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var id = target.parentNode.id;
    if (target.parentNode.className !== "dmi-input-div" && target.parentNode.className !== "dmi-items") {
        listeleriKapat();
    }
};

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

function listeleriKapat() {
    for (var i = 0; i < dmiSayisi; i++) {
        dmi_items_div[i].style.display = "none";
        outputlar[i].innerHTML = "\u25BC";
    }
}

function listeyiKapat(ind) {
    dmi_items_div[ind].style.display = "none";
    outputlar[ind].innerHTML = "\u25BC";
}

function listeyiAc(ind) {
    dmi_items_div[ind].style.display = "inline";
    outputlar[ind].innerHTML = "\u25B2";
}

