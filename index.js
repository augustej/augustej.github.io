const cards = document.querySelectorAll('.card')
const cardsArea = document.querySelector('#education')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal')
const nav = document.querySelector('.navigation')
const navItems = document.querySelectorAll('a')
const footer = document.querySelector('footer')
const pictureModal = document.querySelector('.picture-modal')
const closePictureBtn = document.querySelector('.close-picture')
let imageClicked

document.addEventListener('click', event =>{

    // modal for cards in education & experience
    if (event.target.closest('section') == cardsArea){
        cards.forEach(card =>{
            if (event.target.closest('div') == card){   
                let activeEl = document.querySelector('.active-card')    
                if (activeEl){
                    activeEl.classList.remove('active-card')
                    modal.classList.toggle('hidden')
                    modal.removeChild(modal.lastChild)
                }
                // get information from the clicked card
                let cardInformation = card.querySelector('.card-overflow')
                let divToAppendToModal = cardInformation.cloneNode(true)
                divToAppendToModal.classList.remove('card-overflow')
                divToAppendToModal.classList.add('modal-info')
                modal.append(divToAppendToModal)

                modal.classList.toggle('hidden')
                card.classList.toggle('active-card')
            }
        })
    }
    
    // close modal
    if (event.target == closeModal){
        modal.classList.add('hidden')
        document.querySelector('.active-card').classList.remove('active-card')
        modal.removeChild(modal.lastChild)
    }

    // modify href position when using nav
    if (event.target.closest('nav') == nav){
        navItems.forEach(navElement =>{
            if (navElement==event.target){
                let sectionID = navElement.getAttribute('name')
                window.scrollTo(0, document.getElementById(sectionID).offsetTop-45);
            }
        })
    }

    // showing pictures of project
    let visibleToHide;
    let invisibleToShow;
    let pictureButtons = document.querySelector('.picture-buttons')

    if (event.target.classList.contains('next-pic')){  

        // if picture modal is open and person clicks on arrow to see next picture
        if (event.target.closest('div') == pictureButtons){
            if (imageClicked.nextElementSibling){
                imageClicked = imageClicked.nextElementSibling
                let imageSrc = imageClicked.getAttribute('srcset')
                pictureModal.firstElementChild.setAttribute('srcset', imageSrc)
            }
        }
        // if picture arrow click on the main page
        else{
            let projectInAction = event.target.parentElement.parentElement
            visibleToHide = projectInAction.querySelector('.project--image.visible')
            invisibleToShow = visibleToHide.nextElementSibling.nextElementSibling  
        }

    }
    else if (event.target.classList.contains('prev-pic')){

        // if picture modal is open and person clicks on arrow to see prev picture
        if (event.target.closest('div') == pictureButtons){
            if (imageClicked.previousElementSibling){
                imageClicked = imageClicked.previousElementSibling
                let imageSrc = imageClicked.getAttribute('srcset')
                pictureModal.firstElementChild.setAttribute('srcset', imageSrc)
            }
        }
        // if picture arrow click on the main page
        else{
            let projectInAction = event.target.parentElement.parentElement
            visibleToHide = projectInAction.querySelector('.project--image.visible').nextElementSibling
            invisibleToShow = visibleToHide.previousElementSibling.previousElementSibling 
        } 
    }

    if (invisibleToShow && visibleToHide){
        invisibleToShow.classList.toggle('visible')
        visibleToHide.classList.toggle('visible')
    }
    

    // if person click on image, it jumps to modal and turns full screen width
    let picturesAreasOfProjects = document.querySelectorAll('.project--image-list')
    picturesAreasOfProjects.forEach(picturesArea =>{
        if (event.target.closest('div') == picturesArea){
            let projectImages = picturesArea.querySelectorAll('.project--image')
            projectImages.forEach(image =>{
                if (event.target == image){
                    let imageSrc = image.getAttribute('srcset') 
                    imageClicked = image
                    pictureModal.firstElementChild.setAttribute('srcset', imageSrc)
                    pictureModal.classList.remove('hidden')
                }
            })
        }
    })
    
    
    // close picture button is clicked
    if (event.target == closePictureBtn){
        pictureModal.classList.add('hidden')
    }

})





