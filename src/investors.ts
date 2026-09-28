export interface Investor {
  id: string;
  name: string;
  email: string;
  sharesOwned: number;
}

export interface Property {
  id: string;
  address: string;
  valuationCents: number; // stored in cents to avoid float issues
}

/**
 * Calculates the payout (in cents) an investor receives when a property
 * in the Fund is sold, proportional to their share ownership.
 */
export function calculatePayout(investor: Investor, property: Property, totalShares: number): number {
  const ratio = investor.sharesOwned / totalShares;
  return Math.round(property.valuationCents * ratio);
}

export function getInvestorDisplayName(investor: Investor): string {
  return investor.name.split(' ')[0];
}

export function findInvestorById(investors: Investor[], id: string): Investor {
  return investors.find(inv => inv.id === id)!;
}
