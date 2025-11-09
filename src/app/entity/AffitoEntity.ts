// TypeScript entity definitions for Affito

export interface AffitoEntity {
  _id: number;
  realEstate: RealEstate;
  seo: Seo;
  idGeoHash: string;
  mLastUpdate: number;
  stateMaloi: number;
}

export interface RealEstate {
  visibility: string;
  dataType: string;
  id: number;
  uuid: string;
  advertiser: Advertiser;
  contract: string;
  isNew: boolean;
  luxury: boolean;
  price: PriceInfo;
  properties: Property[];
  title: string;
  type: string;
  typology: Typology;
  hasMainProperty: boolean;
  isProjectLike: boolean;
  isMosaic: boolean;
}

export interface Advertiser {
  agency: Agency;
  supervisor: Supervisor;
  hasCallNumbers: boolean;
}

export interface Agency {
  id: number;
  type: string;
  showOnlyAgentPhone: boolean;
  phones: Phone[];
  bookableVisit: BookableVisit;
  isPaid: boolean;
  label: string;
  displayName: string;
  guaranteed: boolean;
  showAgentPhone: boolean;
  showLogo: boolean;
  imageUrls: ImageUrls;
  agencyUrl: string;
  showExternalLink: boolean;
}

export interface Phone {
  type: string;
  value: string;
}

export interface BookableVisit {
  isVisitBookable: boolean;
  virtualVisitEnabled: boolean;
}

export interface ImageUrls {
  small: string;
  large: string;
}

export interface Supervisor {
  type: string;
  imageGender: string;
  phones: Phone[];
  imageType: string;
  displayName: string;
  label: string;
  imageUrl: string;
}

export interface LoweredPrice {
  originalPrice: string,
  currentPrice: string,
  discountPercentage: string,
  priceDecreasedBy: string,
  passedDays: number;
  date: string,
  typologiesCount: number;
}
export interface PriceInfo {
  visible: boolean;
  value: number;
  formattedValue: string;
  priceRange: string;
  loweredPrice: LoweredPrice;
}

export interface Property {
  multimedia: Multimedia;
  bathrooms: string;
  floor: Floor;
  ga4Condition: string;
  price: PriceInfo;
  rooms: string;
  surface: string;
  typology: Typology;
  typologyGA4Translation: string;
  ga4features: string[];
  ga4Heating: string;
  caption: string;
  category: Category;
  photo: Photo;
  bedRoomsNumber: string;
  location: Location;
  featureList: Feature[];
}

export interface Multimedia {
  photos: Photo[];
  virtualTours: any[];
  hasMultimedia: boolean;
}

export interface Photo {
  id: number;
  caption: string;
  urls: PhotoUrls;
}

export interface PhotoUrls {
  small: string;
  medium?: string;
  large?: string;
  xxl?: string;
}

export interface Floor {
  abbreviation: string;
  value: string;
  floorOnlyValue: string;
  ga4FloorValue: string;
}

export interface Typology {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  marker: string;
  region: string;
  province: string;
  macrozone: string;
  microzone: string;
  city: string;
  nation: Nation;
}

export interface Nation {
  id: string;
  name: string;
}

export interface Feature {
  type: string;
  label: string;
  compactLabel?: string;
}

export interface Seo {
  anchor: string;
  url: string;
} 