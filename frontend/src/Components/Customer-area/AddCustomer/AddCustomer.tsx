import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { CustomerModel } from "../../../Models/Customer.model";
import { errorsService } from "../../../Services/GlobalServices/GlobalErrorsService";
import { GlobalPaths } from "../../../Services/GlobalServices/GlobalPaths";
import { createNewCustomerAsync } from "../../../Services/Http_Services/Customers_service";
import "./AddCustomer.scss";

function AddCustomer() {

    const history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>();

    async function submit(_customer: CustomerModel): Promise<void> {
        try {
            await createNewCustomerAsync(_customer)
            history.push(GlobalPaths.customerHandlerUrl);
        } catch (error) {
            console.log(errorsService.getError(error));
        }
    }

    const handleErrorByName = (name: string) => {

        const errorType = errors[name].type;
        if (errorType === 'required') return `${name} is required!`;

        if (errorType === 'minLength') return `${name} min length is 2`;
        if (errorType === 'maxLength') return `${name} max length is 50`;

        if (errorType === 'pattern' && name === "phone") return `Phone Format 689-147-8731`;
        if (errorType === 'pattern' && name === "email") return `Email Format guest@gmail.com`;
    }



    return (
        <div className="AddCustomer">
            <h2>Create New Customer</h2>
            <form onSubmit={handleSubmit(submit)}>
                <table>
                    <tbody>
                        <tr>
                            <td>First name:</td>
                            <td>
                                <input type="text" name="first_name" {...register("first_name", { required: true, minLength: 2, maxLength: 50 })} />
                            </td>
                        </tr>
                        {
                            errors?.first_name &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('first_name')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Last name:</td>
                            <td>
                                <input type="text" name="last_name" {...register("last_name", { required: true, minLength: 2, maxLength: 50 })} />
                            </td>
                        </tr>
                        {
                            errors?.last_name &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('last_name')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Email:</td>
                            <td>
                                <input type="email" name="email" {...register("email", { required: true, pattern: /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/ })} />
                            </td>
                        </tr>
                        {
                            errors?.email &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('email')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Phone:</td>
                            <td>
                                <input type="tel" name="phone" {...register("phone", { required: true, pattern: /[0-9]{3}-[0-9]{3}-[0-9]{4}/ })} />
                            </td>
                        </tr>
                        {
                            errors?.phone &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('phone')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Country:</td>
                            <td>
                                <input type="text" name="country" {...register("country", { required: true, minLength: 2, maxLength: 50 })} />
                            </td>
                        </tr>
                        {
                            errors?.country &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('country')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>City:</td>
                            <td>
                                <input type="text" name="city" {...register("city", { required: true, minLength: 2, maxLength: 50 })} />
                            </td>
                        </tr>
                        {
                            errors?.city &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('city')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Street:</td>
                            <td>
                                <input type="text" name="street" {...register("street", { required: true, minLength: 2, maxLength: 50 })} />
                            </td>
                        </tr>
                        {
                            errors?.street &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('street')}
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>Gender:</td>
                            <td>
                                <select name="gender" {...register("gender", { required: true })}  >
                                    <option value="Male">Male</option>
                                    <option value="Male">Female</option>
                                    <option value="Male">Other</option>
                                </select>
                            </td>
                        </tr>
                        {
                            errors?.gender &&
                            <tr>
                                <td></td>
                                <td className="error">
                                    {handleErrorByName('gender')}
                                </td>
                            </tr>
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><button>Send</button></td>
                        </tr>
                    </tfoot>

                </table>
            </form>
        </div >
    );

}

export default AddCustomer;
