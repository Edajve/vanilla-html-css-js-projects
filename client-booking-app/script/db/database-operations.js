const addService = (data, database) => database.database.services.push(data)

const clearServices = database => database.database.services = []

const addCommentToDb = (text, database) => database.database.serviceComment = text

const addBookingDate = (bookingObject, database) => {
   const updatedDB = {
        ...database.database,
        booking: {
            ...database.database.booking,
            ...bookingObject
        }
    }
    database.database = updatedDB
};

export default {
    addService,
    clearServices,
    addCommentToDb,
    addBookingDate
}