let select=document.querySelector(".conversor__select")
let resultado= document.querySelector(".conversor__span")
let btn=document.querySelector(".conversor__btn")
let input=document.querySelector(".conversor__input")



async function getMoneda(){
    apiPath="https://mindicador.cl/api/"
    res= await fetch(apiPath)
    datos= await res.json()
    return datos
}

async function ArreglarArray(){
    let monedas= await getMoneda()
    let arrayMonedas=[]
    for (const i in monedas) {
        arrayMonedas.push(monedas[i])
    }
    
   return arrayMonedas
}

async function renderRes(){
    let arrayMonedas= await ArreglarArray()
    
    btn.addEventListener("click",function(){
        let Valorinput=Number(input.value)
        input.value=""


        if(select.value === "dolar"){
            let conversion= Valorinput/arrayMonedas[5].valor
            resultado.innerHTML=`Resultado: $${conversion.toFixed(2)}`
        }if(select.value ==="euro"){
            let conversion= Valorinput/arrayMonedas[7].valor
            resultado.innerHTML=`Resultado: €${conversion.toFixed(2)}`
        }
    })

}

renderRes()


