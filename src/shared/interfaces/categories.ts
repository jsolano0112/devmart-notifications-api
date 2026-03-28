export interface ICategoriesResponse {
  id: number;
  name: string;
  updatedAt: Date;
}

export interface ICategories {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoriesParams {
  id: number;
}

export interface IUpdateCategory {
  name: string;
  updatedAt: Date;
}
