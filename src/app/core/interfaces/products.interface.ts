export interface Products {
  id: string;
  code: number;
  name: string;
  amount: number;
  price: number;
}

export interface ProductsWithQuantity extends Products {
  quantityToSell: number;
}
