export interface Categories {
  categories: CategoriesClass;
}

export interface CategoriesClass {
  href: string;
  items: Category[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Category {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

export interface Icon {
  height: number | null;
  url: string;
  width: number | null;
}
