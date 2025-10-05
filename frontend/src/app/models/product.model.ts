export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
  price: number;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  features?: string[];
  categoryId?: number;
  tags?: string[];
  isActive?: boolean;
}
