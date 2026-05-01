import { useFormik, type FormikValues } from "formik";
import { useState, type FunctionComponent } from "react";
import * as yup from "yup";
import type { Habit } from "../../../interfaces/Habit";
import { createHabit } from "../../../services/habit";

const DEFAULT_COLORS = ["#00675F", "#29ABE2", "#7B68EE", "#CC77DD", "#FF4F81", "#FF7F3F", "#FFB400"];


interface CreateHabitProps {
    onHide: Function;
    refresh: Function
}

const CreateHabit: FunctionComponent<CreateHabitProps> = ({ onHide, refresh }) => {

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const formik: FormikValues = useFormik<Habit>({
        initialValues: {
            name: "",
            color: "",
            image: "",
        },
        validationSchema: yup.object({
            name: yup.string().required().min(1),
            color: yup.string().required().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Must be a valid HEX color"),
            image: yup.mixed().nullable().optional()
        }),
        onSubmit: (values) => {
            createHabit(values).then(() => {
                onHide();
                refresh();
            }).catch((err) => { console.log(err); })
        }
    })

    return (
        <>
            <div className="create-habit">
                <form onSubmit={formik.handleSubmit}>

                    {/* name */}
                    <div className="create-habit--field">

                        <div className="create-habit--label">
                            <label htmlFor="name">HABIT NAME</label>
                        </div>
                        <div className="create-habit--name" >
                            <input
                                type="text"
                                placeholder="e.g. Master Rust Concurrency" name="name" id="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name} />
                            {formik.touched.name && formik.errors.name && <span className="text-danger">{formik.errors.name}</span>}
                        </div>

                    </div>
                    {/* color pciker + row of colors */}
                    <div className="create-habit--field">

                        <div className="create-habit--label">
                            <label htmlFor="color">VISUAL IDENTITY</label>
                        </div>
                        <div className="create-habit--color-list" >
                            <ul>
                                {DEFAULT_COLORS.map((color) => (
                                    <li key={color} className="create-habit--color-cirlce" >
                                        <button type="button" className={`create-habit--preset-circle ${formik.values.color === color ? "active" : ""}`} style={{ backgroundColor: color, }}
                                            onClick={() => formik.setFieldValue("color", color)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="create-habit--color">
                            <div className="create-habit--color-field" >
                                <span className="create-habit--hex-label">HEX</span>
                                <input type="text" value={formik.values.color} onChange={(e) => formik.setFieldValue("color", e.target.value)} />
                            </div>
                            <div className="create-habit--color-picker" >
                                <input type="color" id="color-picker" value={formik.values.color} onChange={(e) => formik.setFieldValue("color", e.target.value)} /* style={{ display: "none" }} */ />
                                <label htmlFor="color-picker" className="create-habit--color-preview" style={{ backgroundColor: formik.values.color }} ></label>
                            </div>
                        </div>
                        {formik.touched.color && formik.errors.color && <span className="text-danger">{formik.errors.color}</span>}
                    </div>
                    {/* drag and drop file */}
                    <div className="create-habit--field">
                        <div className="create-habit--label">
                            <label>UPLOAD IMAGE</label>
                        </div>
                        <div className="create-habit--file" >
                            <div>
                                <input type="file" id="image" onChange={(event) => {
                                    const file = event.currentTarget.files?.[0];
                                    if (!file) return;
                                    formik.setFieldValue("image", file);
                                    setImagePreview(URL.createObjectURL(file));
                                    console.log(imagePreview);
                                }} accept=".svg,.png,.jpg,.jpeg" style={{ display: "none" }} />
                            </div>
                            <div className="create-habit--file-content" >
                                <label htmlFor="image">
                                    {imagePreview ? (
                                        <div className="create-habit--file-preview">
                                            <img src={imagePreview} alt="preview" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="create-habit--file-icon" ><i className="fa-regular fa-file"></i></div>
                                            <div className="create-habit--file-text" >
                                                <div>Drag and drop assets here</div>
                                                <div>SVG, PNG, or JPG (max 2MB)</div>
                                            </div>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* sumbit button */}
                    <div className="create-habit--actions">
                        <div className="create-habit--close" >
                            <button onClick={() => onHide()} >Draft Habit</button>
                        </div>
                        <div className="create-habit--submit" >
                            <button type="submit" disabled={!formik.dirty || !formik.isValid} >Architect Habit</button>{/* {formik.isSubmitting ? "Architecting..." : "Architect Habit"} */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateHabit;