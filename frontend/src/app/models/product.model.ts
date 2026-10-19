export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  releaseDate: string;
  productAvailable: boolean;
  stockQuantity: number;
  imageData?: string;
  imageName?: string;
  imageType?: string;
}
