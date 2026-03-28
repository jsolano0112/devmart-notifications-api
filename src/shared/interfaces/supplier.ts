export interface ISupplier {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  nit: string;
}

export interface ISupplierParams {
  nit: string;
}