const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(",", "."));
    const currencyValueToCovert = document.querySelector(".currency-value-to-convert");
    const currencyValueToCoverted = document.querySelector(".currency-value");

    const dolarToday = 6.08;
    const euroToday = 6.33;
    const quetzalToday = 0.79;
    const libraToday = 7.55;

    let convertedValue;

    if (currencySelect.value === "dolar") {
        convertedValue = inputCurrencyValue / dolarToday;
        currencyValueToCoverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(convertedValue);
    }

    if (currencySelect.value === "euro") {
        convertedValue = inputCurrencyValue / euroToday;
        currencyValueToCoverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(convertedValue);

        }

        if (currencySelect.value === "quetzal") {
            convertedValue = inputCurrencyValue / quetzalToday;
            currencyValueToCoverted.innerHTML = new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "GTQ"
            }).format(convertedValue);
    
            }

            if (currencySelect.value === "libra") {
                convertedValue = inputCurrencyValue / libraToday;
                currencyValueToCoverted.innerHTML = new Intl.NumberFormat("en-In", {
                    style: "currency",
                    currency: "GBT"
                }).format(convertedValue);
        
                }


    


        

    currencyValueToCovert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue);

    
}



function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value === "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = "assets/estados-unidos1.png";
    }

    if (currencySelect.value === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "assets/euro.png";
    }

    if (currencySelect.value === "quetzal") {
        currencyName.innerHTML = "Quetzal";
        currencyImage.src = "assets/guatemala.png";
    }

    if (currencySelect.value === "libra") {
        currencyName.innerHTML = "Libra esterlina";
        currencyImage.src = "assets/inglaterra.png";
    }

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
