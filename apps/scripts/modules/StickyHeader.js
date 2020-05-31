import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'


class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.browserHeight = window.innerHeight
        this.previousScrollY = window.scrollY
        this.events()
    }
    events(){
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
        window.addEventListener("resize", debounce(() => { 
           // console.log("Resize the window size")
            this.browserHeight = window.innerHeight
        },333))
    }
    runOnScroll() {
        this.determineScrollDirection()

        if (window.scrollY > 60) { 
            this.siteHeader.classList.add("site-header--dark")
        } else {
            this.siteHeader.classList.remove("site-header--dark")
        }

        this.pageSections.forEach(elp => this.calcSection(elp))
    }
    determineScrollDirection() {
        //console.log("Size: " + this.previousScrollY)
        if(window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'

            //console.log("Window Scroll Y: " + window.scrollY + " Previous Scroll Y: " + this.previousScrollY)
            //console.log("Scroll Direction D: " + this.scrollDirection)
        } else {
            this.scrollDirection = 'up'
           
            //console.log("Window Scroll Y: " + window.scrollY + " Previous Scroll Y: " + this.previousScrollY)
            //console.log("Scroll Direction U: " + this.scrollDirection)
        }
        this.previousScrollY = window.scrollY
    }
    calcSection(elp) {
        if (window.scrollY + this.browserHeight > elp.offsetTop && window.scrollY < elp.offsetTop + elp.offsetHeight) {
            let scrollPersent = elp.getBoundingClientRect().y / this.browserHeight * 100
            if (scrollPersent < 18 && scrollPersent > -0.1 && this.scrollDirection == 'down' || this.scrollPersent < 33 && this.scrollDirection == 'up') {
                let matchingLink = elp.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(elp => elp.classList.remove("is-current-link"))
                document.querySelector(matchingLink).classList.add("is-current-link")
            }
        }
    }
}
export default StickyHeader