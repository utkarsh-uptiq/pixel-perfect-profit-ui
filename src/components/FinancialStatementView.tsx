
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Calendar, Building2, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { FinancialStatement } from '@/types/financial';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600 mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-900">
                {formatCurrency(financial.Income.Operating.TotalOperatingIncome?.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600 mb-2">Total Expenses</p>
              <p className="text-3xl font-bold text-red-900">
                {formatCurrency(financial.Expense.Operating.TotalOperatingExpenses?.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br ${isPositive ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-red-50 to-red-100 border-red-200'}`}>
          <CardContent className="p-6">
            <div className="text-center">
              <p className={`text-sm font-medium mb-2 ${isPositive ? 'text-blue-600' : 'text-red-600'}`}>
                Net Income
              </p>
              <p className={`text-3xl font-bold ${isPositive ? 'text-blue-900' : 'text-red-900'}`}>
                {formatCurrency(financial.NetIncome.value || '0')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-green-700">Operating Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(financial.Income.Operating).map(([key, field]) => {
              if (key === 'TotalOperatingIncome' || !field?.value) return null;
              return (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-foreground">{field.fieldLabel || key}</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(field.value)}
                  </span>
                </div>
              );
            })}
            <div className="flex justify-between items-center py-3 border-t-2 border-green-200">
              <span className="text-lg font-semibold text-foreground">Total Operating Income</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(financial.Income.Operating.TotalOperatingIncome?.value || '0')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expense Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-red-700">Operating Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(financial.Expense.Operating).map(([key, field]) => {
              if (key === 'TotalOperatingExpenses' || !field?.value) return null;
              return (
                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-foreground">{field.fieldLabel || key}</span>
                  <span className="font-medium text-red-600">
                    {formatCurrency(field.value)}
                  </span>
                </div>
              );
            })}
            <div className="flex justify-between items-center py-3 border-t-2 border-red-200">
              <span className="text-lg font-semibold text-foreground">Total Operating Expenses</span>
              <span className="text-xl font-bold text-red-600">
                {formatCurrency(financial.Expense.Operating.TotalOperatingExpenses?.value || '0')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Income Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Net Income Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span>Total Income</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(financial.Income.Operating.TotalOperatingIncome?.value || '0')}
              </span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Total Expenses</span>
              <span className="font-semibold text-red-600">
                ({formatCurrency(financial.Expense.Operating.TotalOperatingExpenses?.value || '0')})
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
