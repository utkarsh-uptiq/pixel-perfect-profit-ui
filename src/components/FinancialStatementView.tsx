
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Calendar, Building2, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { FinancialStatement } from '@/types/financial';
import FieldFilter from './FieldFilter';

interface FinancialStatementViewProps {
  statement: FinancialStatement;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const FinancialStatementView: React.FC<FinancialStatementViewProps> = ({
  statement,
  onBack,
  onEdit,
  onDelete,
}) => {
  const formatCurrency = (value: string) => {
    const num = parseFloat(value || '0');
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const financial = statement.data.Financials[0];
  const netIncome = parseFloat(financial.NetIncome.value || '0');
  const isPositive = netIncome >= 0;

  const handleFieldSelect = (sectionId: string, fieldKey: string, fieldLabel: string) => {
    const anchor = `#${sectionId}-section`;
    const element = document.querySelector(anchor);
    element?.scrollIntoView({ behavior: 'smooth' });
    
    // Highlight the specific field
    setTimeout(() => {
      const fieldElement = document.querySelector(`[data-field="${sectionId}-${fieldKey}"]`);
      if (fieldElement) {
        fieldElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
        setTimeout(() => {
          fieldElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
        }, 3000);
      }
    }, 500);
  };

  const handleAddCustomItem = (sectionId: string) => {
    const anchor = `#${sectionId}-section`;
    const element = document.querySelector(anchor);
    element?.scrollIntoView({ behavior: 'smooth' });
    console.log(`Add custom item to ${sectionId} section`);
  };

  const renderFieldSection = (title: string, fields: any, colorClass: string, sectionId: string) => {
    const fieldsWithValues = Object.entries(fields).filter(([key, field]: [string, any]) => {
      return !key.startsWith('Total') && !key.includes('AdditionalLineItems') && (field?.value || (field?.entries && field.entries.length > 0));
    });

    if (fieldsWithValues.length === 0) return null;

    return (
      <Card className="mb-6" id={`${sectionId}-section`}>
        <CardHeader>
          <CardTitle className={colorClass}>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fieldsWithValues.map(([key, field]: [string, any]) => (
              <div 
                key={key} 
                className="border-b border-gray-100 last:border-0 pb-3 last:pb-0 transition-all duration-300"
                data-field={`${sectionId}-${key}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">{field?.fieldLabel || key}</span>
                  <span className={`font-semibold ${colorClass.replace('text-', 'text-')}`}>
                    {formatCurrency(field?.value || '0')}
                  </span>
                </div>
                
                {field?.entries && field.entries.length > 0 && (
                  <div className="ml-4 space-y-1">
                    {field.entries.map((entry: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm text-muted-foreground">
                        <span>{entry.name}</span>
                        <span>{formatCurrency(entry.value)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {statement.data.CompanyName.value}
            </h1>
            <p className="text-muted-foreground text-lg">
              Profit and Loss Statement
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Field Filter */}
      <FieldFilter
        statement={statement}
        onFieldSelect={handleFieldSelect}
        onAddCustomItem={handleAddCustomItem}
      />

      {/* Document Info */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{statement.data.CompanyName.value}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Period Ending</p>
                <p className="font-medium">{statement.data.DocumentDate.value}</p>
              </div>
            </div>
            <div className="flex items-center">
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
              )}
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? 'Profitable' : 'Loss'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600 mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-900">
                {formatCurrency(financial.Income.TotalOperatingIncome?.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600 mb-2">Gross Profit</p>
              <p className="text-3xl font-bold text-blue-900">
                {formatCurrency(financial.GrossProfit?.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600 mb-2">Total Expenses</p>
              <p className="text-3xl font-bold text-red-900">
                {formatCurrency(financial.Expense.TotalOperatingExpenses?.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${isPositive ? 'from-purple-50 to-purple-100 border-purple-200' : 'from-red-50 to-red-100 border-red-200'}`}>
          <CardContent className="p-6">
            <div className="text-center">
              <p className={`text-sm font-medium mb-2 ${isPositive ? 'text-purple-600' : 'text-red-600'}`}>
                Net Income
              </p>
              <p className={`text-3xl font-bold ${isPositive ? 'text-purple-900' : 'text-red-900'}`}>
                {formatCurrency(financial.NetIncome.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Details */}
      {renderFieldSection('Operating Income', financial.Income.Operating, 'text-green-700', 'income')}

      {/* Show Total Operating Income */}
      {financial.Income.TotalOperatingIncome && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center py-3 border-t-2 border-green-200">
              <span className="text-lg font-semibold text-foreground">Total Operating Income</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(financial.Income.TotalOperatingIncome.value || '0')}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* COGS Details */}
      {financial.Expense.Cogs && renderFieldSection('Cost of Goods Sold', financial.Expense.Cogs, 'text-orange-700', 'cogs')}

      {/* Expense Details */}
      {renderFieldSection('Operating Expenses', financial.Expense.Operating, 'text-red-700', 'expenses')}

      {/* Show Total Operating Expenses */}
      {financial.Expense.TotalOperatingExpenses && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center py-3 border-t-2 border-red-200">
              <span className="text-lg font-semibold text-foreground">Total Operating Expenses</span>
              <span className="text-xl font-bold text-red-600">
                {formatCurrency(financial.Expense.TotalOperatingExpenses.value || '0')}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Net Income Summary */}
      <Card id="summary-section">
        <CardHeader>
          <CardTitle className="text-primary">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>Total Income</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(financial.Income.TotalOperatingIncome?.value || '0')}
              </span>
            </div>
            {financial.GrossProfit && (
              <div className="flex justify-between items-center text-lg">
                <span>Gross Profit</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(financial.GrossProfit.value || '0')}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center text-lg">
              <span>Total Expenses</span>
              <span className="font-semibold text-red-600">
                ({formatCurrency(financial.Expense.TotalOperatingExpenses?.value || '0')})
              </span>
            </div>
            <div className="border-t-2 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-foreground">Net Income</span>
                <span className={`text-4xl font-bold ${isPositive ? 'text-primary' : 'text-red-600'}`}>
                  {formatCurrency(financial.NetIncome.value || '0')}
                </span>
              </div>
              <p className={`text-right text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? 'Profit' : 'Loss'} for the period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatementView;
