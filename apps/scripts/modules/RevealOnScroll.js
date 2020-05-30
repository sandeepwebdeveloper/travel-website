import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
 constructor(els, thresholdPersent) {
    this.thresholdPersent = thresholdPersent
    this.itemToReveal = els
    this.browserHeight = window.innerHeight
    this.hideInitially()
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
    this.events()
 }

events() {
    window.addEventListener("scroll", this.scrollThrottle)
    window.addEventListener("resize", debounce(() => { 
        console.log("Resize the window size")
        this.browserHeight = window.innerHeight
    },333))
}

calcCaller() {
   // console.log("Scroll Function Ran")
    this.itemToReveal.forEach (el => {
        if (el.isRevealed == false) {
            this.calculateIfScrolledTo(el)
        }
    })
 }

calculateIfScrolledTo(el) {
   if (window.scrollY + this.browserHeight > el.offsetTop) {
       // console.log("Element was calculated")
    // console.log(el.getBoundingClientRect().y)
     let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
     if (scrollPercent < this.thresholdPersent) {
         el.classList.add ("reveal-item--is-visible")
         el.isRevealed = true
         if (el.isLastItem) {
            window.removeEventListener("scroll", this.scrollThrottle)
         }
     }
   }
}
hideInitially(){
     this.itemToReveal.forEach (el => { 
        el.classList.add("reveal-item")
        el.isRevealed = false
    })
    this.itemToReveal[this.itemToReveal.length - 1].isLastItem = true
 }
}
export default RevealOnScroll;