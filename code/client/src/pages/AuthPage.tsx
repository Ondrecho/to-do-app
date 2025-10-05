import * as Yup from 'yup';
import { useFormik } from 'formik';
import {Link as MUILink, Stack, TextField, Typography, CardContent, CardHeader, FormHelperText, Card, Button, Box} from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import { method } from '../api/methods';
import {Fragment, useContext} from "react"
import { UserContext } from '../Main';

interface Values {
    username: string;
    password: string;
    submit: null;
}

const initialValues: Values = {
    username: '',
    password: '',
    submit: null,
};

const validationSchema = Yup.object({
    username: Yup.string().max(255).required('Username is required'),
    password: Yup.string().max(255).required('Password is required'),
});

const Page: React.FC<{isRegistration: boolean}> = ({isRegistration}) => {

    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                if(isRegistration) {
                    const {data} = await method.user.register({
                        username: values.username,
                        password: values.password
                    });

                    helpers.setStatus({success: true});
                    localStorage.setItem("token", data.token);

                    console.log(data)
                    setUser({...data})

                    setTimeout(() => {
                        navigate("/")
                    }, 200)
                }
                else {
                    const {data} = await method.user.login({
                       username: values.username, 
                       password: values.password
                    });

                    helpers.setStatus({success: true});
                    localStorage.setItem("token", data.token);

                    setUser({
                        isAuthenticated: true,
                        username: data.user.username,
                        password: data.user.password,
                        id: data.user.id,
                    })

                    setTimeout(() => {
                        navigate("/")
                    }, 200)
                }
            } 
            catch (err) {
                console.error(err);
                helpers.setStatus({success: false});
                formik.setErrors({
                    submit: err.response.data.error
                });
            }
        },
    });


    return (
        <Fragment>
            <Box sx={{width: "100%", height: "calc(100vh - 300px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Card elevation={16} sx={{width: "500px", height: "auto"}}>
                    <CardHeader
                        subheader={
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                {isRegistration ? "Already have an account?" : "Dont have an account?"}
                                
                                <MUILink
                                    sx={{marginLeft: "5px"}}
                                    component={Link}
                                    to={isRegistration ? "/login" : "/register"}
                                >
                                    {isRegistration ? "Log in" : "Register"}
                                </MUILink>
                            </Typography>
                        }
                        sx={{ p: "0 3", marginBottom: "10px" }}
                        title={isRegistration ? "Register" : "Log in"}
                    />
                    <CardContent sx={{ p: "0 3" }}>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3} sx={{marginBottom: "20px"}}>
                                <TextField
                                    autoFocus
                                    error={!!(formik.touched.username && formik.errors.username)}
                                    fullWidth
                                    helperText={formik.touched.username && formik.errors.username}
                                    label="Username"
                                    name="username"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="username"
                                    value={formik.values.username}
                                />
                                <TextField
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <FormHelperText
                                    error
                                    sx={{ mt: 3 }}
                                >
                                    {formik.errors.submit as string}
                                </FormHelperText>
                            )}
                            <Button
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                sx={{ mt: 2 }}
                                type="submit"
                                variant="contained"
                            >
                                {isRegistration ? "Register" : "Log In"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Fragment>
    );
};

export default Page;
