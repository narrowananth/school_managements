const url = require('url')

module.exports = (app, Mongodb) => {

    app.post('/createClassDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (value) {
                let result = await Mongodb().ClassDetail.findOne({ class: `${body.class}` })

                if (result) {
                    return res.send({ "status": "failure", "message": "Already class create" })
                } else {
                    let createNewData = Mongodb().ClassDetail(body)
                    await createNewData.save()
                    return res.send({ "status": "success", "message": "New class created" })
                }
            } else {
                res.send({ "status": "failure", "message": "There is no owner in the database. So can't update or add or delete anything" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.post('/updateClassDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })

            if (value) {
                let { error } = updateClassDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in updateClassDetails body" })
                }
                let result = await Mongodb().ClassDetail.findOne({ class: `${body.class}` })
                if (result) {
                    await Mongodb().ClassDetail.updateOne({ class: `${body.class}` }, { "$set": { staffName: `${body.staffName}`, staffId: `${body.staffId}`, academicYear: `${body.academicYear}` } })
                    return res.send({ "status": "success", "message": "Updated class details" })
                } else {
                    return res.send({ "status": "failure", "message": "No data found" })
                }
            } else {
                res.send({ "status": "failure", "message": "There is no owner in the database. So can't update or add or delete anything" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.post('/updateClassAcademicDetails', async(req, res) => {
        try {
            let body = req.body;
            let { error } = updateClassAcademicDetails.validate(body)
            if (error) {
                return res.send({ "status": "failure", "message": "Necessary params missing in updateClassAcademicDetails body" })
            }
            let value = await Mongodb().StaffDetail.findOne({ staffId: `${body.staffId}`, role: "admin" })
            value = value ?.access[0]
            value = value ?.split(',')
            value = value ?.filter(obj => obj === `${body.class}`).toString() ? true : false
            if (value) {
                let result = await Mongodb().ClassDetail.findOne({ class: `${body.class}`, academicYear: `${body.academicYear}` })
                if (result) {
                    await Mongodb().ClassDetail.updateOne({ class: `${body.class}`, academicYear: `${body.academicYear}` }, { "$set": { academicYearScore: `${body.academicYearScore}` } })
                    return res.send({ "status": "succeess", "message": "Updated class details" })
                } else {
                    return res.send({ "status": "failure", "message": "No data found" })
                }
            } else {
                res.send({ "status": "failure", "message": "You dont have a permissions to access this database" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.get('/getClassAcademicDetails', async(req, res) => {
        try {
            let url_parts = url.parse(req.url, true)

            let { standard, academicYear } = url_parts.query;
            let value
            if (standard && academicYear) {
                value = await Mongodb().ClassDetail.find({ standard, academicYear }).sort({ academicYearScore: -1 })
                return res.send({ "status": "sucsces", "data": value[0] })
            } else if (standard) {
                value = await Mongodb().ClassDetail.find({ standard }).sort({ academicYearScore: -1 })
                return res.send({ "status": "success", "data": value[0] })
            } else if (academicYear) {
                value = await Mongodb().ClassDetail.find({ academicYear }).sort({ academicYearScore: -1 })
                return res.send({ "status": "success", "data": value[0] })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.get('/readClassDetails', async(req, res) => {
        try {
            let url_parts = url.parse(req.url, true)
            let { classs } = url_parts.query;
            let result
            if (classs) {
                result = await Mongodb().ClassDetail.findOne({ class: `${classs}` })
            } else {
                result = await Mongodb().ClassDetail.find({})
            }

            if (result) {
                return res.send({ "status": "success", "data": result })
            } else {
                res.send({ "status": "failure", "message": "No class created" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })


    app.delete('/deleteClassDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (value) {
                let result = await Mongodb().ClassDetail.findOneAndDelete({ class: `${body.class}` })
                if (result) {
                    return res.send({ "status": "success", "message": "Class is deleted successfully" })
                } else {
                    return res.send({ "status": "failure", "message": "No class found" })
                }
            } else {
                res.send({ "status": "failure", "message": "There is no owner in the database. So can't update or add or delete anything" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })
}