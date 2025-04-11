export type THistoryOrder = {
  ingredients: Array<string>;
  _id: string;
  status: 'done' | 'pending' | 'created';
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrderFeed = {
  success: boolean;
  orders: Array<THistoryOrder>;
  total: number;
  totalToday: number;
};
