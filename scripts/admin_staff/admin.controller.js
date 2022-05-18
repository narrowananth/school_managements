module.exports = (app, Mongodb) => {

    app.post('/createAdminDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (value) {
                return res.send({ "status": "success", "message": "Admin user already exists in the database. So can't create a new one" })
            } else {
                let { error } = createAdminDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in createAdminDetails body" })
                }
                body.role = "owner"
                let createNewData = Mongodb().AdminDetail(body)
                await createNewData.save()
                return res.send({ "status": "success", "message": "New owner detail is created" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.post('/createStaffDetails', async(req, res) => {
        try {
            let body = req.body;

            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (value) {
                let { error } = createStaffDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in createStaffDetails body" })
                }
                body.role = "viewer"
                let result = await Mongodb().StaffDetail.findOne({ staffId: `${body.staffId}` })

                if (result) {
                    return res.send("Already staff created")
                } else {
                    let createNewData = Mongodb().StaffDetail(body)
                    await createNewData.save()
                    return res.send("New staff created")
                }
            } else {
                res.send("There is no owner in the database. So can't update or add or delete anything")
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

    app.post('/createFeesDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (!value) {
                return res.send("There is no owner in the database. So can't update or add or delete anything")
            } else {
                let { error } = createFeesDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in createFeesDetails body" })
                }
                let result = await Mongodb().FeeDetail.findOne({ standard: `${body.standard}` })

                if (result) {
                    return res.send("Already class fees is created")
                } else {
                    body.totalFees = body.advanceAmount + body.yearlyFees + body.examFees + body.bookFees
                    let createNewData = Mongodb().FeeDetail(body)
                    await createNewData.save()
                    return res.send("New class fees is created")
                }
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })


    app.post('/updateStaffDetails', async(req, res) => {
        try {
            let body = req.body;

            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })

            if (value) {
                let { error } = updateStaffDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in updateStaffDetails body" })
                }
                let result = await Mongodb().StaffDetail.findOne({ staffId: `${body.staffId}` })
                if (result) {
                    await Mongodb().StaffDetail.updateOne({ staffId: `${body.staffId}` }, { "$set": { role: `${body.role}`, access: [`${body.access}`] } })
                    return res.send("Updated class details")
                } else {
                    return res.send("No data found")
                }
            } else {
                res.send("There is no owner in the database. So can't update or add or delete anything")
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })


    app.get('/readStaffDetails', async(req, res) => {
        try {
            let result = await Mongodb().StaffDetail.find({})

            if (result) {
                return res.send(result)
            } else {
                res.send("No class created")
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })


    app.delete('/deleteStaffDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })

            if (value) {
                let result = await Mongodb().StaffDetail.findOneAndDelete({ staffId: `${body.staffId}` })
                if (result) {
                    return res.send("Class is deleted successfully")
                } else {
                    return res.send("No class found")
                }
            } else {
                res.send("There is no owner in the database. So can't update or add or delete anything")
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })
}