import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddProductMutation } from '../../api/productsApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

// Props para determinar si el modal está abierto y cómo cerrarlo
interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductFormModal = ({ open, onClose }: ProductFormModalProps) => {
  // Hook de RTK Query para registrar productos
  const [addProduct, { isLoading }] = useAddProductMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const sellerId = user ? user.id : undefined;

  // Configuración de Formik para el formulario de registro
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      sku: '',
      price: 0,
      stock: 0,
    },
    // Validación del formulario usando Yup
    validationSchema: Yup.object({
      name: Yup.string().required('Campo obligatorio'),
      description: Yup.string(),
      sku: Yup.string().required('Campo obligatorio'),
      price: Yup.number().positive().required('Campo obligatorio'),
      stock: Yup.number().integer().min(0).required('Campo obligatorio'),
    }),
    // Acción al enviar formulario
    onSubmit: async (values) => {
      if (sellerId === undefined) {
        console.error('No se encontró el ID del vendedor.');
        return;
      }
      try {
        await addProduct({
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: sellerId,
          quantity: values.stock
        }).unwrap();
        onClose(); 
      } catch (err) {
        console.error('Error al agregar producto:', err);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
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
        <Typography variant="h6" gutterBottom>
          Agregar Producto
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="SKU"
            name="sku"
            value={formik.values.sku}
            onChange={formik.handleChange}
            error={formik.touched.sku && Boolean(formik.errors.sku)}
            helperText={formik.touched.sku && formik.errors.sku}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Precio"
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            Guardar
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductFormModal;
