export interface FilterAffito {
  priceMin?: number;
  priceMax?: number;
  // Add more filter fields as needed

  stateMaloi?: -1 | 0 | 1 | 2 |undefined;
  elevator?: "Sì" | "No" | "empty" | undefined;
  floor?: "Terra" | "Mezzo" | undefined;
  agentName?: string;
  province?: "Udine" |  "Trieste" |  undefined;
  accessoDisabili?: -1 | 0 | 1 | undefined;

  paginationSize?: number;

  type: 'a' | 'c' ;

} 