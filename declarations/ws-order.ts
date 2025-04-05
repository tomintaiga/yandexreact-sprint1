export interface IWsOrder {
  _id: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
