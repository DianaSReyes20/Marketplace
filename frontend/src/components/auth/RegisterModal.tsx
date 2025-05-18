import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../api/authApi';
import { Modal, TextField, Alert, Box, Avatar, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react'; // 👈 Asegúrate de tener este import

// Props para determinar si el modal está abierto y cómo cerrarlo
interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal = ({ open, onClose }: RegisterModalProps) => {
  // Hook de RTK Query para registrar usuarios
  const [register, { isLoading, error }] = useRegisterMutation();
  // Estado para manejar mensajes de éxito o error
  const [successMessage, setSuccessMessage] = useState('');

  
  // Configuración de Formik para el formulario de registro
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    // Validación del formulario usando Yup
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Campo obligatorio'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obligatorio'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden')
        .required('Campo obligatorio'),
    }),
    // Acción al enviar formulario
    onSubmit: async (values) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          role: 'seller'
        }).unwrap();
        setSuccessMessage('¡Usuario registrado exitosamente!');
        
        // Cerrar el modal después de 2 segundos
         setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000); 
      } catch (err) {
        console.error('Error al registrar:', err);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            margin="normal"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            margin="normal"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {error && (
            <Alert severity="error">
              {typeof error === 'string'
                ? error
                : 'data' in error && typeof error.data === 'string'
                  ? error.data
                  : 'Ocurrió un error al registrar.'}
            </Alert>
          )}
          
          <LoadingButton
            type="submit" 
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </LoadingButton>
          
          <Link 
            href="/login" 
            variant="body2"
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Link>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;