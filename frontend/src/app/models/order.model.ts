import { CartItem } from './cart-item.model';

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt?: Date;
}
