import '../styles/style.css'
import MobileMenu from './modules/MobileMenu'

let mobileMenu = new MobileMenu();

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

