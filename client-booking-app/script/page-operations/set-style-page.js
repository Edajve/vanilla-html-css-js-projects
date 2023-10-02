import { page } from "../component-elements.js";
import footerComponent from "./footer-component.js";
import database from "../db/database.js";
import databaseOperations from "../db/database-operations.js";

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
    displayServicesInInvoice(selectedServiceIds)
    
}

function displayServicesInInvoice(services) {
    const invoiceListContainer = page.setServicePage.elements.invoiceListContainer

    clearInvoiceServices(invoiceListContainer)
    databaseOperations.clearServices(database)

    services.forEach(parentContainer => {
        const nameOfProduct = fromParentTo("name", parentContainer).innerHTML
        const priceOfProduct = fromParentTo("price", parentContainer).innerHTML.substring(1).split('.')[0]
        const parentDiv = createInvoiceElement(nameOfProduct, priceOfProduct)

        invoiceListContainer.appendChild(parentDiv)
        addServiceToDatabase(parentDiv, database)
    })
}

function addServiceToDatabase(element, db) {
    const serviceTemplate = {
        id: "",
        name: "",
        price: 0
    }

    const productId = element.id
    const productName = fromParentTo("name", element).innerHTML
    const productPrice = element.children[1].innerHTML.substring(1).split('.')[0]

    serviceTemplate.id = productId
    serviceTemplate.name = productName
    serviceTemplate.price = productPrice    

    databaseOperations.addService(serviceTemplate, db)
}

const clearInvoiceServices = containerDiv => containerDiv.innerHTML = ''

function createInvoiceElement(serviceName, serviceAmount) {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('single-invoice');

    const itemId = Math.floor(Math.random() * (50000 - 0) + 50000).toString()
    parentDiv.id = itemId

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

const updateInvoicePriceUI = amount => page.setServicePage.elements.mainPriceInInvoive.innerHTML = `$${amount}.00`

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

const setBookingContainerDiv = page.setServicePage.elements.pageContainer;

export function openPage() {
    setBookingContainerDiv.style.display = ""
    footerComponent.showFooter()
}

export function closePage() {
    setBookingContainerDiv.style.display = 'none'
    footerComponent.closeFooter()
}

function onSubmit() {
    const textArea = page.setServicePage.elements.textArea
    const input = textArea.value
    if (input === '') return
    databaseOperations.addCommentToDb(input, database)

    const commentTextInInvoice = page.setServicePage.elements.commentTextInInvoice
    commentTextInInvoice.innerHTML = "Comment Received"
    commentTextInInvoice.classList.add('green')
}

function onPhotoSubmit(event) {
    const file = page.setServicePage.elements.fileDownloadBtn

    event.preventDefault()
    const selectedFile = file.files[0]


    if (selectedFile) {
        const photoTextInInvoice = page.setServicePage.elements.photoTextInInvoice
        photoTextInInvoice.innerHTML = "Photo Recieved"
        photoTextInInvoice.classList.add('green')

        //need to do something with the photo, but just leaving it here
        // const fileName =  selectedFile.name
        // const fileType =  selectedFile.type
    } else {
        console.log("No file selected.");
    }
}

page.setServicePage.elements.submitButton.addEventListener('click', onSubmit)
page.setServicePage.elements.formInput.addEventListener('submit', event => onPhotoSubmit(event))

export default {
    openPage,
    closePage,
    toggleColor
}