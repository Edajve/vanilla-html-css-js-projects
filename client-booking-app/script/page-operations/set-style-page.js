import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";
let selectedServiceIds = []

export function toggleColor(element) {
    const id = element.currentTarget.id;
    const parentElement = document.getElementById(id);
    if (parentElement) parentElement.querySelector('.select-button').classList.toggle('selected')

    pushChoosenServicesToGlobal()
}

function pushChoosenServicesToGlobal() {
    const allPills = getAllPillsId()
    const selectedPills = getIdOfGreenPills(allPills)

    selectedServiceIds = []

    selectedPills.map(element => {
        const elementId = traverseToParent(element)
        selectedServiceIds.push(elementId)
    })

    // update UI based on choosen services from user
    addInvoicePrice(selectedServiceIds)
    addServiceItemToInvoice(selectedServiceIds)
}


function addServiceItemToInvoice() {
    const item = createInvoiceElement()
    page.setServicePage.elements.invoiceListContainer.appendChild(item)

}

/*
TODOS
- make dynamic by passing dynamic name and service amount.
- add a dynamic id to parentDiv
- find out why the dont is working
*/

function createInvoiceElement() {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('single-invoice');

    // parentDiv.id = Math.floor(Math.random() * (50 - 0) + 50).toString() // generated it

    const textDiv = document.createElement('div');
    textDiv.classList.add('invoice-text-div');

    const text = document.createElement('strong');
    text.classList.add('invoice-name');
    text.innerHTML = "EXAMPLE ONE"

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('invoice-price-div');
    priceDiv.innerHTML = "1234"

    const price = document.createElement('p');
    price.classList.add('invoice-price-text');

    textDiv.appendChild(text);
    priceDiv.appendChild(price);

    parentDiv.appendChild(textDiv);
    parentDiv.appendChild(priceDiv);
    
    return parentDiv
}

function addInvoicePrice(listOfChoosenIds) {
    let listOfPrices = []

    listOfChoosenIds.forEach(element => {
        const priceElement = fromParentTo("price", element)
        listOfPrices.push(priceElement)
    })

    let sum = 0
    listOfPrices.forEach(element => {
        const htmlPrice = element.innerHTML
        const priceOnly = Number.parseInt(htmlPrice.substring(1).split('.')[0])
        sum += priceOnly
    })

    updateInvoicePriceUI(sum)
}

const traverseToParent = element => element.parentElement.parentElement.parentElement.parentElement

function fromParentTo(columnName, element) {
    switch (columnName) {
        case "name":
            return element.children[0].children[0]
            break;
        case "description":
            return element.children[0].children[1]
            break;
        case "price":
            return element.children[0].children[2]
            break;
        case "selected":
            return element.children[0].children[3]
            break;
        default:
            console.error("invalid index")
            break;
    }
}

function getIdOfGreenPills(arrayOfIds) {
   const selectedPillsID = []
   for (let i = 0; i < arrayOfIds.length; i++) {
        const element = document.getElementById(`${arrayOfIds[i]}`)
        if (element.classList.contains('selected')) selectedPillsID.push(element)
    }
    return selectedPillsID
}

const getAllPillsId = () => {
    const grandParentDiv = page.setServicePage.elements.divWithIndividualServices
    const parentDiv = Array.from(grandParentDiv.children)

    let arrayOfPills = []
    const FIRST_CHILD_INDEX = 0

    parentDiv.forEach(e => {
        const individualId = e.children[FIRST_CHILD_INDEX]
        .children[4]
        .children[FIRST_CHILD_INDEX]
        .children[FIRST_CHILD_INDEX]
        .id
        arrayOfPills.push(individualId)
    })

    return arrayOfPills
}

const updateInvoicePriceUI = amount => page.setServicePage.elements.mainPriceInInvoive.innerHTML = `$${amount}.00`

const setBookingContainerDiv = page.setServicePage.elements.pageContainer;

export function openPage() {
    setBookingContainerDiv.style.display = ""
    footerComponent.showFooter()
}

export function closePage() {
    setBookingContainerDiv.style.display = 'none'
    footerComponent.closeFooter()
}

export default {
    openPage,
    closePage,
    toggleColor
}