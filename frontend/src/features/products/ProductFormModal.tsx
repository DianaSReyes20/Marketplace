import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddProductMutation } from '../../api/productsApi';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductFormModal = ({ open, onClose }: ProductFormModalProps) => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Requerido'),
      description: Yup.string(),
      price: Yup.number().positive().required('Requerido'),
      stock: Yup.number().integer().min(0).required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        await addProduct({
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 0, // Set this appropriately, e.g., from auth context
          sku: '',    // Generate or input SKU as needed
          quantity: values.stock // Or set as needed
        }).unwrap();
        onClose(); // Cierra y refresca lista
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
          top: '20%',
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
