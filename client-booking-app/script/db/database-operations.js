const addService = (data, database) => database.database.services.push(data)

const clearServices = database => database.database.services = []

const addCommentToDb = (text, database) => database.database.serviceComment = text

export default {
    addService,
    clearServices,
    addCommentToDb
}