import Joi from "joi";

export const validationSchema: Joi.ObjectSchema<Record<string, string>> = Joi.object({
    SOCKET_PATH: Joi.string().required(),
});
