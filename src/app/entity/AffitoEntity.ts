// TypeScript entity definitions for Affito

export interface AffitoEntity {
  _id: number;
  realEstate: RealEstate;
  // seo: Seo;
  // idGeoHash: string;
  // mLastUpdate: number;
  stateMaloi: number;
}

export interface RealEstate {
  // visibility: string;
  // dataType: string;
  // id: number;
  // uuid: string;
  // advertiser: Advertiser;
  // contract: string;
  // isNew: boolean;
  // luxury: boolean;
  price: PriceInfo;
  properties: Property;
  title: string;
  // type: string;
  // typology: Typology;
  // hasMainProperty: boolean;
  // isProjectLike: boolean;
  // isMosaic: boolean;
}



interface Property {
  showSurfaceConstitution: boolean;
  adLinks: any[];
  primaryFeatures: PrimaryFeature[];
  ga4features: string[];
  id: string;
  elevator: boolean;
  availability: string;
  bathrooms: string;
  buildingYear: number;
  cadastrals: any[];
  caption: string;
  category: Category;
  conditionId: number;
  ga4Condition: string;
  condition: string;
  costs: Costs;
  description: string;
  defaultDescription: string;
  energy: Energy;
  ga4Heating: string;
  features: string[];
  floor: Floor;
  floors: string;
  garage: string;
  income: boolean;
  location: Location;
  multimedia: Multimedia;
  photo: Photo;
  price: Price;
  reference: Reference;
  lastUpdate: string;
  rent: Rent;
  rooms: string;
  kitchenStatus: string;
  roomsValue: string;
  bedRoomsNumber: string;
  surface: string;
  surfaceConstitution: SurfaceConstitution;
  surfaceValue: string;
  typology: Typology;
  typologyV2: Typology;
  typologyValue: string;
  ga4Garage: string;
  typologyGA4Translation: string;
  residentialUnits: null;
  commercialUnits: null;
  land: null;
  mainFeatures: MainFeature[];
}

interface PrimaryFeature {
  id: number | null;
  name: string;
  value: number | null;
  isVisible: boolean;
  codeName: string;
}

interface Category {
  id: number;
  name: string;
}

interface Costs {
  appliedVat: null;
  agencyCommission: null;
  commissionSubject: null;
  condominiumExpenses: string;
  heatingExpenses: string;
  bankGuarantee: null;
}

interface Energy {
  zeroEnergyBuilding: boolean;
  thermalInsulation: null;
  emission: null;
  heatingType: string;
  airConditioning: string;
  class: EnergyClass;
  epi: string;
  epiUm: string;
}

interface EnergyClass {
  name: string;
  color: string;
}

interface Floor {
  abbreviation: string;
  value: string;
  floorOnlyValue: string;
  ga4FloorValue: string;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
  nation: Nation;
  region: string;
  province: string;
  provinceId: string;
  city: string;
  cityId: number;
  macrozone: string;
  macrozoneId: number;
  microzone: string;
  locality: null;
  address: string;
  streetNumber: string;
  marker: string;
}

interface Nation {
  id: string;
  name: string;
  keyurl: string;
}

interface Multimedia {
  photos: Photo[];
  videos: any[];
  floorplans: any[];
  photoPlan: any[];
  virtualTours: any[];
  documents: any[];
  hasMultimedia: boolean;
  hasOnlyPhotos: boolean;
}

interface Photo {
  id: number;
  caption: string;
  urls: PhotoUrls;
  tag?: PhotoTag;
}

interface PhotoUrls {
  thumb: string;
  small: string;
  medium: string;
  large: string;
  xxl: string;
}

interface PhotoTag {
  label: string;
  key: string;
  category: string;
}

interface Price {
  visible: boolean;
  value: number;
  formattedValue: string;
  priceRange: string;
  pricePerSquareMeter: string;
}

interface Reference {
  label: string;
  code: string;
}

interface Rent {
  deposit: string;
  priceReferenceIndex: null;
  redemptionRent: null;
  availableToStudents: boolean;
}

interface SurfaceConstitution {
  surfaceConstitutionElements: SurfaceConstitutionElement[];
  totalMainSurface: string;
}

interface SurfaceConstitutionElement {
  constitution: string;
  constitutionKey: string;
  surface: string;
  percentage: number;
  commercialSurface: string;
  floor: {
    value: string;
    abbreviation: string;
  };
  surfaceType: string;
}

interface Typology {
  id: number;
  name: string;
}

export interface MainFeature {
  type: string;
  label: string;
  compactLabel?: string;
}

export interface PriceInfo {
  visible: boolean;
  value: number;
  formattedValue: string;
  priceRange: string;
  loweredPrice: LoweredPrice;
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