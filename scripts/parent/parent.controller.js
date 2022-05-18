module.exports = (app, Mongodb) => {

    app.post('/createParentDetails', async(req, res) => {
        try {
            let body = req.body;

            let { error } = createParentDetails.validate(body)
            if (error) {
                console.error(error);
                return res.send({ "status": "failure", "message": "Necessary params missing in createParentDetails body" })
            }

            let findStudentDetails = await Mongodb().StudentDetail.findOne({ studentId: `${body.studentId}`, status: "active" })
            if (findStudentDetails) {
                let value = await Mongodb().StaffDetail.findOne({ staffId: `${body.staffId}`, role: "admin" })
                console.log(value)
                value = value ?.access[0]
                value = value ?.split(',')
                value = value ?.filter(obj => obj === `${findStudentDetails.class}`).toString() ? true : false
                if (value) {
                    let result = await Mongodb().ParentsDetail.find({ studentId: `${body.studentId}` })
                    if (result && result.length > 0) {
                        return res.send({ "status": "success", "message": "Already parents details available" })
                    } else {
                        let createNewData = Mongodb().ParentsDetail(body)
                        await createNewData.save()
                        return res.send({ "status": "success", "message": "New parents details added successfully" })
                    }
                } else {
                    return res.send({ "status": "failure", "message": "You don't have permission to create parents details" })
                }
            } else {
                return res.send({ "status": "failure", "message": "StudentDetail is not found. Please check and try again" })
            }
        } catch (error) {
            res.send({ "status": "failure", "message": error.message })
        }
    })

}