import '../styles/style.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import ClientArea from './modules/ClientArea'
//new Modal()
//alert("This is Testing")
new ClientArea()
let mobileMenu = new MobileMenu()
let stickyHeader = new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
                modal = new x.default()
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("There was problem"))
        } else {
            modal.openTheModal()
        }
    })
})

if (module.hot) {
    module.hot.accept()
}
/*
class Adult extends Person {
    payTaxes() {
        console.log(this.name + " now owes zero taxes.");
    }
}
let john = new Person("John Doe", "Blue");
john.greet();
let jane = new Adult("Jane Smith ", "Green");
//john.greet();
jane.payTaxes(); */

