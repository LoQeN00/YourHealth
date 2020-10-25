const burgerMenu = document.querySelector('[data-burger-menu]')
const navigation = document.querySelector('.navigation')
const removeBurgerMenu = document.querySelector('[data-remove]')
const holder = document.querySelector('.holder')


burgerMenu.addEventListener('click',()=> {
    navigation.classList.add('burger-nav')
    holder.classList.add('invisible')
})

removeBurgerMenu.addEventListener('click',()=> {
    navigation.classList.remove('burger-nav')
    holder.classList.remove('invisible')
})




