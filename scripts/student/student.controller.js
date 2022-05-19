const url = require('url')

module.exports = (app, Mongodb) => {

    app.post('/createStudentDetails', async(req, res) => {
        try {
            let body = req.body;
            let value = await Mongodb().AdminDetail.findOne({ role: "owner" })
            if (value) {
                let { error } = createStudentDetails.validate(body)
                if (error) {
                    return res.send({ "status": "failure", "message": "Necessary params missing in createStudentDetails body" })
                }
                let result = await Mongodb().StudentDetail.find({ $and: [{ studentId: `${body.studentId}`, academicYear: `${body.academicYear}` }, { $and: [{ rollNo: `${body.rollNo}` }] }] })
                if (result && result.length > 0) {
                    return res.send({ "status": "success", "message":"Already student profile  create"})
                } else {
                    let createNewData = Mongodb().StudentDetail(body)
                    await createNewData.save()
                    return res.send({ "status": "success","message":"New student profile created"})
                }
            } else {
                res.send({ "status": "failure","message":"There is no owner in the database. So can't update or add or delete anything"})
            }
        } catch (error) {
            res.send({ "status": "failure","message":error.message})
        }
    })

    app.get('/showStudentDetails',async(req, res)=>{
        try {
            let url_parts = url.parse(req.url, true)
 
            let { academicYear } = url_parts.query
            let result
            if(academicYear){
             result = await Mongodb().StudentDetail.find({academicYear})
            }
            else{
             result = await Mongodb().StudentDetail.find({})
            }
            if (result) {
                return res.send({ "status": "success", "data": result })
            } else {
                res.send({ "status": "failure", "message": "No student details created" })
            }
        } catch (error) {
            res.send({ "status": "failure","message":error.message})
        }
    })
    app.get('/showStudentFees', async(req, res) => {
        try {
            let url_parts = url.parse(req.url, true)
            let { error } = showStudentFees.validate(url_parts.query)
            if (error) {
                return res.send({ "status": "failure", "message": "Necessary params missing in showStudentFees body" })
            }
            let { studentId, standard } = url_parts.query;

            studentId = +studentId

            let result = await Mongodb().StudentDetail.aggregate([{
                $lookup: {
                    from: 'school_class_fees',
                    localField: 'standard',
                    foreignField: 'standard',
                    as: 'fee_detail'
                }
            }, {
                $unwind: {
                    path: '$fee_detail'
                }
            }, {
                $lookup: {
                    from: 'parents_details',
                    localField: 'studentId',
                    foreignField: 'studentId',
                    as: 'parents_detail'
                }
            }, {
                $unwind: {
                    path: '$parents_detail'
                }
            }, {
                $match: {
                    $and: [{
                        studentId,
                        standard
                    }]
                }
            }, {
                $project: {
                    standard: '$fee_detail.standard',
                    advanceAmount: '$fee_detail.advanceAmount',
                    examFees: '$fee_detail.examFees',
                    bookFees: '$fee_detail.bookFees',
                    yearlyFees: '$fee_detail.yearlyFees',
                    totalFees: '$fee_detail.totalFees',
                    rollNo: 1,
                    studentName: 1,
                    studentId: 1,
                    dob: 1,
                    academicYear: 1,
                    'class': 1,
                    status: 1,
                    fatherName: '$parents_detail.fatherName',
                    email: '$parents_detail.email',
                    mobile: '$parents_detail.mobile'
                }
            }]);
            if (result && result.length > 0)
                return res.send({ "status": "failure","data":result})
            else
                return res.send({ "status": "failure","message":"No data found. Please the studentId and class"})

        } catch (error) {
            res.send({ "status": "failure","message":error.message})
        }
    })

    app.post('/studentPayment', async(req, res) => {
        try {
            let body = req.body;
            console.log(body)
            let createNewData = Mongodb().PaymentDetail(body)
            await createNewData.save()
            return res.send({ "status": "success","message":"Payment payed"})

        } catch (error) {
            res.send({ "status": "failure","message":error.message})
        }
    })

    app.get('/showStudentFeesHistory', async(req, res) => {
        try {
            let url_parts = url.parse(req.url, true)
            let { error } = showStudentFees.validate(url_parts.query)
            if (error) {
                return res.send({ "status": "failure", "message": "Necessary params missing in showStudentFees body" })
            }
            let { studentId, standard } = url_parts.query;

            studentId = +studentId

            let result = await Mongodb().PaymentDetail.findOne({ studentId, standard })
            if (result)
                return res.send({ "status": "failure","data":result})
            else
                return res.send({ "status": "failure","message":"No data found."})

        } catch (error) {
            res.send({ "status": "failure","message":error.message})
        }
    })

}