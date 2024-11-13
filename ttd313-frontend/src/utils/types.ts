export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiCollectionResponse<T> {
  data: StrapiData<T>[];
}

export interface StrapiSingleResponse<T> {
  data: StrapiData<T> | null;
}

export interface GlobalSettings {
  generalUpdates: RichTextBlock[];
  adHocInfo: RichTextBlock[];
  deliveryArea: RichTextBlock[];
}

interface RichTextBlock {
  type: string;
  children: RichTextContent[];
}

interface RichTextContent {
  text: string;
  type: string;
  bold?: boolean;
}

export interface Product {
  name: string;
  description?: string;
  thcPercentage?: number | null;
  cbdPercentage?: number | null;
  qtyPrice?: number | null;
  isEdible?: boolean | null;
}

export interface ProductCollection {
  id: number;
  collectionName: string;
  collectionImage?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
}

export interface FAQ {
  question: string;
  answer: RichTextBlock[];
}
