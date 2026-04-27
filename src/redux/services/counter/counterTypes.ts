export interface CounterItem {
  _id: { province: string; type: 'a' | 'c' };
  total: number;
  disable: number;
  elevator: number;
  noElevator: number;
  deny: number;
  wait: number;
  accept: number;
  nodisable: number;
  emptydisable: number;
  emptyChoise: number;
  emptyElevator: number;
}

export interface CounterResponse {
  success: boolean;
  data: CounterItem[];
  count: number;
}
