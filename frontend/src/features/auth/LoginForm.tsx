import { useLoginMutation } from '../../api/authApi';

const LoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({
        email: 'user@example.com',
        password: 'password123'
      }).unwrap();
      
      // Guarda el token y redirige
      localStorage.setItem('token', response.token);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <button disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Iniciar sesión'}
      </button>
      {error && <div>Error: {typeof error === 'string'
              ? error
              : 'data' in error && typeof error.data === 'string'
                ? error.data
                : 'Ocurrió un error al realizar e LogIn.'}</div>}
    </form>
  );
};

export default LoginForm;