
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Plus, Anchor } from 'lucide-react';
import { FinancialStatement, FieldValue, AdditionalLineItem } from '@/types/financial';

interface FieldFilterProps {
  statement: FinancialStatement;
  onFieldSelect: (sectionId: string, fieldKey: string, fieldLabel: string) => void;
  onAddCustomItem: (sectionId: string) => void;
}

interface FieldItem {
  key: string;
  label: string;
  value: string;
  sectionId: string;
  sectionName: string;
}

const FieldFilter: React.FC<FieldFilterProps> = ({
  statement,
  onFieldSelect,
  onAddCustomItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allFields, setAllFields] = useState<FieldItem[]>([]);
  const [filteredFields, setFilteredFields] = useState<FieldItem[]>([]);

  useEffect(() => {
    const fields: FieldItem[] = [];
    const financial = statement.data.Financials[0];

    // Extract Income fields
    Object.entries(financial.Income.Operating).forEach(([key, field]) => {
      // Skip AdditionalLineItems and check if field is a FieldValue object with fieldLabel
      if (key !== 'AdditionalLineItems' && field && typeof field === 'object' && 'fieldLabel' in field) {
        fields.push({
          key,
          label: field.fieldLabel,
          value: field.value || '0',
          sectionId: 'income',
          sectionName: 'Operating Income'
        });
      }
    });

    // Extract COGS fields
    if (financial.Expense.Cogs) {
      Object.entries(financial.Expense.Cogs).forEach(([key, field]) => {
        // Skip AdditionalLineItems and check if field is a FieldValue object with fieldLabel
        if (key !== 'AdditionalLineItems' && field && typeof field === 'object' && 'fieldLabel' in field) {
          fields.push({
            key,
            label: field.fieldLabel,
            value: field.value || '0',
            sectionId: 'cogs',
            sectionName: 'Cost of Goods Sold'
          });
        }
      });
    }

    // Extract Operating Expense fields
    Object.entries(financial.Expense.Operating).forEach(([key, field]) => {
      // Skip AdditionalLineItems and check if field is a FieldValue object with fieldLabel
      if (key !== 'AdditionalLineItems' && field && typeof field === 'object' && 'fieldLabel' in field) {
        fields.push({
          key,
          label: field.fieldLabel,
          value: field.value || '0',
          sectionId: 'expenses',
          sectionName: 'Operating Expenses'
        });
      }
    });

    setAllFields(fields);
  }, [statement]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFields(allFields);
    } else {
      setFilteredFields(
        allFields.filter(field =>
          field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          field.sectionName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allFields]);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value || '0');
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const sections = [
    { id: 'income', name: 'Operating Income', anchor: '#income-section' },
    { id: 'cogs', name: 'Cost of Goods Sold', anchor: '#cogs-section' },
    { id: 'expenses', name: 'Operating Expenses', anchor: '#expenses-section' },
    { id: 'summary', name: 'Financial Summary', anchor: '#summary-section' }
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Quick Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-4">Quick Navigation:</span>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="outline"
                size="sm"
                onClick={() => {
                  const element = document.querySelector(section.anchor);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs"
              >
                <Anchor className="h-3 w-3 mr-1" />
                {section.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Field Search */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search Fields ({allFields.length} total)
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Search Financial Statement Fields</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search by field name or section..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>No fields found.</CommandEmpty>
                <CommandGroup heading="Fields">
                  {filteredFields.map((field) => (
                    <CommandItem
                      key={`${field.sectionId}-${field.key}`}
                      onSelect={() => onFieldSelect(field.sectionId, field.key, field.label)}
                      className="flex justify-between items-center p-3 cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{field.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {field.sectionName}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(field.value)}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

            {/* Add Custom Items Section */}
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-medium">Add Custom Items</h3>
              {sections.slice(0, 3).map((section) => (
                <Button
                  key={section.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onAddCustomItem(section.id)}
                  className="w-full justify-start"
                >
                  <Plus className="h-3 w-3 mr-2" />
                  Add to {section.name}
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FieldFilter;
