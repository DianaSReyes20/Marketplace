import { Container, CssBaseline, Box, Avatar, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useLoginMutation } from '../../api/authApi';
import { useNavigate, Navigate } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import TopBar from '../../components/shared/TopBar';
import type { RootState } from '../../store/store';

// Validación del formulario usando Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('Campo obligatorio'),
  password: Yup.string().min(6, 'Debe tener más de 6 caractéres').required('Campo obligatorio'),
});

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Función para redirigir al registro
  const gotoRegister = () => {
    navigate('/register');
  };

  const user = useSelector((state: RootState) => state.auth.user); // Acceder al usuario autenticado
  const username = 'Iniciar sesión'; // En login siempre va a ser "Iniciar sesión"

  // Redireccionar según el rol del usuario si ya está autenticado
  if (user && user.role === 'seller') {
    return <Navigate to="/dashboard" />;
  } else if (user && user.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <TopBar username={username} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                const response = await login(values).unwrap();
                //console.log('API response:', response);
                
                // Guarda los datos en Redux
                dispatch(setCredentials({
                  user: {
                    id: response.user.id,
                    email: response.user.email,
                    role: response.user.role,
                  },
                  token: response.token,
                }));

                // Redirecciona según el rol
                setTimeout(() => {
                  if (response.user.role === 'seller') {
                    navigate('/dashboard');
                    window.location.href = '/dashboard';
                  } else if (response.user.role === 'admin') {
                    navigate('/admin');
                    window.location.href = '/admin';
                  } else {
                    navigate('/home');
                  }
                }, 100); // Delay para asegurar el cierre del modal
              } catch (error) {
                console.error('Error login:', error);
                setFieldError('email', 'Credenciales inválidas');
                setFieldError('password', 'Credenciales inválidas');
              }
              setSubmitting(false);
            }}
          >
            {({ submitForm }) => (
              <Form>
                <Box sx={{ mt: 1 }}>
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <Field
                    component={TextField}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    loading={isLoading}
                    onClick={submitForm}
                  >
                    Iniciar sesión
                  </LoadingButton>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mb: 2 }}
                    loading={isLoading}
                    onClick={gotoRegister}
                  >
                    Crear cuenta
                  </LoadingButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;