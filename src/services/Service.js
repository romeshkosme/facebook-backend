import moongose from 'mongoose';

class Service {
    constructor(model){
        this.model = model
        this.getAll = this.getAll.bind(this)
        this.get = this.get.bind(this)
        this.insert = this.insert.bind(this)
        // this.insertMany = this.insertMany.bind(this)
        this.updateOne = this.updateOne.bind(this)
        this.update = this.update.bind(this)
    }

    getAll(query) {
        return new Promise((resolve, reject) => {
            this.model.find(query)
            .then(docs => {
                resolve(docs)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    get(data) {
        return new Promise((resolve, reject) => {
            this.model.findOne(data)
            .then(doc => {
                resolve(doc)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            console.log("insert :: ", data)
            this.model.create(data)
            .then(doc => {
                resolve(doc)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    updateOne(filter, data, options=({upsert: false})) {
        return new Promise((resolve, reject) => {
            this.model.updateOne(filter, data, option)
            .then(doc => {
                resolve(doc)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    update(filter, data) {
        return new Promise((resolve, reject) => {
            this.model.update(filter, data)
            .then(docs => {
                resolve(docs)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}

export default Service;