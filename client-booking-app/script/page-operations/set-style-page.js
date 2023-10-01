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

function addServiceItemToInvoice(services) {
    const invoiceListContainer = page.setServicePage.elements.invoiceListContainer

    clearListItemContainer(invoiceListContainer)

    services.forEach(parentContainer => {
        const nameOfProduct = fromParentTo("name", parentContainer).innerHTML
        const priceOfProduct = fromParentTo("price", parentContainer).innerHTML.substring(1).split('.')[0]
        const item = createInvoiceElement(nameOfProduct, priceOfProduct)
        invoiceListContainer.appendChild(item)
    })
}

const clearListItemContainer = containerDiv => containerDiv.innerHTML = ''

function createInvoiceElement(serviceName, serviceAmount) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('single-invoice');

    parentDiv.id = Math.floor(Math.random() * (50000 - 0) + 50000).toString() // generated id

    const textDiv = document.createElement('div');
    textDiv.classList.add('invoice-text-div');

    const text = document.createElement('strong');
    text.classList.add('invoice-name');
    text.innerHTML = `${serviceName}`

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('invoice-price-div');
    priceDiv.innerHTML = `$${serviceAmount}.00`

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
        case "description":
            return element.children[0].children[1]
        case "price":
            return element.children[0].children[2]
        case "selected":
            return element.children[0].children[3]
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