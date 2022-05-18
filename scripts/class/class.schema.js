const Joi = require('@hapi/joi')
module.exports = (app, Mongodb) => {

    updateClassDetails = Joi.object({
        staffName: Joi.string().required(),
        staffId: Joi.number().required(),
        class: Joi.string().required(),
        academicYear: Joi.string().required()
    })

    updateClassAcademicDetails = Joi.object({
        class: Joi.string().required(),
        staffId: Joi.number().required(),
        academicYear: Joi.string().required(),
        academicYearScore: Joi.number().required()
    })
}