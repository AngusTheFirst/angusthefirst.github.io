const btnElem = document.getElementById("calculate");
const prices = document.getElementById("prices");
const stake = document.getElementById("stake");
const info = document.getElementById("info");
const totSpan = document.getElementById("total");

let betPrices = []; // global scope array

// called from button press
function calcTotal(){
    const userInput = prices.value;  // user text from input box
    let stakeVal = Math.abs(stake.value); // user text from second input box
   // let status = checkInput(userInput);
    parsePrices(userInput);          // function call  
    let nop = findNumberPrices(userInput);

    // bet information output
    const txt = getBet(nop);
    let cost = betCost(nop);

    const product = betPrices.reduce((acc, curr) => acc * curr, 1) - 1.0;

    if (!isNumeric(stakeVal)){
        stakeVal = 1;
        stake.value = (1).toFixed(2);
    }

    info.value = txt+findBetCost(cost,stake.value);

    const betReturn = product * stakeVal;
    totSpan.innerText = betReturn.toFixed(2); // output bet return

    betPrices = []; // clear array

}


function isNumeric(st){
    return !isNaN(st) && !isNaN(parseFloat(st));
}

function findBetCost(cst,sv){
    let cost = cst * sv;
    cost = Math.abs(cost);
    return " Cost of bet = " + cost.toFixed(2);

}

/// @description : parses line of text from input box on web page
/// @param : pr is the text from the input box
/// @return : nothing returned
function parsePrices(pr){

    const price = pr.split("+");

    for (let i = 0; i < price.length; i++){
        const numerator = parseFloat(price[i]); 
        const slash = price[i].indexOf("/");
        const dStr = price[i].substring(slash+1);
        const denominator = parseFloat(dStr);
        betPrices[i] = (numerator/denominator) + 2.0;
        betPrices[i].toFixed(4);
    }

}

function betCost(n){
    return 2 ** n - 1;
}

function findNumberPrices(pr){
    let count = 0;
    for (let i = 0; i < pr.length; i++){
        const ch = pr.charAt(i);
        if (ch === "/")
            count++;
    }
    return count;

}

function getBet(nop){
    let txt = "";
    switch(nop){
        case 1: txt = "Single bet.";break;
        case 2: txt = "2 singles and a double.";break;
        case 3: txt = "Patent.";break;
        case 4: txt = "Lucky 15.";break;
        case 5: txt = "Canadian and 5 singles.";break;
    }
    return txt;
}

btnElem.addEventListener("click",calcTotal);