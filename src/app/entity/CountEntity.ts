// TypeScript entity definition for Province Count Statistics

/**
 * Represents statistics count for a province
 */
export interface ProvinceCountEntity {
  /** Province identifier (e.g., 'Trieste', 'Udine') */
  _id: string;

  /** Total number of properties */
  total: number;

  /** Number of properties with disability access */
  disable: number;

  /** Number of properties with elevator */
  elevator: number;

  /** Number of properties without elevator */
  noElevator: number;

  /** Number of denied properties */
  deny: number;

  /** Number of properties waiting for approval */
  wait: number;

  /** Number of accepted properties */
  accept: number;

  /** Number of properties without disability access */
  nodisable: number;

  /** Number of properties with empty disability field */
  emptydisable: number;

  /** Number of properties with empty choice field */
  emptyChoise: number;

  /** Number of properties with empty elevator field */
  emptyElevator: number;
}

/**
 * Type for an array of province count statistics
 */
export type ProvinceCountList = ProvinceCountEntity[];
