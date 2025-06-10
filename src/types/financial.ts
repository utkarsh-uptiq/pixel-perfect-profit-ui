
export interface FieldValue {
  bbox?: any[];
  value: string;
  entries?: LineItem[];
  fieldLabel: string;
}

export interface LineItem {
  bbox?: any[];
  name: string;
  value: string;
}

export interface OperatingIncome {
  FoodSales?: FieldValue;
  OnlineSales?: FieldValue;
  RetailSales?: FieldValue;
  RoomRevenue?: FieldValue;
  AlcoholSales?: FieldValue;
  HandlingFees?: FieldValue;
  OtherRevenue?: FieldValue;
  RentalIncome?: FieldValue;
  SalesRevenue?: FieldValue;
  GamingRevenue?: FieldValue;
  GiftCardSales?: FieldValue;
  FreightRevenue?: FieldValue;
  HostingRevenue?: FieldValue;
  InterestIncome?: FieldValue;
  MembershipDues?: FieldValue;
  SalesDiscounts?: FieldValue;
  ServiceRevenue?: FieldValue;
  StorageRevenue?: FieldValue;
  WholesaleSales?: FieldValue;
  ContractRevenue?: FieldValue;
  ServicingIncome?: FieldValue;
  MerchandiseSales?: FieldValue;
  ColocationRevenue?: FieldValue;
  ConsultingRevenue?: FieldValue;
  DirectMailRevenue?: FieldValue;
  GainOnSaleOfLoans?: FieldValue;
  LabTestingRevenue?: FieldValue;
  RetainageReleased?: FieldValue;
  VenueRentalIncome?: FieldValue;
  AccessorialCharges?: FieldValue;
  ChangeOrderRevenue?: FieldValue;
  EventPromotionFees?: FieldValue;
  MaintenanceRevenue?: FieldValue;
  RetainerFeesEarned?: FieldValue;
  RvSiteRentalIncome?: FieldValue;
  SponsorshipRevenue?: FieldValue;
  VehicleLeaseIncome?: FieldValue;
  LoanOriginationFees?: FieldValue;
  ProjectBasedRevenue?: FieldValue;
  EquipmentLeaseIncome?: FieldValue;
  LateFeesAndPenalties?: FieldValue;
  OtherOperatingIncome?: FieldValue;
  RepairServiceRevenue?: FieldValue;
  ReturnsAndAllowances?: FieldValue;
  PatientServiceRevenue?: FieldValue;
  ProgramServiceRevenue?: FieldValue;
  RealEstateLeaseIncome?: FieldValue;
  BurialAndCremationFees?: FieldValue;
  CreativeDesignServices?: FieldValue;
  FuneralServicesRevenue?: FieldValue;
  ManagedServicesRevenue?: FieldValue;
  PerformanceTicketSales?: FieldValue;
  ReferralFeesAndRebates?: FieldValue;
  SoftwareLicenseRevenue?: FieldValue;
  WasteCollectionRevenue?: FieldValue;
  FundraisingEventRevenue?: FieldValue;
  PublicRelationsServices?: FieldValue;
  SaasSubscriptionRevenue?: FieldValue;
  SecurityServicesRevenue?: FieldValue;
  CateringAndSpecialEvents?: FieldValue;
  ConsumerGoodsLeaseIncome?: FieldValue;
  PropertyManagementIncome?: FieldValue;
  TemporaryStaffingRevenue?: FieldValue;
  DomainRegistrationRevenue?: FieldValue;
  DonationsAndContributions?: FieldValue;
  InterestIncomeCreditCards?: FieldValue;
  JanitorialServicesRevenue?: FieldValue;
  MediaPlacementCommissions?: FieldValue;
  OutpatientServicesRevenue?: FieldValue;
  AdvertisingServicesRevenue?: FieldValue;
  GrantsAndFoundationSupport?: FieldValue;
  BandwidthAndNetworkServices?: FieldValue;
  InterestIncomeConsumerLoans?: FieldValue;
  ProfessionalServicesRevenue?: FieldValue;
  SalonAndPersonalCareRevenue?: FieldValue;
  LaundryAndDryCleaningRevenue?: FieldValue;
  MaintenanceAndSupportRevenue?: FieldValue;
  MortgageBrokerageCommissions?: FieldValue;
  ImplementationServicesRevenue?: FieldValue;
  InterestIncomeCommercialLoans?: FieldValue;
  SpaAndWellnessServicesRevenue?: FieldValue;
  PrivateInsuranceReimbursements?: FieldValue;
  ServiceChargesAndTipsCollected?: FieldValue;
  AdmissionsAndAttractionsRevenue?: FieldValue;
  DigitalMarketingCampaignRevenue?: FieldValue;
  FacilitiesSupportServicesRevenue?: FieldValue;
  MedicareOrMedicaidReimbursements?: FieldValue;
  SponsorshipsAndAdvertisingIncome?: FieldValue;
  CommunityServicesAndHousingSupport?: FieldValue;
  RemediationAndHazardousWasteRevenue?: FieldValue;
  ExpertTestimonyAndSpecializedServices?: FieldValue;
  TotalOperatingIncome?: FieldValue;
  [key: string]: FieldValue | undefined;
}

export interface CostOfGoodsSold {
  Purchases?: FieldValue;
  CostOfLabor?: FieldValue;
  Depreciation?: FieldValue;
  OtherCostOfGoodsSold?: FieldValue;
  [key: string]: FieldValue | undefined;
}

export interface OperatingExpense {
  Rent?: FieldValue;
  Insurance?: FieldValue;
  Utilities?: FieldValue;
  OfficeRent?: FieldValue;
  Advertising?: FieldValue;
  BankCharges?: FieldValue;
  PayrollTaxes?: FieldValue;
  BadDebtExpense?: FieldValue;
  OfficeSupplies?: FieldValue;
  OfficerSalaries?: FieldValue;
  ProfessionalFees?: FieldValue;
  SalariesAndWages?: FieldValue;
  PermitsAndLicenses?: FieldValue;
  AmortizationExpense?: FieldValue;
  DepreciationExpense?: FieldValue;
  RepairsAndMaintenance?: FieldValue;
  OtherOperatingExpenses?: FieldValue;
  TravelAndEntertainment?: FieldValue;
  EmployeeBenefitPrograms?: FieldValue;
  GuaranteedPaymentsToPartners?: FieldValue;
  TotalOperatingExpenses?: FieldValue;
  [key: string]: FieldValue | undefined;
}

export interface Financial {
  Year: string;
  Income: {
    Operating: OperatingIncome;
  };
  Expense: {
    Cogs?: CostOfGoodsSold;
    Operating: OperatingExpense;
  };
  NetIncome: FieldValue;
  GrossProfit?: FieldValue;
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
