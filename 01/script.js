const srcEnabled = './icon/icon-heart-enabled.svg'
const srcDisabled = './icon/icon-heart-disabled.svg'
 
const iconFavorites = document.querySelectorAll('.icon-favorite');

iconFavorites.forEach((icon) => {
    icon.addEventListener('click', () => {        
        icon.setAttribute('src', icon.src.includes('disabled') ? srcEnabled : srcDisabled)
    })
})