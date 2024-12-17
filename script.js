

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const btn = document.querySelector("form button");


for(let select of dropdowns)
{
    for (currCode in countryList)
    {
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if(select.name === "from" && currCode === "USD")
       {
        newOption.selected = "selected";
       }
       else if(select.name === "to" && currCode === "INR")
       {
        newOption.selected = "selected";
       }
       select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue ==="" || amtValue <1)
    {
        amtValue = 1;
        amount.value = "1";
    } 
    console.log(amtValue);
    console.log(fromCurr.value, toCurr.value);
    const url = `https://v6.exchangerate-api.com/v6/41cce7bd9888ac23bbde50eb/latest/${fromCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})


