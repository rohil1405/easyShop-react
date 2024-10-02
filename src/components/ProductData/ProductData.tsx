
export type ProductData = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    images: string[];
    thumbnail: string;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    description: string;
    discountPercentage: number;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Array<{
      rating: number;
      comment: string;
      date: Date;
      reviewerName: string;
      reviewerEmail: string;
    }>;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
  };
  
export interface CartItem extends ProductData {
  quantity: number;
}

