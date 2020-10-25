const userAchievemenstsDiv = document.querySelector('[data-user-achievements]')
const progress = [...document.querySelectorAll('[data-progress]')]

const develop = 'http://localhost:3000/userAchievementsData'
const production = 'https://yourhealth-hackheroes.herokuapp.com/userAchievementsData'

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



const displayAchievements = async () => {

    const data = await getData()

    data.userAchievements.forEach(item=> {
        const div = document.createElement('div')
        div.classList.add('user-achievements__item')
        div.innerHTML = `<h3>${item} <i class="fas fa-trophy"></i></h3>`
        userAchievemenstsDiv.appendChild(div)
    }) 
    
    progress.forEach(item=> {
        const text = item.textContent
        let splitText = text.split('/')
        if(data.steps >= parseInt(splitText[1])) {
            splitText[0] = splitText[1]
        } else {
            splitText[0] = data.steps.toString()
        }
        console.log(splitText)
        item.textContent = `${splitText[0]} / ${splitText[1]}`
        
    })
}

displayAchievements()