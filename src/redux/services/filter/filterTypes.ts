export interface FilterAffito {
  priceMin?: number;
  priceMax?: number;
  // Add more filter fields as needed

  stateMaloi?: -1 | 0 | 1|2|undefined;
  elevator?: "Sì" | "No" | "empty" | undefined;
  floor?: number;
  agentName?: string;
  province?: "Udine" |  "Trieste" |  undefined;
  accessoDisabili?: number | undefined;

  paginationSize?: number;

} 