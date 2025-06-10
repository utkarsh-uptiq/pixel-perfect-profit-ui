import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Calendar, Building2, Plus, Trash2 } from 'lucide-react';
import { FinancialStatement } from '@/types/financial';

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

  const addAdditionalLineItem = (sectionPath: string[]) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < sectionPath.length; i++) {
        current = current[sectionPath[i]];
      }
      
      if (!current.AdditionalLineItems) {
        current.AdditionalLineItems = [];
      }
      
      current.AdditionalLineItems.push({
        name: 'Custom Line Item',
        value: '0',
        fieldLabel: 'Custom Line Item',
        entries: []
      });
      
      return newData;
    });
  };

  const updateAdditionalLineItem = (sectionPath: string[], index: number, field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < sectionPath.length; i++) {
        current = current[sectionPath[i]];
      }
      
      if (current.AdditionalLineItems && current.AdditionalLineItems[index]) {
        current.AdditionalLineItems[index][field] = value;
      }
      
      return newData;
    });
  };

  const removeAdditionalLineItem = (sectionPath: string[], index: number) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < sectionPath.length; i++) {
        current = current[sectionPath[i]];
      }
      
      if (current.AdditionalLineItems) {
        current.AdditionalLineItems.splice(index, 1);
      }
      
      return newData;
    });
  };

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

  const addLineItem = (path: string[], fieldLabel: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      
      if (!current.entries) {
        current.entries = [];
      }
      
      current.entries.push({
        name: `New ${fieldLabel} Item`,
        value: '0'
      });
      
      return newData;
    });
  };

  const updateLineItem = (path: string[], index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      
      if (current.entries && current.entries[index]) {
        current.entries[index][field] = value;
      }
      
      return newData;
    });
  };

  const removeLineItem = (path: string[], index: number) => {
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
      
      if (current.entries) {
        current.entries.splice(index, 1);
      }
      
      return newData;
    });
  };

  const calculateTotals = () => {
    const financial = formData.data.Financials[0];
    
    // Calculate total income (excluding TotalOperatingIncome)
    const incomeTotal = Object.entries(financial.Income.Operating).reduce((sum, [key, field]) => {
      if (key === 'TotalOperatingIncome') return sum;
      const value = field?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate total COGS
    const cogsTotal = Object.entries(financial.Expense.Cogs || {}).reduce((sum, [key, field]) => {
      const value = field?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate total operating expenses (excluding TotalOperatingExpenses)
    const operatingExpensesTotal = Object.entries(financial.Expense.Operating).reduce((sum, [key, field]) => {
      if (key === 'TotalOperatingExpenses') return sum;
      const value = field?.value || '0';
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

  const renderAdditionalLineItems = (sectionPath: string[], sectionName: string, colorClass: string) => {
    let current: any = formData;
    for (let i = 0; i < sectionPath.length; i++) {
      current = current[sectionPath[i]];
    }

    const additionalItems = current.AdditionalLineItems || [];

    return (
      <Card className="mb-4 border-dashed border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={`text-sm ${colorClass}`}>
              Additional {sectionName} Items
            </CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addAdditionalLineItem(sectionPath)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Custom Item
            </Button>
          </div>
        </CardHeader>
        {additionalItems.length > 0 && (
          <CardContent>
            <div className="space-y-4">
              {additionalItems.map((item: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">Custom Item #{index + 1}</Label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAdditionalLineItem(sectionPath, index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Item Name</Label>
                      <Input
                        value={item.name || ''}
                        onChange={(e) => updateAdditionalLineItem(sectionPath, index, 'name', e.target.value)}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Total Value</Label>
                      <Input
                        type="number"
                        value={item.value || ''}
                        onChange={(e) => updateAdditionalLineItem(sectionPath, index, 'value', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-xs">Line Items for {item.name}</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addLineItem([...sectionPath, 'AdditionalLineItems', index.toString()], item.name)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Line Item
                      </Button>
                    </div>
                    
                    {item.entries && item.entries.length > 0 && (
                      <div className="space-y-2">
                        {item.entries.map((entry: any, entryIndex: number) => (
                          <div key={entryIndex} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 bg-background rounded">
                            <div className="md:col-span-2">
                              <Input
                                placeholder="Entry name"
                                value={entry.name || ''}
                                onChange={(e) => updateLineItem([...sectionPath, 'AdditionalLineItems', index.toString()], entryIndex, 'name', e.target.value)}
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Input
                                type="number"
                                placeholder="0.00"
                                value={entry.value || ''}
                                onChange={(e) => updateLineItem([...sectionPath, 'AdditionalLineItems', index.toString()], entryIndex, 'value', e.target.value)}
                                step="0.01"
                                className="text-xs"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeLineItem([...sectionPath, 'AdditionalLineItems', index.toString()], entryIndex)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  const renderFieldGroup = (title: string, fields: any, basePath: string[], colorClass: string) => (
    <div className="mb-6">
      <Card>
        <CardHeader>
          <CardTitle className={colorClass}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(fields).map(([key, field]: [string, any]) => {
              if (key.startsWith('Total') || key === 'AdditionalLineItems') return null;
              
              const fieldPath = [...basePath, key];
              const entries = field?.entries || [];
              
              return (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">{field?.fieldLabel || key}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLineItem(fieldPath, field?.fieldLabel || key)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Line Item
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <div className="md:col-span-2">
                      <Label htmlFor={key} className="text-xs">Total Value</Label>
                      <Input
                        id={key}
                        type="number"
                        value={field?.value || ''}
                        onChange={(e) => updateField(fieldPath, e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  {entries.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Line Items:</Label>
                      {entries.map((entry: any, index: number) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 bg-muted rounded">
                          <div className="md:col-span-2">
                            <Input
                              placeholder="Item name"
                              value={entry.name || ''}
                              onChange={(e) => updateLineItem(fieldPath, index, 'name', e.target.value)}
                              className="text-xs"
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={entry.value || ''}
                              onChange={(e) => updateLineItem(fieldPath, index, 'value', e.target.value)}
                              step="0.01"
                              className="text-xs"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLineItem(fieldPath, index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Line Items Section */}
      {renderAdditionalLineItems(basePath, title, colorClass)}
    </div>
  );

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
                {statement ? 'Update' : 'Add'} profit and loss information
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

        {/* Income Section */}
        {renderFieldGroup(
          'Operating Income', 
          formData.data.Financials[0].Income.Operating, 
          ['data', 'Financials', '0', 'Income', 'Operating'], 
          'text-green-700'
        )}

        {/* COGS Section */}
        {renderFieldGroup(
          'Cost of Goods Sold', 
          formData.data.Financials[0].Expense.Cogs, 
          ['data', 'Financials', '0', 'Expense', 'Cogs'], 
          'text-orange-700'
        )}

        {/* Operating Expenses Section */}
        {renderFieldGroup(
          'Operating Expenses', 
          formData.data.Financials[0].Expense.Operating, 
          ['data', 'Financials', '0', 'Expense', 'Operating'], 
          'text-red-700'
        )}

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
    </div>
  );
};

export default FinancialStatementForm;
