export interface Restaurant {
  _id: string;
  title: string;
  image: string;
  rating: number;
  open:Date;
  close:Date;
  maxPrice:number;
  minPrice:number;
  distance:number;
  chef: Chef | string;
  dishes: Dish[] | string[];
}
export interface Dish {
  _id: string;
  title: string;
  image: string;
  ingredients: string;
  flavorIcon: string;
  price: number;
  restaurant: Restaurant | string;
  isSignature:boolean;
  type:string;
  dishSides: string[];
  changes: string[];
}

export interface Chef {
  _id: string;
  fName: string;
  lName: string;
  image: string;
  description: string;
  restaurant: Restaurant[] | string[];
  isChefOfTheWeek: boolean;
  isMostViewedChef:boolean;
}

export interface IconsMeaningProps {
  icons: {
    name: string,
    image: string;
  }[];
}

export interface AboutUsSec {
  epicLogo: string;
  googleLogo: string;
  appleLogo: string;
  title: string;
  firstP: string;
  secondP: string;
}

export enum CardType {
  RestaurantType = 1,
  DishType = 2,
  ChefRestaurantType = 3,
}

export enum PagesType {
  HomePage = 1,
  RestaurantsPage = 2,
  OrdersPage = 3,
  checkoutPage=4,
  bagShoppingPopup=5
}
export interface dataTypes {
  interfaceType: 'r' | 'd' | 'c';
  data: Dish[] | Restaurant[] | Chef[];
}

export interface User{
  fName: string;
  lName: string;
  phone: string;
  email: string;
  password: string;
  orders: Order[] | string[];
  role: string;
}
export interface OrderDish {
  dish: Dish;
  quantity: number;
}

export interface Order{
  date: string;
  total: number;
  dishes: OrderDish[];
  arrivingTime: number;
  comment: string;
}
// Define the interface for paginated results
interface PaginatedResults<T> {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  results: T[];
}
