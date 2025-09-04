export interface Address {
  id: string;
  clientId?: string;
  address: string;
  number: string;
  complement?: string;
  reference?: string;
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
