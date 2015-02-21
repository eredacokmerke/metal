var localSeciliEleman = -1;
var localSeciliListe = -1;
var globalSeciliEleman = -1;
var globalSeciliListe = -1;

function metal_init(options)
{
    var INDEKS = "indeks";
    var ICERIK_DIV = "metal-icerik-div";
    var INPUT_DIV = "metal-input-div";
    var OUTPUT_DIV = "metal-output-div";
    var POINTER_DIV = "metal-pointer-div";
    var INPUT = "metal-input";
    var POINTER = "metal-pointer";
    var TEXT = "metal-text";
    var ITEMS = "metal-items";
    var SELECTED_ITEM = "metal-selected-item";
    var TIP_INPUT = 0;
    var TIP_OUTPUT = 1;
    var ISARET_AC = "\u25BC";
    var ISARET_KAPA = "\u25B2";
    var padding = "10px";
    var metal_div = document.getElementsByClassName("metal-div");
    var ONE_LIST_VISIBLE;

    if (options === undefined)
    {
        ONE_LIST_VISIBLE = false;
    }
    else
    {
        ONE_LIST_VISIBLE = options.oneListVisible;
    }

    function metalDiv(type, isaret, liste, secenek, icerik, ilkInput)
    {
        this.type = type;
        this.isaret = isaret;
        this.liste = liste;
        this.secenek = secenek;
        this.icerik = icerik;
        this.ilkInput = 1;
        this.secilenListeElemani = 0;
    }

    var metalDivList = [];
    var acikListeler = [];

    for (var indeks = 0; indeks < metal_div.length; indeks++)
    {
        var secenek = metal_div[indeks].children[0];
        var liste = metal_div[indeks].children[1];
        liste.setAttribute(INDEKS, indeks);
        var listeElemanlari = liste.children[0];

        for (var i = 0; i < listeElemanlari.children.length; i++)
        {
            listeElemanlari.children[i].setAttribute(INDEKS, i);
            listeElemanlari.children[i].onmouseover = function()
            {
                mouseOver(this);
            };
        }

        var toplamEn = metal_div[indeks].getAttribute("metal-width");

        metal_div[indeks].style.width = toplamEn + "px";
        var ab = toplamEn - 25;
        ab = ab + "px";

        if (secenek.className === INPUT_DIV)
        {
            var icerik = document.createElement("input");
            icerik.setAttribute("value", secenek.getAttribute(TEXT));
            icerik.className = INPUT;
            icerik.setAttribute(INDEKS, indeks);
            icerik.style.width = ab;
            icerik.style.borderColor = "transparent";
            icerik.style.borderWidth = "1px";
            var div1 = document.createElement("div");
            div1.style.display = "inline-block";
            div1.style.verticalAlign = "middle";
            div1.style.width = ab;
            div1.appendChild(icerik);
            div1.className = ICERIK_DIV;
            div1.style.paddingRight = padding;

            var node = document.createTextNode(ISARET_AC);
            var isaret = document.createElement("output");
            isaret.style.cursor = "pointer";
            isaret.className = POINTER;
            isaret.appendChild(node);
            isaret.setAttribute(INDEKS, indeks);
            var div2 = document.createElement("div");
            div2.style.display = "inline-block";
            div2.style.verticalAlign = "middle";
            div2.style.width = "15px";
            div2.className = POINTER_DIV;
            div2.appendChild(isaret);
            div2.setAttribute(INDEKS, indeks);

            secenek.appendChild(div1);
            secenek.appendChild(div2);
            secenek.setAttribute(INDEKS, indeks);

            liste.style.display = "none";
            liste.children[0].style.width = toplamEn + "px";

            var metaldiv = new metalDiv(INPUT_DIV, div2, liste, secenek, icerik);
            metalDivList.push(metaldiv);
        }
        else if (secenek.className === OUTPUT_DIV)
        {
            var icerik = document.createElement("input");
            icerik.setAttribute("value", secenek.getAttribute(TEXT));
            icerik.className = INPUT;
            icerik.setAttribute(INDEKS, indeks);
            icerik.style.width = ab;
            icerik.readOnly = true;
            icerik.style.borderColor = "transparent";
            icerik.style.borderWidth = "1px";
            icerik.style.cursor = "pointer";
            icerik.style.userSelect = "none";
            icerik.style.webkitUserSelect = "none";
            icerik.style.MozUserSelect = "none";
            icerik.setAttribute("unselectable", "on");
            var div1 = document.createElement("div");
            div1.style.display = "inline-block";
            div1.style.verticalAlign = "middle";
            div1.style.width = ab;
            div1.appendChild(icerik);
            div1.className = ICERIK_DIV;
            div1.style.paddingRight = padding;

            var node = document.createTextNode(ISARET_AC);
            var isaret = document.createElement("output");
            isaret.style.cursor = "pointer";
            isaret.className = POINTER;
            isaret.appendChild(node);
            isaret.setAttribute(INDEKS, indeks);
            var div2 = document.createElement("div");
            div2.style.display = "inline-block";
            div2.style.verticalAlign = "middle";
            div2.style.width = "15px";
            div2.className = POINTER_DIV;
            div2.appendChild(isaret);
            div2.setAttribute(INDEKS, indeks);

            secenek.appendChild(div1);
            secenek.appendChild(div2);
            secenek.setAttribute(INDEKS, indeks);

            liste.style.display = "none";
            liste.children[0].style.width = toplamEn + "px";

            var metaldiv = new metalDiv(OUTPUT_DIV, div2, liste, secenek, icerik);
            metalDivList.push(metaldiv);
        }
    }

    for (var i = 0; i < metalDivList.length; i++)
    {
        if (metalDivList[i].type === INPUT_DIV)
        {
            metalDivList[i].liste.addEventListener("click", function(e)
            {
                var ii = this.getAttribute(INDEKS);
                metalDivList[ii].icerik.value = yaziyiGetir(e.target);
                listeyiKapat(ii);
                metalDivList[ii].ilkInput = 1;
            });

            metalDivList[i].icerik.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].ilkInput === 1)
                {
                    metalDivList[ii].ilkInput = 0;
                    metalDivList[ii].icerik.value = "";
                }
            });

            metalDivList[i].isaret.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].liste.style.display === "none")
                {
                    listeyiAc(ii, TIP_INPUT);
                    if (ONE_LIST_VISIBLE === true)
                    {
                        digerListeleriKapat(ii);
                    }
                }
                else
                {
                    listeyiKapat(ii);
                }
            });

            metalDivList[i].icerik.addEventListener("input", function()
            {
                var ii = this.getAttribute(INDEKS);
                var sonucVar = 0;
                metalDivList[ii].ilkInput = 0;
                var liste = metalDivList[ii].liste.getElementsByTagName("li");

                for (var i = 0; i < liste.length; i++)
                {
                    var yazi = yaziyiGetir(liste[i]);

                    if (yazi.toLowerCase().indexOf(this.value.toLowerCase()) === -1)
                    {
                        liste[i].style.opacity = 0;
                        liste[i].style.display = "none";
                    }
                    else
                    {
                        liste[i].style.opacity = 1;
                        liste[i].style.display = "";
                        sonucVar = 1;
                    }
                }

                if (sonucVar === 1)
                {
                    listeyiAc(ii, TIP_INPUT);
                }
                else
                {
                    listeyiKapat(ii);
                }
            });
        }
        else if (metalDivList[i].type === OUTPUT_DIV)
        {
            metalDivList[i].liste.addEventListener("click", function(e)
            {
                var ii = this.getAttribute(INDEKS);
                metalDivList[ii].icerik.value = yaziyiGetir(e.target);
                listeyiKapat(ii);
                metalDivList[ii].ilkInput = 1;
            });

            metalDivList[i].secenek.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].liste.style.display === "none")
                {
                    listeyiAc(ii, TIP_OUTPUT);
                    if (ONE_LIST_VISIBLE === true)
                    {
                        digerListeleriKapat(ii);
                    }
                }
                else
                {
                    listeyiKapat(ii);
                }
            });
        }
    }

    window.onclick = function(e)
    {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var url = window.location.href + "#";

        if (url.toString() !== target.toString())
        {
            if (target.parentNode.className !== INPUT_DIV && target.parentNode.className !== ITEMS && target.parentNode.className !== OUTPUT_DIV && target.parentNode.className !== POINTER_DIV && target.parentNode.className !== ICERIK_DIV)
            {
                listeleriKapat();
            }
        }
    };

    function listeleriKapat()
    {
        for (var i = 0; i < metalDivList.length; i++)
        {
            listeyiKapat2(i);
        }
    }

    function digerListeleriKapat(ind)
    {
        for (var i = 0; i < metalDivList.length; i++)
        {
            if (i != ind)
            {
                listeyiKapat(i);
            }
        }
    }

    function yaziyiGetir(eleman)
    {
        var a = 0;
        var icElemanSayisi = eleman.children.length;
        var yazi = "";

        if (icElemanSayisi === 0)
        {
            yazi = eleman.innerHTML;
            if (yazi.length === 0)
            {
                yazi = eleman.value;
            }
        }
        else
        {
            for (a = 0; a < icElemanSayisi; a++)
            {
                yazi = yazi + yaziyiGetir(eleman.children[a]);
            }
        }
        return yazi;
    }

    function listeyiKapat(ind)
    {
        metalDivList[ind].liste.style.display = "none";
        metalDivList[ind].isaret.children[0].innerHTML = ISARET_AC;

        acikListeler.splice(acikListeler.indexOf(ind), 1);
        if (acikListeler.length === 0)
        {
            globalSeciliEleman = localSeciliEleman;
            globalSeciliListe = localSeciliListe;

            document.onkeydown = function(e)
            {
                return true;
            };
        }
    }

    function listeyiKapat2(ind)
    {
        metalDivList[ind].liste.style.display = "none";
        metalDivList[ind].isaret.children[0].innerHTML = ISARET_AC;

        acikListeler.splice(acikListeler.indexOf(ind), 1);
        if (acikListeler.length === 0)
        {
            localSeciliListe = -1;
            localSeciliEleman = -1;
            globalSeciliListe = -1;
            globalSeciliEleman = -1;

            document.onkeydown = function(e)
            {
                return true;
            };
        }
    }

    function listeyiAc(ind, tip)
    {
        metalDivList[ind].liste.style.display = "inline";
        metalDivList[ind].isaret.children[0].innerHTML = ISARET_KAPA;
        if (tip === TIP_INPUT)
        {
            document.onkeydown = okTusunaBasildiInput;
            satiriSecInput(metalDivList[ind], 0);
        }
        else if (tip === TIP_OUTPUT)
        {
            document.onkeydown = okTusunaBasildiOutput;
            satiriSecOutput(metalDivList[ind], 0);
        }
        acikListeler.push(ind);
    }

    function satiriSecOutput(metaldivlist, fark)
    {
        var secilenListeElemaniSirasi = metaldivlist.secilenListeElemani;
        var listeElemanlari = metaldivlist.liste.children[0];
        var toplamElemanSayisi = listeElemanlari.children.length;

        listeElemanlari.children[secilenListeElemaniSirasi].className = "";
        secilenListeElemaniSirasi = secilenListeElemaniSirasi + fark;

        if (secilenListeElemaniSirasi < 0)
        {
            secilenListeElemaniSirasi = toplamElemanSayisi - 1;
        }
        else if (secilenListeElemaniSirasi === toplamElemanSayisi)
        {
            secilenListeElemaniSirasi = 0;
        }

        listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
        metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;

        localSeciliEleman = metaldivlist.secilenListeElemani;
    }

    function satiriSecInput(metaldivlist, fark)
    {
        var secilenListeElemaniSirasi = metaldivlist.secilenListeElemani;
        var listeElemanlari = metaldivlist.liste.children[0];
        var toplamElemanSayisi = listeElemanlari.children.length;

        listeElemanlari.children[secilenListeElemaniSirasi].className = "";
        secilenListeElemaniSirasi = secilenListeElemaniSirasi + fark;

        if (secilenListeElemaniSirasi < 0)
        {
            secilenListeElemaniSirasi = toplamElemanSayisi - 1;
        }
        else if (secilenListeElemaniSirasi === toplamElemanSayisi)
        {
            secilenListeElemaniSirasi = 0;
        }

        var opacity = listeElemanlari.children[secilenListeElemaniSirasi].style.opacity;

        if (fark === 0)
        {
            if (opacity === "" || opacity === "1")
            {
                listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
            }
            else
            {
                var bulundu = 0;
                while (opacity === "0" && secilenListeElemaniSirasi < toplamElemanSayisi - 1)
                {
                    secilenListeElemaniSirasi++;
                    opacity = listeElemanlari.children[secilenListeElemaniSirasi].style.opacity;
                    if (opacity === "1")
                    {
                        bulundu = 1;
                        listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                        metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
                    }
                }
            }
        }
        else
        {
            if (opacity === "" || opacity === "1")
            {
                listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
            }
            else
            {
                var bulundu = 0;
                while (opacity === "0" && secilenListeElemaniSirasi < toplamElemanSayisi - 1 && secilenListeElemaniSirasi > 0)
                {
                    secilenListeElemaniSirasi = secilenListeElemaniSirasi + fark;
                    opacity = listeElemanlari.children[secilenListeElemaniSirasi].style.opacity;
                    if (opacity === "1")
                    {
                        bulundu = 1;
                        listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                        metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
                    }
                }
                if (bulundu === 0)
                {
                    if (fark === 1)
                    {
                        secilenListeElemaniSirasi = -1;
                        while (opacity === "0" && secilenListeElemaniSirasi < toplamElemanSayisi - 1)
                        {
                            secilenListeElemaniSirasi = secilenListeElemaniSirasi + fark;
                            opacity = listeElemanlari.children[secilenListeElemaniSirasi].style.opacity;
                            if (opacity === "1")
                            {
                                bulundu = 1;
                                listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                                metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
                            }
                        }
                    }
                    else
                    {
                        secilenListeElemaniSirasi = toplamElemanSayisi;
                        while (opacity === "0" && secilenListeElemaniSirasi > 0)
                        {
                            secilenListeElemaniSirasi = secilenListeElemaniSirasi + fark;
                            opacity = listeElemanlari.children[secilenListeElemaniSirasi].style.opacity;
                            if (opacity === "1")
                            {
                                bulundu = 1;
                                listeElemanlari.children[secilenListeElemaniSirasi].className = SELECTED_ITEM;
                                metaldivlist.secilenListeElemani = secilenListeElemaniSirasi;
                            }
                        }
                    }
                }
            }
        }

        localSeciliEleman = metaldivlist.secilenListeElemani;
    }

    function okTusunaBasildiOutput(e)
    {
        e = e || window.event;
        var indeks = acikListeler[acikListeler.length - 1];

        if (e.keyCode == '38')
        {
            e.preventDefault();
            satiriSecOutput(metalDivList[indeks], -1);
            localSeciliListe = indeks;
        }
        else if (e.keyCode == '40')
        {
            e.preventDefault();
            satiriSecOutput(metalDivList[indeks], 1);
            localSeciliListe = indeks;
        }
        else if (e.keyCode == '13')
        {
            var mdl = metalDivList[indeks];
            mdl.icerik.value = yaziyiGetir(mdl.liste.children[0].children[mdl.secilenListeElemani]);
            listeyiKapat(indeks);
        }
        else if (e.keyCode == '27')
        {
            e.preventDefault();
            listeleriKapat();
        }
    }

    function okTusunaBasildiInput(e)
    {
        e = e || window.event;
        var indeks = acikListeler[acikListeler.length - 1];

        if (e.keyCode == '38')
        {
            e.preventDefault();
            satiriSecInput(metalDivList[indeks], -1);
            localSeciliListe = indeks;
        }
        else if (e.keyCode == '40')
        {
            e.preventDefault();
            satiriSecInput(metalDivList[indeks], 1);
            localSeciliListe = indeks;
        }
        else if (e.keyCode == '13')
        {
            var mdl = metalDivList[indeks];
            mdl.icerik.value = yaziyiGetir(mdl.liste.children[0].children[mdl.secilenListeElemani]);
            listeyiKapat(indeks);
        }
        else if (e.keyCode == '27')
        {
            e.preventDefault();
            listeleriKapat();
        }
    }

    function mouseOver(t)
    {
        var ind = t.parentElement.parentElement.getAttribute(INDEKS);
        var seciliListeElemaniInd = t.getAttribute(INDEKS);
        var listeElemanlari = metalDivList[ind].liste.children[0];

        listeElemanlari.children[metalDivList[ind].secilenListeElemani].className = "";
        listeElemanlari.children[seciliListeElemaniInd].className = SELECTED_ITEM;
        metalDivList[ind].secilenListeElemani = parseInt(seciliListeElemaniInd);

        localSeciliEleman = metalDivList[ind].secilenListeElemani;
        localSeciliListe = ind;
    }
}

function getSelectedItem()
{
    var sonuc = [];
    sonuc.push(globalSeciliListe);
    sonuc.push(globalSeciliEleman);

    return sonuc;
}

