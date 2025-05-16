// Tipos base
export interface ProductBase {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description?: string; // Opcional
}

// Tipo completo incluyendo campos generados por el backend
export interface Product extends ProductBase {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number; // ID del vendedor
}

// Tipo para la creación (sin campos autogenerados)
export type CreateProductDto = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

// Tipo para actualización (todos los campos opcionales)
export type UpdateProductDto = Partial<CreateProductDto>;

// Tipo para respuesta de la API
export interface ProductApiResponse {
  success: boolean;
  product?: Product;
  products?: Product[];
  error?: string;
}

// Tipo para búsqueda/filtros
export interface ProductFilters {
  name?: string;
  sku?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: number; // Para filtrado de admin
}

// Tipo para items del carrito
export interface CartItem extends Product {
  quantity: number;
  selected?: boolean;
}