import { useFormik, type FormikValues } from "formik";
import type { FunctionComponent } from "react";
import * as yup from 'yup'
import type { UserLogin } from "../interfaces/User";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";



interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    const auth = useAuth()

    const formik: FormikValues = useFormik<UserLogin>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().required("Email or password are incorrect").email(),
            password: yup.string().required("Email or password are incorrect").min(8)
        }),
        onSubmit: (values) => {
            auth?.login(values);
        }
    });

    return (
        <>

            <div className="container  login-container">

                <div className="login shadow ">

                    <div className="row">
                        <div className="col">

                            <div className="login--right">

                                <div className="login--right-head" >
                                    <div>
                                        <img src="" alt="" />
                                    </div>
                                    <div>
                                        <h1 className="fw-bold " >Habit Tracker</h1>
                                    </div>
                                </div>

                                <div className="login--subheading">
                                    <div className="login--subheading-title" >
                                        <h2 className="fw-semibold" >Welcome back.</h2>
                                    </div>
                                    <div className="login--subheading-subtitle">
                                        <h3>Continue your habit-crafting journey.</h3>
                                    </div>
                                </div>

                                <div className="login--form-container">
                                    <form action="" onSubmit={formik.handleSubmit} >

                                        <div className="d-flex flex-column login--input">

                                            <label htmlFor="email" className="login--input-label" >EMAIL ADDRESS</label>
                                            <input type="email" id="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                                            {formik.touched.email && formik.errors.email && <p className="text-danger login--input-error" >{formik.errors.email}</p>}

                                        </div>

                                        <div className=" d-flex flex-column login--input">

                                            <label htmlFor="password" className="login--input-label">PASSWORD</label>
                                            <input type="password" id="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" />
                                            {formik.touched.password && formik.errors.password && <p className="text-danger login--input-error" >{formik.errors.password}</p>}

                                        </div>

                                        <div className="login--submit mb-2">
                                            <button type="submit" className="btn w-100 fw-bold" disabled={!(formik.isValid && formik.dirty)} >Sign In</button>
                                        </div>

                                        <div className="login--register text-center" >
                                            <span>New to the craft? <Link to={'/register'}>Create Account</Link></span>
                                        </div>

                                    </form>
                                </div>

                            </div>

                        </div>

                        <div className="col">

                            <div className="login--left">
                                <div className="login--left-img" >
                                    <img src="/sign_in_background.png" alt="login background img" />
                                </div>

                                <div className="login--box">
                                    <div className="login--box-head">
                                        <div>• ACTIVE SPRINT</div>
                                    </div>
                                    <div className="login--box-body">
                                        <div className="login--box-title">
                                            <h2>Architect Your<br></br><span>Success</span>.</h2></div>
                                        <div className="login--box-subtitle">
                                            Transform your development cycles into consistent rituals. High-performance habits built for the modern engineer.</div>
                                    </div>
                                    <div className="login--box-footer">
                                        <div className="login--box-achivments">
                                            <div className="login--box-achivments-text">
                                                GLOBAL STREAK
                                            </div>
                                            <div className="login--box-achivments-numbers" >
                                                1,204
                                            </div>
                                        </div>
                                        <div className="login--box-achivments different-color ">
                                            <div className="login--box-achivments-text">
                                                COMMITS LOGGED
                                            </div>
                                            <div className="login--box-achivments-numbers" >
                                                42.8k
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;