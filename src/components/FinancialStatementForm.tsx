import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Save, Calendar, Building2, Plus, Edit2 } from 'lucide-react';
import { FinancialStatement, FieldValue, AdditionalLineItem } from '@/types/financial';
import SectionEditDialog from './SectionEditDialog';

interface FinancialStatementFormProps {
  statement: FinancialStatement | null;
  onSave: (statement: FinancialStatement) => void;
  onCancel: () => void;
}

const FinancialStatementForm: React.FC<FinancialStatementFormProps> = ({
  statement,
  onSave,
  onCancel,
}) => {
  // Create a comprehensive default structure with all fields
  const createDefaultFinancial = () => ({
    Year: new Date().getFullYear().toString(),
    Income: {
      Operating: {
        FoodSales: { value: '', fieldLabel: 'Food Sales' },
        OnlineSales: { value: '', fieldLabel: 'Online Sales' },
        RetailSales: { value: '', fieldLabel: 'Retail Sales' },
        RoomRevenue: { value: '', fieldLabel: 'Room Revenue' },
        AlcoholSales: { value: '', fieldLabel: 'Alcohol Sales' },
        HandlingFees: { value: '', fieldLabel: 'Handling Fees' },
        OtherRevenue: { value: '', fieldLabel: 'Other Revenue' },
        RentalIncome: { value: '', fieldLabel: 'Rental Income' },
        SalesRevenue: { value: '', fieldLabel: 'Sales Revenue' },
        GamingRevenue: { value: '', fieldLabel: 'Gaming Revenue' },
        GiftCardSales: { value: '', fieldLabel: 'Gift Card Sales' },
        FreightRevenue: { value: '', fieldLabel: 'Freight Revenue' },
        HostingRevenue: { value: '', fieldLabel: 'Hosting Revenue' },
        InterestIncome: { value: '', fieldLabel: 'Interest Income' },
        MembershipDues: { value: '', fieldLabel: 'Membership Dues' },
        SalesDiscounts: { value: '', fieldLabel: 'Sales Discounts' },
        ServiceRevenue: { value: '', fieldLabel: 'Service Revenue' },
        StorageRevenue: { value: '', fieldLabel: 'Storage Revenue' },
        WholesaleSales: { value: '', fieldLabel: 'Wholesale Sales' },
        ContractRevenue: { value: '', fieldLabel: 'Contract Revenue' },
        ServicingIncome: { value: '', fieldLabel: 'Servicing Income' },
        MerchandiseSales: { value: '', fieldLabel: 'Merchandise Sales' },
        ColocationRevenue: { value: '', fieldLabel: 'Colocation Revenue' },
        ConsultingRevenue: { value: '', fieldLabel: 'Consulting Revenue' },
        DirectMailRevenue: { value: '', fieldLabel: 'Direct Mail Revenue' },
        GainOnSaleOfLoans: { value: '', fieldLabel: 'Gain On Sale Of Loans' },
        LabTestingRevenue: { value: '', fieldLabel: 'Lab Testing Revenue' },
        RetainageReleased: { value: '', fieldLabel: 'Retainage Released' },
        VenueRentalIncome: { value: '', fieldLabel: 'Venue Rental Income' },
        AccessorialCharges: { value: '', fieldLabel: 'Accessorial Charges' },
        ChangeOrderRevenue: { value: '', fieldLabel: 'Change Order Revenue' },
        EventPromotionFees: { value: '', fieldLabel: 'Event Promotion Fees' },
        MaintenanceRevenue: { value: '', fieldLabel: 'Maintenance Revenue' },
        RetainerFeesEarned: { value: '', fieldLabel: 'RetainerFees Earned' },
        RvSiteRentalIncome: { value: '', fieldLabel: 'RV Site Rental Income' },
        SponsorshipRevenue: { value: '', fieldLabel: 'Sponsorship Revenue' },
        VehicleLeaseIncome: { value: '', fieldLabel: 'Vehicle Lease Income' },
        LoanOriginationFees: { value: '', fieldLabel: 'Loan Origination Fees' },
        ProjectBasedRevenue: { value: '', fieldLabel: 'Project Based Revenue' },
        EquipmentLeaseIncome: { value: '', fieldLabel: 'Equipment Lease Income' },
        LateFeesAndPenalties: { value: '', fieldLabel: 'Late Fees And Penalties' },
        OtherOperatingIncome: { value: '', fieldLabel: 'Other Operating Income' },
        RepairServiceRevenue: { value: '', fieldLabel: 'Repair Service Revenue' },
        ReturnsAndAllowances: { value: '', fieldLabel: 'Returns And Allowances' },
        PatientServiceRevenue: { value: '', fieldLabel: 'Patient Service Revenue' },
        ProgramServiceRevenue: { value: '', fieldLabel: 'Program Service Revenue' },
        RealEstateLeaseIncome: { value: '', fieldLabel: 'Real Estate Lease Income' },
        BurialAndCremationFees: { value: '', fieldLabel: 'Burial And Cremation Fees' },
        CreativeDesignServices: { value: '', fieldLabel: 'Creative Design Services' },
        FuneralServicesRevenue: { value: '', fieldLabel: 'Funeral Services Revenue' },
        ManagedServicesRevenue: { value: '', fieldLabel: 'Managed Services Revenue' },
        PerformanceTicketSales: { value: '', fieldLabel: 'Performance Ticket Sales' },
        ReferralFeesAndRebates: { value: '', fieldLabel: 'Referral Fees And Rebates' },
        SoftwareLicenseRevenue: { value: '', fieldLabel: 'Software License Revenue' },
        WasteCollectionRevenue: { value: '', fieldLabel: 'Waste Collection Revenue' },
        FundraisingEventRevenue: { value: '', fieldLabel: 'Fundraising Event Revenue' },
        PublicRelationsServices: { value: '', fieldLabel: 'Public Relations Services' },
        SaasSubscriptionRevenue: { value: '', fieldLabel: 'SaaS Subscription Revenue' },
        SecurityServicesRevenue: { value: '', fieldLabel: 'Security Services Revenue' },
        CateringAndSpecialEvents: { value: '', fieldLabel: 'Catering And Special Events' },
        ConsumerGoodsLeaseIncome: { value: '', fieldLabel: 'Consumer Goods Lease Income' },
        PropertyManagementIncome: { value: '', fieldLabel: 'Property Management Income' },
        TemporaryStaffingRevenue: { value: '', fieldLabel: 'Temporary Staffing Revenue' },
        DomainRegistrationRevenue: { value: '', fieldLabel: 'Domain Registration Revenue' },
        DonationsAndContributions: { value: '', fieldLabel: 'Donations And Contributions' },
        InterestIncomeCreditCards: { value: '', fieldLabel: 'Interest Income Credit Cards' },
        JanitorialServicesRevenue: { value: '', fieldLabel: 'Janitorial Services Revenue' },
        MediaPlacementCommissions: { value: '', fieldLabel: 'Media Placement Commissions' },
        OutpatientServicesRevenue: { value: '', fieldLabel: 'Outpatient Services Revenue' },
        AdvertisingServicesRevenue: { value: '', fieldLabel: 'Advertising Services Revenue' },
        GrantsAndFoundationSupport: { value: '', fieldLabel: 'Grants And Foundation Support' },
        BandwidthAndNetworkServices: { value: '', fieldLabel: 'Bandwidth And Network Services' },
        InterestIncomeConsumerLoans: { value: '', fieldLabel: 'Interest Income Consumer Loans' },
        ProfessionalServicesRevenue: { value: '', fieldLabel: 'Professional Services Revenue' },
        SalonAndPersonalCareRevenue: { value: '', fieldLabel: 'Salon And Personal Care Revenue' },
        LaundryAndDryCleaningRevenue: { value: '', fieldLabel: 'Laundry And Dry Cleaning Revenue' },
        MaintenanceAndSupportRevenue: { value: '', fieldLabel: 'Maintenance And Support Revenue' },
        MortgageBrokerageCommissions: { value: '', fieldLabel: 'Mortgage Brokerage Commissions' },
        ImplementationServicesRevenue: { value: '', fieldLabel: 'Implementation Services Revenue' },
        InterestIncomeCommercialLoans: { value: '', fieldLabel: 'Interest Income Commercial Loans' },
        SpaAndWellnessServicesRevenue: { value: '', fieldLabel: 'Spa And Wellness Services Revenue' },
        PrivateInsuranceReimbursements: { value: '', fieldLabel: 'Private Insurance Reimbursements' },
        ServiceChargesAndTipsCollected: { value: '', fieldLabel: 'Service Charges And Tips Collected' },
        AdmissionsAndAttractionsRevenue: { value: '', fieldLabel: 'Admissions And Attractions Revenue' },
        DigitalMarketingCampaignRevenue: { value: '', fieldLabel: 'Digital Marketing Campaign Revenue' },
        FacilitiesSupportServicesRevenue: { value: '', fieldLabel: 'Facilities Support Services Revenue' },
        MedicareOrMedicaidReimbursements: { value: '', fieldLabel: 'Medicare Or Medicaid Reimbursements' },
        SponsorshipsAndAdvertisingIncome: { value: '', fieldLabel: 'Sponsorships And Advertising Income' },
        CommunityServicesAndHousingSupport: { value: '', fieldLabel: 'Community Services And Housing Support' },
        RemediationAndHazardousWasteRevenue: { value: '', fieldLabel: 'Remediation And Hazardous Waste Revenue' },
        ExpertTestimonyAndSpecializedServices: { value: '', fieldLabel: 'Expert Testimony And Specialized Services' },
        TotalOperatingIncome: { value: '', fieldLabel: 'Total Operating Income' }
      }
    },
    Expense: {
      Cogs: {
        Purchases: { value: '', fieldLabel: 'Purchases' },
        CostOfLabor: { value: '', fieldLabel: 'Cost Of Labor' },
        Depreciation: { value: '', fieldLabel: 'Depreciation' },
        OtherCostOfGoodsSold: { value: '', fieldLabel: 'Other Cost Of Goods Sold' }
      },
      Operating: {
        Rent: { value: '', fieldLabel: 'Rent' },
        Insurance: { value: '', fieldLabel: 'Insurance' },
        Utilities: { value: '', fieldLabel: 'Utilities' },
        OfficeRent: { value: '', fieldLabel: 'Office Rent' },
        Advertising: { value: '', fieldLabel: 'Advertising' },
        BankCharges: { value: '', fieldLabel: 'Bank Charges' },
        PayrollTaxes: { value: '', fieldLabel: 'Payroll Taxes' },
        BadDebtExpense: { value: '', fieldLabel: 'Bad Debt Expense' },
        OfficeSupplies: { value: '', fieldLabel: 'Office Supplies' },
        OfficerSalaries: { value: '', fieldLabel: 'Officer Salaries' },
        ProfessionalFees: { value: '', fieldLabel: 'Professional Fees' },
        SalariesAndWages: { value: '', fieldLabel: 'Salaries And Wages' },
        PermitsAndLicenses: { value: '', fieldLabel: 'Permits And Licenses' },
        AmortizationExpense: { value: '', fieldLabel: 'Amortization Expense' },
        DepreciationExpense: { value: '', fieldLabel: 'Depreciation Expense' },
        RepairsAndMaintenance: { value: '', fieldLabel: 'Repairs And Maintenance' },
        OtherOperatingExpenses: { value: '', fieldLabel: 'Other Operating Expenses' },
        TravelAndEntertainment: { value: '', fieldLabel: 'Travel And Entertainment' },
        EmployeeBenefitPrograms: { value: '', fieldLabel: 'Employee Benefit Programs' },
        GuaranteedPaymentsToPartners: { value: '', fieldLabel: 'Guaranteed Payments To Partners' },
        TotalOperatingExpenses: { value: '', fieldLabel: 'Total Operating Expenses' }
      }
    },
    NetIncome: { value: '', fieldLabel: 'Net Income' },
    GrossProfit: { value: '', fieldLabel: 'Gross Profit' }
  });

  const [formData, setFormData] = useState<FinancialStatement>({
    id: '',
    documentId: '',
    type: 'BusinessFinancialStatement',
    subtype: null,
    formType: 'ProfitAndLossStatement',
    data: {
      Financials: [createDefaultFinancial()],
      CompanyName: { value: '', fieldLabel: 'Company Name' },
      DocumentDate: { value: new Date().toISOString().split('T')[0], fieldLabel: 'Document Date' },
      ReportingDates: [new Date().toISOString().split('T')[0]]
    },
    extractedAt: new Date().toISOString(),
    status: 'Draft',
    year: null,
    version: 'latest'
  });

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<{
    title: string;
    path: string[];
    data: Record<string, FieldValue | AdditionalLineItem[]>;
    colorClass: string;
  } | null>(null);

  useEffect(() => {
    if (statement) {
      // Merge existing statement with default structure to ensure all fields exist
      const mergedFinancial = {
        ...createDefaultFinancial(),
        ...statement.data.Financials[0],
        Income: {
          Operating: {
            ...createDefaultFinancial().Income.Operating,
            ...statement.data.Financials[0].Income.Operating
          }
        },
        Expense: {
          Cogs: {
            ...createDefaultFinancial().Expense.Cogs,
            ...statement.data.Financials[0].Expense?.Cogs
          },
          Operating: {
            ...createDefaultFinancial().Expense.Operating,
            ...statement.data.Financials[0].Expense.Operating
          }
        }
      };

      setFormData({
        ...statement,
        data: {
          ...statement.data,
          Financials: [mergedFinancial]
        }
      });
    }
  }, [statement]);

  const updateField = (path: string[], value: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      if (current[path[path.length - 1]] && typeof current[path[path.length - 1]] === 'object') {
        current[path[path.length - 1]] = { ...current[path[path.length - 1]], value };
      } else {
        current[path[path.length - 1]] = value;
      }
      
      return newData;
    });
  };

  const calculateTotals = () => {
    const financial = formData.data.Financials[0];
    
    // Calculate total income (excluding TotalOperatingIncome and AdditionalLineItems)
    const incomeTotal = Object.entries(financial.Income.Operating).reduce((sum, [key, field]) => {
      if (key === 'TotalOperatingIncome' || key === 'AdditionalLineItems') return sum;
      const value = (field as any)?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate total COGS (excluding AdditionalLineItems)
    const cogsTotal = Object.entries(financial.Expense.Cogs || {}).reduce((sum, [key, field]) => {
      if (key === 'AdditionalLineItems') return sum;
      const value = (field as any)?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate total operating expenses (excluding TotalOperatingExpenses and AdditionalLineItems)
    const operatingExpensesTotal = Object.entries(financial.Expense.Operating).reduce((sum, [key, field]) => {
      if (key === 'TotalOperatingExpenses' || key === 'AdditionalLineItems') return sum;
      const value = (field as any)?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    const totalExpenses = cogsTotal + operatingExpensesTotal;
    const grossProfit = incomeTotal - cogsTotal;
    const netIncome = incomeTotal - totalExpenses;
    
    // Update calculated fields
    updateField(['data', 'Financials', '0', 'Income', 'Operating', 'TotalOperatingIncome'], incomeTotal.toString());
    updateField(['data', 'Financials', '0', 'Expense', 'Operating', 'TotalOperatingExpenses'], totalExpenses.toString());
    updateField(['data', 'Financials', '0', 'GrossProfit'], grossProfit.toString());
    updateField(['data', 'Financials', '0', 'NetIncome'], netIncome.toString());
  };

  useEffect(() => {
    calculateTotals();
  }, [formData.data.Financials[0].Income.Operating, formData.data.Financials[0].Expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (value: string) => {
    const num = parseFloat(value || '0');
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const openSectionDialog = (
    title: string, 
    path: string[], 
    data: Record<string, FieldValue | AdditionalLineItem[]>,
    colorClass: string
  ) => {
    setActiveSection({
      title,
      path,
      data,
      colorClass
    });
    setDialogOpen(true);
  };

  const handleSectionSave = (updatedData: Record<string, FieldValue | AdditionalLineItem[]>) => {
    if (!activeSection) return;
    
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      // Navigate to the parent
      for (let i = 0; i < activeSection.path.length; i++) {
        current = current[activeSection.path[i]];
      }
      
      // Replace the section data with updated data
      Object.keys(updatedData).forEach(key => {
        current[key] = updatedData[key];
      });
      
      return newData;
    });
  };

  const renderSectionSummary = (
    title: string, 
    path: string[], 
    data: Record<string, FieldValue | AdditionalLineItem[]>,
    colorClass: string
  ) => {
    // Get top entries by value for the summary
    const entries = Object.entries(data)
      .filter(([key]) => key !== 'TotalOperatingIncome' && 
                        key !== 'TotalOperatingExpenses' && 
                        key !== 'AdditionalLineItems')
      .map(([key, field]) => ({
        key,
        label: (field as FieldValue).fieldLabel,
        value: parseFloat((field as FieldValue).value || '0')
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Calculate total
    const totalKey = title.includes('Income') ? 'TotalOperatingIncome' : 'TotalOperatingExpenses';
    const totalValue = data[totalKey] ? (data[totalKey] as FieldValue).value : '0';

    return (
      <Card className="mb-6 hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className={colorClass}>{title}</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openSectionDialog(title, path, data, colorClass)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {entries.map(entry => (
              <div key={entry.key} className="flex justify-between items-center text-sm">
                <span>{entry.label}</span>
                <span className="font-medium">{formatCurrency(entry.value.toString())}</span>
              </div>
            ))}
            
            {Object.keys(data).length > 5 && (
              <div className="text-sm text-muted-foreground text-center italic">
                And {Object.keys(data).length - 5} more items...
              </div>
            )}
            
            <div className="border-t pt-2 flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                {formatCurrency(totalValue)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                {statement ? 'Edit' : 'Create'} Financial Statement
              </h1>
              <p className="text-muted-foreground text-lg">
                {statement ? 'Update' : 'Add'} profit and loss information section by section
              </p>
            </div>
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Save Statement
          </Button>
        </div>

        {/* Company Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.data.CompanyName.value}
                  onChange={(e) => updateField(['data', 'CompanyName'], e.target.value)}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="documentDate">Document Date</Label>
                <Input
                  id="documentDate"
                  type="date"
                  value={formData.data.DocumentDate.value}
                  onChange={(e) => updateField(['data', 'DocumentDate'], e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Sections */}
        <Tabs defaultValue="income" className="mb-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="income" className="text-green-700">Income</TabsTrigger>
            <TabsTrigger value="cogs" className="text-orange-700">Cost of Goods Sold</TabsTrigger>
            <TabsTrigger value="expenses" className="text-red-700">Expenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="income">
            {renderSectionSummary(
              'Operating Income', 
              ['data', 'Financials', '0', 'Income', 'Operating'], 
              formData.data.Financials[0].Income.Operating,
              'text-green-700'
            )}
          </TabsContent>
          
          <TabsContent value="cogs">
            {formData.data.Financials[0].Expense.Cogs && renderSectionSummary(
              'Cost of Goods Sold', 
              ['data', 'Financials', '0', 'Expense', 'Cogs'], 
              formData.data.Financials[0].Expense.Cogs,
              'text-orange-700'
            )}
          </TabsContent>
          
          <TabsContent value="expenses">
            {renderSectionSummary(
              'Operating Expenses', 
              ['data', 'Financials', '0', 'Expense', 'Operating'], 
              formData.data.Financials[0].Expense.Operating,
              'text-red-700'
            )}
          </TabsContent>
        </Tabs>

        {/* Financial Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-primary">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span>Total Income:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(formData.data.Financials[0].Income.Operating.TotalOperatingIncome?.value || '0')}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Gross Profit:</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(formData.data.Financials[0].GrossProfit?.value || '0')}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span>Total Expenses:</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(formData.data.Financials[0].Expense.Operating.TotalOperatingExpenses?.value || '0')}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold">Net Income:</span>
                  <span className="text-3xl font-bold text-primary">
                    {formatCurrency(formData.data.Financials[0].NetIncome?.value || '0')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="mr-2 h-4 w-4" />
            Save Statement
          </Button>
        </div>
      </form>

      {/* Section Edit Dialog */}
      {activeSection && (
        <SectionEditDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={activeSection.title}
          sectionData={activeSection.data}
          sectionPath={activeSection.path}
          colorClass={activeSection.colorClass}
          onSave={handleSectionSave}
        />
      )}
    </div>
  );
};

export default FinancialStatementForm;
