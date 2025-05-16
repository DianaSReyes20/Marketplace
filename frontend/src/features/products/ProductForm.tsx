import { useFormik } from 'formik';
import { useAddProductMutation } from '../../api/productsApi';
import Button from '@mui/material/Button';

const ProductForm = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();
  
  const formik = useFormik({
    initialValues: {
      name: '',
      sku: '',
      price: 0,
      quantity: 0,
    },
    onSubmit: async (values) => {
      try {
        await addProduct({
          ...values,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: 0, // Asigna aquí el userId correspondiente (reemplaza 0 por el ID real del usuario)
        }).unwrap();
        // Mostrar mensaje de éxito
      } catch (error) {
        console.error('Error adding product:', error);
        // Manejar error
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Campos del formulario */}
      <Button type="submit" disabled={isLoading}>
        Guardar Producto
      </Button>
    </form>
  );
};

export default ProductForm;