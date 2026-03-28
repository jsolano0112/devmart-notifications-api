export interface IProductResponse {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  supplierId: number;
  categoryId: number;
}
export interface IGetProductsResult {
  products: IProduct[];
  total: number;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  sku: string;
  categoryId: number;
  supplierId: number;
}

export interface IUpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string;
  categoryId: number;
  supplierId: number;
}

export interface IProducParams {
  sku: string;
}


export interface IGetProductsPagination {
  limit: number;
  offset: number;
  search?: string;
}