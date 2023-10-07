export const page = {
    allPages: {
        pageContainerClasses: document.querySelectorAll('.page-step'),
    },
    navBar: {
        elements: {
            allProgressionBars: document.querySelectorAll('.single-progress-bar'),
            progressStepsText: document.querySelector('.progression-comment-container'),
            pricesText: document.getElementById('prices'),
            bookingPolicyText: document.getElementById('booking-rules'),
            aboutMeText: document.getElementById('about-me')
        }
    },
    homePage: {
        elements : {
            pageContainer: document.querySelector('.homepage-main-container'),
            setBookingBtn: document.querySelector('.homepage-cta-button')
        }
    },
    setServicePage: {
        elements: {
            pageContainer: document.querySelector('.set-styles-main-container'),
            textArea: document.getElementById('comment'),
            submitButton: document.getElementById('submit-btn'),
            fileDownloadBtn: document.getElementById('myFile'),
            formInput: document.getElementById('myForm'),
            selectedBar: document.getElementById('selected-bar'),
            allIndividualServices: document.querySelectorAll('.item'),
            mainPriceInInvoive: document.querySelector('.number-price'),
            divWithIndividualServices: document.getElementById('table-container-for-available-items'),
            invoiceListContainer: document.querySelector('.service-info-div'),
            commentTextInInvoice: document.querySelector('.xc'),
            photoTextInInvoice: document.querySelector('.status')
        }
    },
    setBookingPage: {
        elements: {
            mainContainer: document.querySelector('.main-kyc-container'),
            allSubPages: document.querySelectorAll('.kyc-sub-pages')
        },
        subPage: {
            monthUI: {
                elements: {
                    container: document.querySelector('.month-year-container'),
                    nextButton: document.getElementById('date-next-btn'),
                    allCalendarSpaces: document.querySelectorAll('.day-item-space'),
                    leftMonthSlider: document.getElementById('left-month-slider'),
                    rightMonthSlider: document.getElementById('right-month-slider'),
                    calendayTime: document.getElementById('calendar-month-year'),
                    highlightedCalendarSlot: document.querySelectorAll('.highlighted')
                }
            },
            dayUI: {
                elements: {
                    container: document.querySelector('.specific-day'),
                    nextButton: document.getElementById('specific-day-next-btn')
                }
            },
            finalizeUI: {
                elements: {
                    container: document.querySelector('.finalize-date')
                }
            }
        }
    },
    pricesPage: {
        elements: {
            pageContainer: document.querySelector('.main-prices-container'),
            leftChevron: document.querySelector('.prices-back-btn')
        }
    },
    bookinPolicyPage: {
        elements: {
            pageContainer: document.querySelector('.mainner'),
            leftChevron: document.getElementById('back-btn-in-policy-page')
        }
    },
    aboutMePage: {
        elements: {
            pageContainer: document.getElementById('about-me-id'),
            leftChevron: document.getElementById('back-btn-in-about-me-page')
        }
    },
    footer: {
        elements: {
            pageContainer: document.getElementById('footer-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn')
        }
    }
}
