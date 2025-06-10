
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Calendar, Building2 } from 'lucide-react';
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
  const [formData, setFormData] = useState<FinancialStatement>({
    id: '',
    documentId: '',
    type: 'BusinessFinancialStatement',
    subtype: null,
    formType: 'ProfitAndLossStatement',
    data: {
      Financials: [{
        Year: new Date().getFullYear().toString(),
        Income: {
          Operating: {
            RentalIncome: { value: '', fieldLabel: 'Rental Income' },
            InterestIncome: { value: '', fieldLabel: 'Interest Income' },
            RealEstateLeaseIncome: { value: '', fieldLabel: 'Real Estate Lease Income' },
            OtherRevenue: { value: '', fieldLabel: 'Other Revenue' },
            TotalOperatingIncome: { value: '', fieldLabel: 'Total Operating Income' }
          }
        },
        Expense: {
          Operating: {
            Insurance: { value: '', fieldLabel: 'Insurance' },
            BankCharges: { value: '', fieldLabel: 'Bank Charges' },
            ProfessionalFees: { value: '', fieldLabel: 'Professional Fees' },
            PermitsAndLicenses: { value: '', fieldLabel: 'Permits and Licenses' },
            RepairsAndMaintenance: { value: '', fieldLabel: 'Repairs and Maintenance' },
            Utilities: { value: '', fieldLabel: 'Utilities' },
            OtherOperatingExpenses: { value: '', fieldLabel: 'Other Operating Expenses' },
            TotalOperatingExpenses: { value: '', fieldLabel: 'Total Operating Expenses' }
          }
        },
        NetIncome: { value: '', fieldLabel: 'Net Income' }
      }],
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
      setFormData(statement);
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
    
    // Calculate total income
    const incomeFields = ['RentalIncome', 'InterestIncome', 'RealEstateLeaseIncome', 'OtherRevenue'];
    const totalIncome = incomeFields.reduce((sum, field) => {
      const value = financial.Income.Operating[field]?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate total expenses
    const expenseFields = ['Insurance', 'BankCharges', 'ProfessionalFees', 'PermitsAndLicenses', 'RepairsAndMaintenance', 'Utilities', 'OtherOperatingExpenses'];
    const totalExpenses = expenseFields.reduce((sum, field) => {
      const value = financial.Expense.Operating[field]?.value || '0';
      return sum + parseFloat(value);
    }, 0);
    
    // Calculate net income
    const netIncome = totalIncome - totalExpenses;
    
    // Update totals
    updateField(['data', 'Financials', '0', 'Income', 'Operating', 'TotalOperatingIncome'], totalIncome.toString());
    updateField(['data', 'Financials', '0', 'Expense', 'Operating', 'TotalOperatingExpenses'], totalExpenses.toString());
    updateField(['data', 'Financials', '0', 'NetIncome'], netIncome.toString());
  };

  useEffect(() => {
    calculateTotals();
  }, [formData.data.Financials[0].Income.Operating, formData.data.Financials[0].Expense.Operating]);

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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-green-700">Operating Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.entries(formData.data.Financials[0].Income.Operating).map(([key, field]) => {
                if (key === 'TotalOperatingIncome') return null;
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{field?.fieldLabel || key}</Label>
                    <Input
                      id={key}
                      type="number"
                      value={field?.value || ''}
                      onChange={(e) => updateField(['data', 'Financials', '0', 'Income', 'Operating', key], e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Total Operating Income</Label>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(formData.data.Financials[0].Income.Operating.TotalOperatingIncome?.value || '0')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-700">Operating Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.entries(formData.data.Financials[0].Expense.Operating).map(([key, field]) => {
                if (key === 'TotalOperatingExpenses') return null;
                return (
                  <div key={key}>
                    <Label htmlFor={key}>{field?.fieldLabel || key}</Label>
                    <Input
                      id={key}
                      type="number"
                      value={field?.value || ''}
                      onChange={(e) => updateField(['data', 'Financials', '0', 'Expense', 'Operating', key], e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Total Operating Expenses</Label>
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(formData.data.Financials[0].Expense.Operating.TotalOperatingExpenses?.value || '0')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Income Summary */}
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
                <span>Total Expenses:</span>
                <span className="font-semibold text-red-600">
                  {formatCurrency(formData.data.Financials[0].Expense.Operating.TotalOperatingExpenses?.value || '0')}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold">Net Income:</span>
                  <span className="text-3xl font-bold text-primary">
                    {formatCurrency(formData.data.Financials[0].NetIncome.value || '0')}
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
