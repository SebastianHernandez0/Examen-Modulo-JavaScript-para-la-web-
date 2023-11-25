let select = document.querySelector(".conversor__select")
let resultado = document.querySelector(".conversor__span")
let btn = document.querySelector(".conversor__btn")
let input = document.querySelector(".conversor__input")
let error = document.querySelector("#error")
var graf = document.getElementById("myChart").getContext('2d');

var myChart;

async function getMoneda() {

    try {
        apiPath = "https://mindicador.cl/api/"
        res = await fetch(apiPath)
        datos = await res.json()
        return datos
    } catch (e) {
        error.style.display = "block"
        error.innerHTML = e.message

    }

}

async function ArreglarArray() {
    let monedas = await getMoneda()
    let arrayMonedas = []
    for (const i in monedas) {
        arrayMonedas.push(monedas[i])
    }

    return arrayMonedas
}

async function renderRes() {
    let arrayMonedas = await ArreglarArray()
    btn.addEventListener("click", function () {
        if (myChart) {
            myChart.destroy()
        }
        let Valorinput = Number(input.value)
        input.value = ""

        if (select.value === "dolar") {
            let conversion = Valorinput / arrayMonedas[5].valor
            resultado.innerHTML = `Resultado: $${conversion.toFixed(2)}`
        } if (select.value === "euro") {
            let conversion = Valorinput / arrayMonedas[7].valor
            resultado.innerHTML = `Resultado: €${conversion.toFixed(2)}`
        }
        async function getChart() {
            if (select.value === "dolar") {
                const api = await fetch("https://mindicador.cl/api/dolar")
                const res = await api.json()
                const fechas = []
                const valor = []
                for (let i in res.serie) {
                    fechas.push(res.serie[i].fecha)
                    valor.push(res.serie[i].valor)
                }
                for (const i in fechas) {
                    fechas[i] = fechas[i].substring(0, 10)
                }
                const data = {
                    labels: fechas,
                    datasets: [{
                        label: "USD vs CLP",
                        borderColor: "#fafafa",
                        data: valor

                    }]

                }
                const config = {
                    type: "line",
                    data
                }
                myChart = new Chart(graf, config);


            } if (select.value === "euro") {
                const api = await fetch("https://mindicador.cl/api/euro")
                const res = await api.json()
                const fechas = []
                const valor = []

                for (let i in res.serie) {
                    fechas.push(res.serie[i].fecha)
                    valor.push(res.serie[i].valor)
                }
                for (const i in fechas) {
                    fechas[i] = fechas[i].substring(0, 10)
                }
                const data = {
                    labels: fechas,
                    datasets: [{
                        label: "EUR vs CLP",
                        borderColor: "#fafafa",
                        data: valor

                    }]

                }
                const config = {
                    type: "line",
                    data
                }
                myChart = new Chart(graf, config);


            }
        }
        getChart()
    })

}




renderRes()

