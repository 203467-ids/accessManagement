import { validate, ValidationError } from "class-validator";
import { User } from "../entities/user";

export class UserValidate {
    public user: User;

    constructor(user: User) {
        this.user = user;
    }

    public async validate() {
        try {
            await validate(this.user);
        } catch (errors) {
            if (errors instanceof Array) {
                const validationErrors: any[] = errors.map((error: ValidationError) => {
                    let property = error.property;
                    let errorMessages = Object.values(error.constraints || {});
                    return {
                        property,
                        errorMessages
                    };
                });

                throw {
                    http_status: 422,
                    validations: validationErrors
                };
            }
        }
    }
}
