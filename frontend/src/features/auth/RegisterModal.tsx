import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../api/authApi';
import { Modal, TextField, Button, Alert } from '@mui/material';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal = ({ open, onClose }: RegisterModalProps) => {
  const [register, { isLoading, error }] = useRegisterMutation();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('Requerido'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden')
        .required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          role: 'seller'
        }).unwrap();
        onClose();
      } catch (err) {
        console.error('Error al registrar:', err);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
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
        
        {/* Campos para password y confirmPassword similares */}
        
        {error && (
          <Alert severity="error">
            {typeof error === 'string'
              ? error
              : 'data' in error && typeof error.data === 'string'
                ? error.data
                : 'Ocurrió un error al registrar.'}
          </Alert>
        )}
        
        <Button 
          type="submit" 
          disabled={isLoading}
        >
          Registrarse
        </Button>
      </form>
    </Modal>
  );
};

export default RegisterModal;