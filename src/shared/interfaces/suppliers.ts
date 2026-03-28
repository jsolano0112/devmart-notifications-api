export interface ISupplier {
  id: number;
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export interface ISupplierParams {
  id: number;
}

export interface IUpdateSupplier {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export interface ISupplierResponse {
  id: number;
  name: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}