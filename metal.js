function metal_init(options)
{
    var INDEKS = "indeks";
    var ICERIK_DIV = "metal-icerik-div"; //input/output
    var INPUT_DIV = "metal-input-div";
    var OUTPUT_DIV = "metal-output-div";
    var POINTER_DIV = "metal-pointer-div";
    var INPUT = "metal-input";
    var POINTER = "metal-pointer";
    var TEXT = "metal-text";
    var ITEMS = "metal-items";
    var ISARET_AC = "\u25BC";
    var ISARET_KAPA = "\u25B2";
    var padding = "10px";
    var metal_div = document.getElementsByClassName("metal-div");
    var ONE_LIST_VISIBLE;
    if (options === undefined) //init metodunda belirtilmemiş, öntanımlı değer kullanılacak
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
        this.secenek = secenek; //isaret+icerik
        this.icerik = icerik; //input/output
        this.ilkInput = 1;
    }

    var metalDivList = [];

    for (var indeks = 0; indeks < metal_div.length; indeks++)
    {
        var secenek = metal_div[indeks].children[0]; //metal-div in içindeki 1. kısım (input/output+pointer)
        var liste = metal_div[indeks].children[1]; //metal-div in içindeki 2. kısım (liste)
        liste.setAttribute(INDEKS, indeks);

        var toplamEn = metal_div[indeks].getAttribute("metal-width");

        metal_div[indeks].style.width = toplamEn + "px";
        var aa = toplamEn - 25;
        var ab = aa + "px";

        if (secenek.className === INPUT_DIV)
        {
            var icerik = document.createElement("input");
            icerik.setAttribute("value", secenek.getAttribute(TEXT));
            icerik.className = INPUT;
            icerik.setAttribute(INDEKS, indeks);
            icerik.style.width = ab;
            icerik.style.borderColor = "grey";
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

            var metaldiv = new metalDiv(OUTPUT_DIV, div2, liste, secenek, icerik);
            metalDivList.push(metaldiv);
        }
    }

    for (var i = 0; i < metalDivList.length; i++)
    {
        //icerige tıklandı. 
        if (metalDivList[i].type === INPUT_DIV)
        {
            //listeden seçim yapıldı
            metalDivList[i].liste.addEventListener("click", function(e)
            {
                var ii = this.getAttribute(INDEKS);
                metalDivList[ii].icerik.value = yaziyiGetir(e.target);
                listeyiKapat(ii);
                metalDivList[ii].ilkInput = 1;
            });

            //tip input ise input ilk tıklamada temizlenecek
            metalDivList[i].icerik.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].ilkInput === 1)
                {
                    metalDivList[ii].ilkInput = 0;
                    metalDivList[ii].icerik.value = "";
                }
            });

            //tip input ise isarete tıklayınca liste açılacak
            metalDivList[i].isaret.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].liste.style.display === "none")
                {
                    listeyiAc(ii);
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

            //input a yazı yazıldı
            metalDivList[i].icerik.addEventListener("input", function()
            {
                var ii = this.getAttribute(INDEKS);
                var sonucVar = 0; //listeyi açıp kapatabilmek için
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

                    if (sonucVar === 1)
                    {
                        listeyiAc(ii);
                    }
                    else
                    {
                        listeyiKapat(ii);
                    }
                }
            });

        }
        else if (metalDivList[i].type === OUTPUT_DIV)
        {
            //listeden seçim yapıldı
            metalDivList[i].liste.addEventListener("click", function(e)
            {
                var ii = this.getAttribute(INDEKS);
                metalDivList[ii].icerik.value = yaziyiGetir(e.target);
                listeyiKapat(ii);
                metalDivList[ii].ilkInput = 1;
            });

            //tip output ise isarete ve outputa tıklayınca liste açılacak
            metalDivList[i].secenek.addEventListener("click", function()
            {
                var ii = this.getAttribute(INDEKS);
                if (metalDivList[ii].liste.style.display === "none")
                {
                    listeyiAc(ii);
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

    //liste haricine tıklanırsa liste kapanacak
    window.onclick = function(e)
    {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var id = target.parentNode.id;
        if (target.parentNode.className !== INPUT_DIV && target.parentNode.className !== ITEMS && target.parentNode.className !== OUTPUT_DIV && target.parentNode.className !== POINTER_DIV && target.parentNode.className !== ICERIK_DIV)
        {
            listeleriKapat();
        }
    };

    //acik olan listeleri kapatir
    function listeleriKapat()
    {
        for (var i = 0; i < metalDivList.length; i++)
        {
            listeyiKapat(i);
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

    //iç etiketlerden yazıları getirir
    function yaziyiGetir(eleman)
    {
        var a = 0;
        var icElemanSayisi = eleman.children.length;
        var yazi = "";

        if (icElemanSayisi === 0)
        {
            yazi = eleman.innerHTML;
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
    }

    function listeyiAc(ind)
    {
        metalDivList[ind].liste.style.display = "inline";
        metalDivList[ind].isaret.children[0].innerHTML = ISARET_KAPA;
    }
}

