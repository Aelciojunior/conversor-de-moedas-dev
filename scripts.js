const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");
const currencyOption = document.querySelector(".currency-option"); // Seleção de moeda de origem

let rates = {};  // Esta variável armazenará as taxas dinâmicas das moedas

// Função para fazer a requisição à API e obter as taxas de câmbio atualizadas
async function fetchRates() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,USD-EUR,USD-GBP,USD-GTQ');
        const data = await response.json();

        // Preenche o objeto rates com as taxas retornadas pela API
        rates = {
            dolar: 1,
            euro: parseFloat(data['USDEUR'].bid),   // A taxa de EUR em relação ao Dólar
            libra: parseFloat(data['USDGBP'].bid),  // A taxa de GBP em relação ao Dólar
            real: parseFloat(data['USDBRL'].bid),   // A taxa de BRL em relação ao Dólar
            quetzal: parseFloat(data['USDGTQ'].bid) // A taxa de GTQ em relação ao Dólar
        };

        console.log(rates);  // Verifique se as taxas foram carregadas corretamente
    } catch (error) {
        console.error("Erro ao acessar a API: ", error);
        alert("Erro ao acessar a API. Verifique sua conexão ou tente novamente mais tarde.");
    }
}

// Função de conversão entre as moedas
function convertCurrencies(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;  // Se as moedas forem iguais, não converte

    // Converte de Dólar para a moeda de destino
    if (fromCurrency === "dolar") {
        return amount * rates[toCurrency];
    }

    // Caso contrário, converte usando o Dólar como intermediário
    return (amount / rates[fromCurrency]) * rates[toCurrency];
}

// Função para realizar a conversão entre as moedas
function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(",", "."));
    const currencyValueToCovert = document.querySelector(".currency-value-to-convert");
    const currencyValueToCoverted = document.querySelector(".currency-value");

    const fromCurrency = currencyOption.value;  // Moeda de origem
    const toCurrency = currencySelect.value;  // Moeda de destino

    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) return;

    const convertedValue = convertCurrencies(inputCurrencyValue, fromCurrency, toCurrency);

    currencyValueToCoverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: toCurrency === "dolar" ? "USD" :
                  toCurrency === "euro" ? "EUR" :
                  toCurrency === "real" ? "BRL" :
                  toCurrency === "quetzal" ? "GTQ" : "GBP"
    }).format(convertedValue);

    currencyValueToCovert.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: fromCurrency === "dolar" ? "USD" :
                  fromCurrency === "euro" ? "EUR" :
                  fromCurrency === "real" ? "BRL" :
                  fromCurrency === "quetzal" ? "GTQ" : "GBP"
    }).format(inputCurrencyValue);
}

// Função para atualizar o nome e a imagem de origem (moeda)
function updateOriginCurrency() {
    const currencyName = document.getElementById("currency-name-origin");
    const currencyImage = document.querySelector(".currency-box img");

    const originCurrency = currencyOption.value;

    if (originCurrency === "real") {
        currencyName.innerHTML = "Real Brasileiro";
        currencyImage.src = "assets/brasil.png";
    } else if (originCurrency === "dolar") {
        currencyName.innerHTML = "Dólar";
        currencyImage.src = "assets/estados-unidos1.png";
    } else if (originCurrency === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "assets/euro.png";
    } else if (originCurrency === "quetzal") {
        currencyName.innerHTML = "Quetzal";
        currencyImage.src = "assets/guatemala.png";
    } else if (originCurrency === "libra") {
        currencyName.innerHTML = "Libra Esterlina";
        currencyImage.src = "assets/inglaterra.png";
    }

    convertValues();
}

// Função para atualizar o nome e a imagem da moeda de destino
function updateDestinationCurrency() {
    const currencyName = document.getElementById("currency-name-destination");
    const currencyImage = document.querySelector(".currency-box:last-child img");

    const destinationCurrency = currencySelect.value;

    if (destinationCurrency === "real") {
        currencyName.innerHTML = "Real Brasileiro";
        currencyImage.src = "assets/brasil.png";
    } else if (destinationCurrency === "dolar") {
        currencyName.innerHTML = "Dólar";
        currencyImage.src = "assets/estados-unidos1.png";
    } else if (destinationCurrency === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "assets/euro.png";
    } else if (destinationCurrency === "quetzal") {
        currencyName.innerHTML = "Quetzal";
        currencyImage.src = "assets/guatemala.png";
    } else if (destinationCurrency === "libra") {
        currencyName.innerHTML = "Libra Esterlina";
        currencyImage.src = "assets/inglaterra.png";
    }

    convertValues();
}

// Chama a função para pegar as taxas de câmbio ao carregar a página
fetchRates();

// Adiciona os listeners de eventos
currencySelect.addEventListener("change", updateDestinationCurrency);
currencyOption.addEventListener("change", updateOriginCurrency);
convertButton.addEventListener("click", convertValues);
