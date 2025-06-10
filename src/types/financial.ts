
export interface FieldValue {
  bbox?: any[];
  value: string;
  entries?: any[];
  fieldLabel: string;
}

export interface OperatingIncome {
  RentalIncome?: FieldValue;
  InterestIncome?: FieldValue;
  RealEstateLeaseIncome?: FieldValue;
  OtherRevenue?: FieldValue;
  TotalOperatingIncome?: FieldValue;
  [key: string]: FieldValue | undefined;
}

export interface OperatingExpense {
  Insurance?: FieldValue;
  BankCharges?: FieldValue;
  ProfessionalFees?: FieldValue;
  PermitsAndLicenses?: FieldValue;
  RepairsAndMaintenance?: FieldValue;
  Utilities?: FieldValue;
  OtherOperatingExpenses?: FieldValue;
  TotalOperatingExpenses?: FieldValue;
  [key: string]: FieldValue | undefined;
}

export interface Financial {
  Year: string;
  Income: {
    Operating: OperatingIncome;
  };
  Expense: {
    Operating: OperatingExpense;
  };
  NetIncome: FieldValue;
}

export interface FinancialData {
  Financials: Financial[];
  CompanyName: FieldValue;
  DocumentDate: FieldValue;
  ReportingDates: string[];
}

export interface FinancialStatement {
  id: string;
  documentId: string;
  type: string;
  subtype: string | null;
  formType: string;
  data: FinancialData;
  extractedAt: string;
  status: string;
  year: string | null;
  version: string;
}
