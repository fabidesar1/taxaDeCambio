let rates = {}; 


async function getData() {
    const url = 'https://openexchangerates.org/api/latest.json?app_id=dd00e8e6609c4a598c927523d610652a';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        rates = json.rates;  
        
        const mostrarElement = document.getElementById('mostrar');
        const mostrarElement2 = document.getElementById('mostrar2');

        if (mostrarElement && mostrarElement2) {
            let selectHTML = '<select id="currencySelectFrom">';  
            let selectHTMLTo = '<select id="currencySelectTo">';   

            for (const [currency, rate] of Object.entries(rates)) {
                selectHTML += `<option value="${currency}">${currency}</option>`;
                selectHTMLTo += `<option value="${currency}">${currency}</option>`;
            }

            selectHTML += '</select>';
            selectHTMLTo += '</select>';

            mostrarElement.innerHTML = selectHTML;
            mostrarElement2.innerHTML = selectHTMLTo;
        } else {
            console.error("Elemento com id 'mostrar' não encontrado.");
        }
    } catch (error) {
        console.error(error.message);
    }
}

function calculate() {
    const amount = document.getElementById('amount').value;
    const currencyFrom = document.getElementById('currencySelectFrom').value;
    const currencyTo = document.getElementById('currencySelectTo').value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid number for the amount.");
        return;
    }

    if (currencyFrom === currencyTo) {
        document.getElementById('resultado').innerText = "Select different currencies.";
        return;
    }

    const rateFrom = rates[currencyFrom];
    const rateTo = rates[currencyTo];

    if (rateFrom && rateTo) {
        const result = (amount / rateFrom) * rateTo; 
        document.getElementById('resultado').innerText = `Converted amount: ${result.toFixed(2)} ${currencyTo}`;
    } else {
        document.getElementById('resultado').innerText = "Invalid currency selection.";
    }
}


getData();