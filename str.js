const BASE_URL ="https://api.frankfurter.dev/v2/rate";

const mes=document.querySelector(".msg")
const btn=document.querySelector(".btn")

const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")

const dropdown = document.querySelectorAll(".dropdown select")
for (let select of dropdown) {
    for (code in countryList) {
        let noption = document.createElement("option");
        noption.innerText = code
        noption.value = code;
        if (select.name === "from" && code === "USD") {
            noption.selected = "selected"
        }
        else if (select.name === "to" && code === "INR") {
            noption.selected = "selected"
            
        }
        select.append(noption);
        
        select.addEventListener("change",(evt)=>{
            flag(evt.target)
        })
    }
}


const flag = (evt)=>{
    let code=evt.value;
    let country=countryList[code]
    let nimg=`https://flagsapi.com/${country}/flat/64.png`
    let img=evt.parentElement.querySelector("img");
    img.src=nimg;
}



const update = async ()=>{
    let amount=document.querySelector("input")
    let value=amount.value;
    if(value=="" || value<1){
        value=1;
        amount.value="1";  
    }
    const URL =`${BASE_URL}/${fromCurr.value}/${toCurr.value}.json`
    let response = await fetch(URL);
    let data=await response.json();
    
    let rate=data.rate
    
    let finalamount=rate*value
    
    mes.innerText=`${value} ${fromCurr.value} = ${finalamount} ${toCurr.value}`
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    update()
})
window.addEventListener("load",()=>{
    update()
})