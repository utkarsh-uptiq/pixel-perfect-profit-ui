
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { FinancialStatement, FieldValue, LineItem } from '@/types/financial';
import FieldFilter from './FieldFilter';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';

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
  const defaultFormData = {
    CompanyName: { value: '', fieldLabel: 'Company Name' },
    DocumentDate: { value: '', fieldLabel: 'Document Date' },
    Financials: [{
      Year: new Date().getFullYear().toString(),
      Income: {
        Operating: {},
        TotalOperatingIncome: { value: '0', fieldLabel: 'Total Operating Income', entries: [] }
      },
      Expense: {
        Operating: {},
        TotalOperatingExpenses: { value: '0', fieldLabel: 'Total Operating Expenses', entries: [] }
      },
      NetIncome: { value: '0', fieldLabel: 'Net Income', entries: [] }
    }]
  };

  const methods = useForm({
    defaultValues: statement?.data || defaultFormData
  });

  const { register, handleSubmit, control, watch, setValue, getValues } = methods;

  const handleFieldSelect = (sectionId: string, fieldKey: string, fieldLabel: string) => {
    const fieldElement = document.querySelector(`[data-field="${sectionId}-${fieldKey}"]`);
    if (fieldElement) {
      fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      fieldElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        fieldElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 3000);
    }
  };

  const handleAddCustomItem = (sectionId: string) => {
    console.log(`Add custom item to ${sectionId} section`);
  };

  const onSubmit = (data: any) => {
    onSave(data);
  };

  const renderFieldWithEntries = (
    sectionKey: string,
    fieldKey: string,
    field: FieldValue,
    basePath: string
  ) => {
    return (
      <Card key={fieldKey} className="mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{field.fieldLabel || fieldKey}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor={`${basePath}.value`}>Total Value</Label>
              <Input
                id={`${basePath}.value`}
                type="number"
                step="0.01"
                {...register(`${basePath}.value`)}
                data-field={`${sectionKey}-${fieldKey}`}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Line Items</Label>
                <LineItemArray basePath={`${basePath}.entries`} control={control} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!statement) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button type="button" variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Edit Financial Statement</h1>
              <p className="text-muted-foreground text-lg">Update profit and loss information</p>
            </div>
          </div>
          <Button type="submit">
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
                <Label htmlFor="CompanyName.value">Company Name</Label>
                <Input
                  id="CompanyName.value"
                  {...register('CompanyName.value')}
                  data-field="company-name"
                />
              </div>
              <div>
                <Label htmlFor="DocumentDate.value">Document Date</Label>
                <Input
                  id="DocumentDate.value"
                  type="date"
                  {...register('DocumentDate.value')}
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
                
                return renderFieldWithEntries(
                  'income',
                  key,
                  field,
                  `Financials.0.Income.Operating.${key}`
                );
              })
            }
            
            {/* Total Operating Income */}
            {statement.data.Financials[0].Income.TotalOperatingIncome && 
              renderFieldWithEntries(
                'income',
                'TotalOperatingIncome',
                statement.data.Financials[0].Income.TotalOperatingIncome,
                'Financials.0.Income.TotalOperatingIncome'
              )
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
                
                return renderFieldWithEntries(
                  'cogs',
                  key,
                  field,
                  `Financials.0.Expense.Cogs.${key}`
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
              
              return renderFieldWithEntries(
                'expenses',
                key,
                field,
                `Financials.0.Expense.Operating.${key}`
              );
            })}

            {/* Total Operating Expenses */}
            {statement.data.Financials[0].Expense.TotalOperatingExpenses && 
              renderFieldWithEntries(
                'expenses',
                'TotalOperatingExpenses',
                statement.data.Financials[0].Expense.TotalOperatingExpenses,
                'Financials.0.Expense.TotalOperatingExpenses'
              )
            }
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

// Separate component for managing line item arrays
const LineItemArray = ({ basePath, control }: { basePath: string; control: any }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: basePath,
  });

  const addLineItem = () => {
    append({
      bbox: [],
      name: '',
      value: ''
    });
  };

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-3 items-end">
          <div className="flex-1">
            <Label htmlFor={`${basePath}.${index}.name`}>Item Name</Label>
            <Input
              id={`${basePath}.${index}.name`}
              {...control.register(`${basePath}.${index}.name`)}
              placeholder="Enter item name"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`${basePath}.${index}.value`}>Value</Label>
            <Input
              id={`${basePath}.${index}.value`}
              type="number"
              step="0.01"
              {...control.register(`${basePath}.${index}.value`)}
              placeholder="0.00"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => remove(index)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addLineItem}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Line Item
      </Button>
    </div>
  );
};

export default FinancialStatementForm;
