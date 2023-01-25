import joi from 'joi';

//todo seperate Crud
export const addRolesSchema = joi.object({
    displayName: joi.string().required().messages({
        "string.empty": "نام نقش الزامی میباشد",
        "string.pattern.base": "نام کاربری باید حداقل 8 کاراکتر داشته باشد"
    })
})
