
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Calendar, DollarSign, TrendingUp, Building2 } from 'lucide-react';
import FinancialStatementForm from './FinancialStatementForm';
import FinancialStatementView from './FinancialStatementView';
import { FinancialStatement } from '@/types/financial';

const initialData: FinancialStatement = {
  id: "3e780336-78b6-4534-a28f-e508632a025e",
  documentId: "59cee180-7984-437e-bc4e-4427b03fbc67",
  type: "BusinessFinancialStatement",
  subtype: null,
  formType: "ProfitAndLossStatement",
  data: {
    Financials: [{
      Year: "2023",
      Income: {
        Operating: {
          RentalIncome: { value: "802085", fieldLabel: "Rent Income" },
          InterestIncome: { value: "87", fieldLabel: "Interest & Other Income" },
          RealEstateLeaseIncome: { value: "148772", fieldLabel: "Real Estate Lease Income" },
          OtherRevenue: { value: "10644", fieldLabel: "Other Revenue" },
          TotalOperatingIncome: { value: "961588", fieldLabel: "Total Income" }
        }
      },
      Expense: {
        Operating: {
          Insurance: { value: "54670", fieldLabel: "Insurance" },
          BankCharges: { value: "110", fieldLabel: "Bank Service Charges" },
          ProfessionalFees: { value: "4022", fieldLabel: "Professional Fees" },
          PermitsAndLicenses: { value: "309", fieldLabel: "Licenses and Permits" },
          RepairsAndMaintenance: { value: "12354", fieldLabel: "Repairs, Maint. & Tenant Imp." },
          Utilities: { value: "26784", fieldLabel: "Utilities" },
          OtherOperatingExpenses: { value: "419497", fieldLabel: "Other Operating Expenses" },
          TotalOperatingExpenses: { value: "517746", fieldLabel: "Total Expense" }
        }
      },
      NetIncome: { value: "443842", fieldLabel: "Net Income" }
    }],
    CompanyName: { value: "Charles Evans" },
    DocumentDate: { value: "12/31/2023" },
    ReportingDates: ["12/31/2023"]
  },
  extractedAt: "2025-06-10T08:57:17.450Z",
  status: "Completed",
  year: null,
  version: "latest"
};

const FinancialStatementManager = () => {
  const [statements, setStatements] = useState<FinancialStatement[]>([initialData]);
  const [selectedStatement, setSelectedStatement] = useState<FinancialStatement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStatement, setEditingStatement] = useState<FinancialStatement | null>(null);

  const handleCreate = () => {
    setEditingStatement(null);
    setIsFormOpen(true);
  };

  const handleEdit = (statement: FinancialStatement) => {
    setEditingStatement(statement);
    setIsFormOpen(true);
  };

  const handleSave = (statement: FinancialStatement) => {
    if (editingStatement) {
      setStatements(prev => prev.map(s => s.id === statement.id ? statement : s));
    } else {
      setStatements(prev => [...prev, { ...statement, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setEditingStatement(null);
  };

  const handleDelete = (id: string) => {
    setStatements(prev => prev.filter(s => s.id !== id));
    if (selectedStatement?.id === id) {
      setSelectedStatement(null);
    }
  };

  const handleView = (statement: FinancialStatement) => {
    setSelectedStatement(statement);
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

  if (isFormOpen) {
    return (
      <FinancialStatementForm
        statement={editingStatement}
        onSave={handleSave}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  }

  if (selectedStatement) {
    return (
      <FinancialStatementView
        statement={selectedStatement}
        onBack={() => setSelectedStatement(null)}
        onEdit={() => handleEdit(selectedStatement)}
        onDelete={() => handleDelete(selectedStatement.id)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Financial Statements</h1>
            <p className="text-muted-foreground text-lg">Manage your profit and loss statements</p>
          </div>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            New Statement
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Statements</p>
                <p className="text-2xl font-bold text-blue-900">{statements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Total Income</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(statements.reduce((sum, s) => 
                    sum + parseFloat(s.data.Financials[0]?.Income?.Operating?.TotalOperatingIncome?.value || '0'), 0
                  ).toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-red-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatCurrency(statements.reduce((sum, s) => 
                    sum + parseFloat(s.data.Financials[0]?.Expense?.Operating?.TotalOperatingExpenses?.value || '0'), 0
                  ).toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Net Income</p>
                <p className="text-2xl font-bold text-purple-900">
                  {formatCurrency(statements.reduce((sum, s) => 
                    sum + parseFloat(s.data.Financials[0]?.NetIncome?.value || '0'), 0
                  ).toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statements.map((statement) => (
          <Card key={statement.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">{statement.data.CompanyName.value}</span>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {statement.formType}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {statement.data.DocumentDate.value}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Income:</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(statement.data.Financials[0]?.Income?.Operating?.TotalOperatingIncome?.value || '0')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expenses:</span>
                    <span className="text-sm font-medium text-red-600">
                      {formatCurrency(statement.data.Financials[0]?.Expense?.Operating?.TotalOperatingExpenses?.value || '0')}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Net Income:</span>
                    <span className="text-sm font-bold text-primary">
                      {formatCurrency(statement.data.Financials[0]?.NetIncome?.value || '0')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(statement);
                    }}
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(statement);
                    }}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(statement.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {statements.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No financial statements</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first profit and loss statement.</p>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Statement
          </Button>
        </div>
      )}
    </div>
  );
};

export default FinancialStatementManager;
