//a tutaj dane odbierasz
const develop = 'http://localhost:3000/chartData'
const production = 'https://yourhealth-hackheroes.herokuapp.com/chartData'

const getData = async () => {
    const data = await fetch(production,{
     method:"GET",
     headers : new Headers({
        'Content-Type':'application/json'
     })
    })

    const dataJSON = await data.json()

    return dataJSON
}

const makeBarChart = (ctx, labels, data, label) => {

    const stepChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    categoryPercentage: 7,
                    barPercentage: .1
                }]
            },
            maintainAspectRatio: false,
            tooltips: {
                caretSize: 20,
                mode: 'index',
                intersect: false,
                displayColors: false
            },
            legend: {
                display: true,
                onClick: (e, legendItem) => {
                    return
                },
                labels: {
                    boxWidth: 0
                }
            }
        }
    })
    
}

const makeCharts = async () => {
    const data = await getData()
    const step24DataCtx = document.getElementById('step__24__chart')
    const step7dDataCtx = document.getElementById('step__7d__chart')
    const step30dDataCtx = document.getElementById('step__30d__chart')

    
    data.date7d_arr.forEach(item=> {
        item.pop()
    })

    data.date30d_arr.forEach(item => {
        item.pop()
    })

    makeBarChart(step24DataCtx, data.date24_arr, data.steps24_arr, 'Twoje ostatnie 24h aktywności')
    makeBarChart(step7dDataCtx, data.date7d_arr, data.steps7d_arr, 'Porownanie dni z ostatniego tygodnia')
    makeBarChart(step30dDataCtx, data.date30d_arr, data.steps30d_arr, 'Porownanie tygodni z ostatniego miesiaca')
}



makeCharts()










