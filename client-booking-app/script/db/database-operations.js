const addService = (data, database) => {
    database.database.services.push(data)
    console.log(database)
};

const clearServices = (database) => {
    database.database.services = []
}

export default {
    addService,
    clearServices
}