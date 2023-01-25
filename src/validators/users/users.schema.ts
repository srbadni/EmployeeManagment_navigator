import joi from 'joi';

const UserSchema = joi.object({
    name: joi.string().regex(/^[ئ,. آ-ی]+$/).trim().min(1).required().messages({
        "string.empty": "نام الزامی میباشد",
        "string.pattern.base": "فقط حروف فارسی مجاز است"
    }),
    userName: joi.string().min(4).regex(/^[,. a-zA-Z0-9]+$/).trim().min(1).required().messages({
        "string.empty": "نام کاربری الزامی میباشد",
        "string.min": "رمز عبور حتما باید 4 حرف داشته باشد",
        "string.pattern.base": "نام کاربری باید لاتین باشد"
    }),
    password: joi.string().required().trim().min(6).messages({
        "string.min": "رمز عبور حتما باید 6 حرف داشته باشد",
        "string.empty": "رمز عبور الزامی میباشد",
    }),
    confirmPassword: joi.string().required().trim().min(6).messages({
        "string.min": "تکرار رمز عبور حتما باید 6 حرف داشته باشد",
        "string.empty": "تکرار رمز عبور الزامی میباشد",
    }),
})

const EditUserSchema = joi.object({
    name: joi.string().regex(/^[ئ,. آ-ی]+$/).trim().required().messages({
        "string.empty": "نام الزامی میباشد",
        "string.pattern.base": "فقط حروف فارسی مجاز است"
    }),
    userName: joi.string().min(4).regex(/^[,. a-zA-Z0-9]+$/).trim().required().messages({
        "string.empty": "نام کاربری الزامی میباشد",
        "string.min": "رمز عبور حتما باید 4 حرف داشته باشد",
        "string.pattern.base": "نام کاربری باید لاتین باشد"
    })
})

const UserSchemaInitialValues = {
    name: "",
    userName: "",
    password: "",
    confirmPassword: ""
};

const EditUserSchemaInitialValues = {
    name: "",
    id: "",
    userName: ""
}

export {UserSchema, UserSchemaInitialValues, EditUserSchemaInitialValues, EditUserSchema}
