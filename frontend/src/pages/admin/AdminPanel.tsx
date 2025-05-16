import { useGetSellerProductsQuery } from '../../api/productsApi';

const AdminPanel = () => {
  const { data: products, isLoading } = useGetSellerProductsQuery();
  
  return (
    <div>
      <h1>Panel de Administración</h1>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <pre>{JSON.stringify(products, null, 2)}</pre>
      )}
    </div>
  );
};

export default AdminPanel;