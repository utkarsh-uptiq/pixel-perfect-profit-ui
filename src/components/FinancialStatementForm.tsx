
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import { FinancialStatement } from '@/types/financial';
import FieldFilter from './FieldFilter';

interface FinancialStatementFormProps {
  statement?: FinancialStatement;
  onBack: () => void;
  onSave: (data: any) => void;
}

const FinancialStatementForm: React.FC<FinancialStatementFormProps> = ({
  statement,
  onBack,
  onSave,
}) => {
  const [formData, setFormData] = useState(statement?.data || {});

  const handleFieldSelect = (sectionId: string, fieldKey: string, fieldLabel: string) => {
    // Scroll to the specific field
    const fieldElement = document.querySelector(`[data-field="${sectionId}-${fieldKey}"]`);
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight the field
      fieldElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        fieldElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 3000);
    }
  };

  const handleAddCustomItem = (sectionId: string) => {
    console.log(`Add custom item to ${sectionId} section`);
    // This could open a dialog or expand a form section
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!statement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Edit Financial Statement</h1>
            <p className="text-muted-foreground text-lg">Update profit and loss information</p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Statement
        </Button>
      </div>

      {/* Field Filter for searching */}
      <FieldFilter
        statement={statement}
        onFieldSelect={handleFieldSelect}
        onAddCustomItem={handleAddCustomItem}
      />

      {/* Company Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                value={formData.CompanyName?.value || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  CompanyName: { ...formData.CompanyName, value: e.target.value }
                })}
                data-field="company-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Document Date</label>
              <Input
                type="date"
                value={formData.DocumentDate?.value || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  DocumentDate: { ...formData.DocumentDate, value: e.target.value }
                })}
                data-field="company-date"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Income Section */}
      <Card className="mb-6" id="income-section">
        <CardHeader>
          <CardTitle className="text-green-700">Operating Income</CardTitle>
        </CardHeader>
        <CardContent>
          {statement.data.Financials[0].Income.Operating && 
            Object.entries(statement.data.Financials[0].Income.Operating).map(([key, field]) => {
              if (key === 'AdditionalLineItems' || key === 'TotalOperatingIncome') return null;
              if (!field || typeof field !== 'object' || !('fieldLabel' in field)) return null;
              
              return (
                <div key={key} className="mb-4 p-3 border rounded transition-all duration-300" data-field={`income-${key}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">{field.fieldLabel}</label>
                    <Button variant="outline" size="sm">Add Line Item</Button>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Total Value</label>
                    <Input
                      type="number"
                      value={field.value || '0'}
                      onChange={(e) => {
                        const updatedField = { ...field, value: e.target.value };
                        setFormData({
                          ...formData,
                          Financials: [{
                            ...formData.Financials[0],
                            Income: {
                              ...formData.Financials[0].Income,
                              Operating: {
                                ...formData.Financials[0].Income.Operating,
                                [key]: updatedField
                              }
                            }
                          }]
                        });
                      }}
                      step="0.01"
                    />
                  </div>
                </div>
              );
            })
          }
        </CardContent>
      </Card>

      {/* COGS Section */}
      {statement.data.Financials[0].Expense.Cogs && (
        <Card className="mb-6" id="cogs-section">
          <CardHeader>
            <CardTitle className="text-orange-700">Cost of Goods Sold</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(statement.data.Financials[0].Expense.Cogs).map(([key, field]) => {
              if (key === 'AdditionalLineItems') return null;
              if (!field || typeof field !== 'object' || !('fieldLabel' in field)) return null;
              
              return (
                <div key={key} className="mb-4 p-3 border rounded transition-all duration-300" data-field={`cogs-${key}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">{field.fieldLabel}</label>
                    <Button variant="outline" size="sm">Add Line Item</Button>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Total Value</label>
                    <Input
                      type="number"
                      value={field.value || '0'}
                      step="0.01"
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Operating Expenses Section */}
      <Card className="mb-6" id="expenses-section">
        <CardHeader>
          <CardTitle className="text-red-700">Operating Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(statement.data.Financials[0].Expense.Operating).map(([key, field]) => {
            if (key === 'AdditionalLineItems' || key === 'TotalOperatingExpenses') return null;
            if (!field || typeof field !== 'object' || !('fieldLabel' in field)) return null;
            
            return (
              <div key={key} className="mb-4 p-3 border rounded transition-all duration-300" data-field={`expenses-${key}`}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">{field.fieldLabel}</label>
                  <Button variant="outline" size="sm">Add Line Item</Button>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Total Value</label>
                  <Input
                    type="number"
                    value={field.value || '0'}
                    step="0.01"
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatementForm;
