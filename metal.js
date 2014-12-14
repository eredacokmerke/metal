var INDEKS = "indeks";
var INPUT_DIV = "metal-input-div";
var OUTPUT_DIV = "metal-output-div";
var INPUT = "metal-input";
var POINTER = "metal-pointer";
var TEXT = "metal-text";
var ITEMS = "metal-items";
var ISARET_AC = "\u25BC";
var ISARET_KAPA = "\u25B2";
var metal_div = document.getElementsByClassName("metal-div");

function metalDiv(type, isaret, liste, secenek, icerik, ilkInput) {
    this.type = type;
    this.isaret = isaret;
    this.liste = liste;
    this.secenek = secenek; //liste+secenek
    this.icerik = icerik;
    this.ilkInput = 1;
}

var metalDivList = [];

for (var indeks = 0; indeks < metal_div.length; indeks++) {
    var secenek = metal_div[indeks].children[0]; //input-div
    var liste = metal_div[indeks].children[1]; //items-div
    liste.setAttribute(INDEKS, indeks);

    if (secenek.className === INPUT_DIV) {
        var input = document.createElement("input");
        input.setAttribute("value", secenek.getAttribute(TEXT));
        input.className = INPUT;
        input.setAttribute(INDEKS, indeks);
        secenek.appendChild(input);

        liste.style.display = "none";

        var isaret = document.createElement("output");
        isaret.style.cursor = "pointer";
        isaret.className = POINTER;
        var node = document.createTextNode(ISARET_AC);
        isaret.appendChild(node);
        isaret.setAttribute(INDEKS, indeks);

        secenek.appendChild(isaret);
        secenek.setAttribute(INDEKS, indeks);

        var metaldiv = new metalDiv(INPUT_DIV, isaret, liste, secenek, input);
        metalDivList.push(metaldiv);

    } else if (secenek.className === OUTPUT_DIV) {
        var output = document.createElement("output");
        output.innerHTML = secenek.getAttribute(TEXT);
        output.className = INPUT;
        secenek.appendChild(output);

        liste.style.display = "none";

        var isaret = document.createElement("output");
        isaret.className = POINTER;
        var node = document.createTextNode(ISARET_AC);
        isaret.appendChild(node);

        secenek.style.cursor = "pointer";
        secenek.appendChild(isaret);
        secenek.setAttribute(INDEKS, indeks);

        var metaldiv = new metalDiv(OUTPUT_DIV, isaret, liste, secenek, output);
        metalDivList.push(metaldiv);
    }
}

for (var i = 0; i < metalDivList.length; i++) {
    //icerige tıklandı. 
    if (metalDivList[i].type === INPUT_DIV) {

        //listeden seçim yapıldı
        metalDivList[i].liste.addEventListener("click", function (e) {
            var ii = this.getAttribute(INDEKS);

            metalDivList[ii].icerik.value = e.target.innerHTML;
            listeyiKapat(ii);
            metalDivList[ii].ilkInput = 1;
        });

        //tip input ise input ilk tıklamada temizlenecek
        metalDivList[i].icerik.addEventListener("click", function () {
            var ii = this.getAttribute(INDEKS);
            if (metalDivList[ii].ilkInput === 1) {
                metalDivList[ii].ilkInput = 0;
                metalDivList[ii].icerik.value = "";
            }
        });
        //tip input ise isarete tıklayınca liste açılacak
        metalDivList[i].isaret.addEventListener("click", function () {
            var ii = this.getAttribute(INDEKS);
            if (metalDivList[ii].liste.style.display === "none") {
                listeyiAc(ii);
            } else {
                listeyiKapat(ii);
            }
        });
        //input a yazı yazıldı
        metalDivList[i].icerik.addEventListener("input", function () {

            var ii = this.getAttribute(INDEKS);
            var sonucVar = 0; //listeyi açıp kapatabilmek için

            metalDivList[ii].ilkInput = 0;

            var liste = metalDivList[ii].liste.getElementsByTagName("li");

            for (var i = 0; i < liste.length; i++) {
                var yazi = yaziyiGetir(liste[i]);

                if (yazi.toLowerCase().indexOf(this.value.toLowerCase()) === -1) {
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

    } else if (metalDivList[i].type === OUTPUT_DIV) {

        //listeden seçim yapıldı
        metalDivList[i].liste.addEventListener("click", function (e) {
            var ii = this.getAttribute(INDEKS);
            metalDivList[ii].icerik.value = e.target.innerHTML;
            listeyiKapat(ii);
            metalDivList[ii].ilkInput = 1;
        });


        //tip output ise isarete ve outputa tıklayınca liste açılacak
        metalDivList[i].secenek.addEventListener("click", function () {
            var ii = this.getAttribute(INDEKS);

            //console.log("1 output : " + this.getAttribute(INDEKS));
            if (metalDivList[ii].liste.style.display === "none") {
                listeyiAc(ii);
            } else {
                listeyiKapat(ii);
            }
        });
    }
}

//liste haricine tıklanırsa liste kapanacak
window.onclick = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var id = target.parentNode.id;
    if (target.parentNode.className !== INPUT_DIV && target.parentNode.className !== ITEMS && target.parentNode.className !== OUTPUT_DIV) {
        listeleriKapat();
    }
};

function listeleriKapat() {
    for (var i = 0; i < metalDivList.length; i++) {
        listeyiKapat(i);
    }
}

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

function listeyiKapat(ind) {
    metalDivList[ind].liste.style.display = "none";
    metalDivList[ind].isaret.innerHTML = ISARET_AC;
}

function listeyiAc(ind) {
    metalDivList[ind].liste.style.display = "inline";
    metalDivList[ind].isaret.innerHTML = ISARET_KAPA;
}

