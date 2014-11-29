var dmi_input_div = document.getElementById("dmi-input-div");
var dmi_items_div = document.getElementById("dmi-items-div");
var dmi_items = document.getElementById("dmi-items");
var listeElemani = dmi_items.getElementsByTagName("li");
var output = document.createElement("output");
output.style.cursor = "pointer";

dmi_items_div.style.display = "none";
dmi_items.style.listStyle = "none";
dmi_items.style.padding = "0";

var input = document.createElement("input");
input.id = "dmi-input2";
//input a yazı yazıldı
input.addEventListener("input", function () {
    var i;
    var sonucVar=0;

    for (i = 0; i < listeElemani.length; i++) {
        if (listeElemani[i].innerHTML.indexOf(input.value) === -1) {
            listeElemani[i].style.opacity = 0;
            listeElemani[i].style.display = "none";
        } else {
            listeElemani[i].style.opacity = 1;
            listeElemani[i].style.display = "";
            sonucVar=1;
        }
        
        if(sonucVar === 1)
        {
            output.innerHTML = "\u25B2";
            dmi_items_div.style.display = "inline";
        }
        else
        {
            output.innerHTML = "\u25BC";
            dmi_items_div.style.display = "none";
        }
    }
});

var node = document.createTextNode('\u25BC');
//tuşa basıldı
output.addEventListener("click", function () {

    if(dmi_items_div.style.display === "none")
    {
        dmi_items_div.style.display = "inline";
        output.innerHTML = "\u25B2";
    }
    else
    {
        dmi_items_div.style.display = "none";
        output.innerHTML = "\u25BC";
    }
});

output.appendChild(node);
dmi_input_div.appendChild(input);
dmi_input_div.appendChild(output);
