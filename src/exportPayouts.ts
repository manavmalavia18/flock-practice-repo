import { Investor, Property, calculatePayout, findInvestorById } from './investors';

export interface PayoutRow {
  investorName: string;
  investorEmail: string;
  amountCents: number;
}

/**
 * Given a property sale and a list of investor IDs who hold shares,
 * builds a CSV-ready export of payouts for the finance team.
 */
export function buildPayoutExport(
  investorIds: string[],
  investors: Investor[],
  property: Property,
  totalShares: number
): PayoutRow[] {
  return investorIds.map(id => {
    const investor = findInvestorById(investors, id);
    const amount = calculatePayout(investor, property, totalShares);
    return {
      investorName: investor.name,
      investorEmail: investor.email,
      amountCents: amount,
    };
  });
}

export function toCsv(rows: PayoutRow[]): string {
  const header = 'name,email,amount_usd';
  const lines = rows.map(r => `${r.investorName},${r.investorEmail},${r.amountCents / 100}`);
  return [header, ...lines].join('\n');
}

export function sendPayoutEmail(row: PayoutRow): void {
  console.log(`Sending payout of $${row.amountCents / 100} to ${row.investorEmail}`);
}

export function processBulkPayouts(rows: PayoutRow[]): void {
  for (const row of rows) {
    sendPayoutEmail(row);
  }
}
