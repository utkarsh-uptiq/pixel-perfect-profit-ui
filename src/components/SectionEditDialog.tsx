
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Search, Save } from 'lucide-react';
import { FieldValue, LineItem, AdditionalLineItem } from '@/types/financial';

interface SectionEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  sectionData: Record<string, FieldValue | AdditionalLineItem[]>;
  sectionPath: string[];
  colorClass: string;
  onSave: (updatedData: Record<string, FieldValue | AdditionalLineItem[]>) => void;
}

const SectionEditDialog: React.FC<SectionEditDialogProps> = ({
  open,
  onOpenChange,
  title,
  sectionData,
  sectionPath,
  colorClass,
  onSave,
}) => {
  const [editedData, setEditedData] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKeys, setFilteredKeys] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setEditedData(JSON.parse(JSON.stringify(sectionData)));
      updateFilteredKeys('');
    }
  }, [open, sectionData]);

  const updateFilteredKeys = (term: string) => {
    const keys = Object.keys(sectionData).filter(key => {
      if (key === 'AdditionalLineItems') return true;
      if (key.startsWith('Total')) return true;
      const fieldLabel = (sectionData[key] as FieldValue)?.fieldLabel?.toLowerCase() || '';
      return fieldLabel.includes(term.toLowerCase());
    });
    setFilteredKeys(keys);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateFilteredKeys(term);
  };

  const handleSave = () => {
    onSave(editedData);
    onOpenChange(false);
  };

  const updateField = (key: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        value
      }
    }));
  };

  const addLineItem = (key: string, fieldLabel: string) => {
    setEditedData(prev => {
      const updated = { ...prev };
      if (!updated[key].entries) {
        updated[key].entries = [];
      }
      
      updated[key].entries.push({
        name: `New ${fieldLabel} Item`,
        value: '0'
      });
      
      return updated;
    });
  };

  const updateLineItem = (key: string, index: number, field: 'name' | 'value', value: string) => {
    setEditedData(prev => {
      const updated = { ...prev };
      if (updated[key].entries && updated[key].entries[index]) {
        updated[key].entries[index][field] = value;
      }
      return updated;
    });
  };

  const removeLineItem = (key: string, index: number) => {
    setEditedData(prev => {
      const updated = { ...prev };
      if (updated[key].entries) {
        updated[key].entries.splice(index, 1);
      }
      return updated;
    });
  };

  const addAdditionalLineItem = () => {
    setEditedData(prev => {
      const updated = { ...prev };
      if (!updated.AdditionalLineItems) {
        updated.AdditionalLineItems = [];
      }
      (updated.AdditionalLineItems as AdditionalLineItem[]).push({
        name: 'Custom Line Item',
        value: '0',
        fieldLabel: 'Custom Line Item',
        entries: []
      });
      return updated;
    });
  };

  const updateAdditionalLineItem = (index: number, field: string, value: string) => {
    setEditedData(prev => {
      const updated = { ...prev };
      const items = updated.AdditionalLineItems as AdditionalLineItem[];
      if (items && items[index]) {
        items[index] = { ...items[index], [field]: value };
      }
      return updated;
    });
  };

  const removeAdditionalLineItem = (index: number) => {
    setEditedData(prev => {
      const updated = { ...prev };
      const items = updated.AdditionalLineItems as AdditionalLineItem[];
      if (items) {
        items.splice(index, 1);
      }
      return updated;
    });
  };

  const addAdditionalLineItemEntry = (additionalIndex: number, fieldLabel: string) => {
    setEditedData(prev => {
      const updated = { ...prev };
      const items = updated.AdditionalLineItems as AdditionalLineItem[];
      if (!items[additionalIndex].entries) {
        items[additionalIndex].entries = [];
      }
      
      items[additionalIndex].entries!.push({
        name: `New ${fieldLabel} Item`,
        value: '0'
      });
      
      return updated;
    });
  };

  const updateAdditionalLineItemEntry = (
    additionalIndex: number, 
    entryIndex: number, 
    field: 'name' | 'value', 
    value: string
  ) => {
    setEditedData(prev => {
      const updated = { ...prev };
      const items = updated.AdditionalLineItems as AdditionalLineItem[];
      if (items[additionalIndex].entries && items[additionalIndex].entries![entryIndex]) {
        items[additionalIndex].entries![entryIndex][field] = value;
      }
      return updated;
    });
  };

  const removeAdditionalLineItemEntry = (additionalIndex: number, entryIndex: number) => {
    setEditedData(prev => {
      const updated = { ...prev };
      const items = updated.AdditionalLineItems as AdditionalLineItem[];
      if (items[additionalIndex].entries) {
        items[additionalIndex].entries!.splice(entryIndex, 1);
      }
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${colorClass}`}>{title}</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter fields..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredKeys.map(key => {
            if (key === 'AdditionalLineItems') {
              // Render additional line items
              const additionalItems = editedData.AdditionalLineItems as AdditionalLineItem[] || [];
              
              return (
                <Card key={key} className="p-4 border-dashed border-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-medium ${colorClass}`}>Additional Items</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAdditionalLineItem}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Custom Item
                    </Button>
                  </div>
                  
                  {additionalItems.length > 0 ? (
                    <div className="space-y-4">
                      {additionalItems.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-sm font-medium">Custom Item #{index + 1}</Label>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeAdditionalLineItem(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Item Name</Label>
                              <Input
                                value={item.name || ''}
                                onChange={(e) => updateAdditionalLineItem(index, 'name', e.target.value)}
                                placeholder="Enter item name"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Total Value</Label>
                              <Input
                                type="number"
                                value={item.value || ''}
                                onChange={(e) => updateAdditionalLineItem(index, 'value', e.target.value)}
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
                                onClick={() => addAdditionalLineItemEntry(index, item.name)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Line Item
                              </Button>
                            </div>
                            
                            {item.entries && item.entries.length > 0 && (
                              <div className="space-y-2">
                                {item.entries.map((entry, entryIndex) => (
                                  <div key={entryIndex} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 bg-background rounded">
                                    <div className="md:col-span-2">
                                      <Input
                                        placeholder="Entry name"
                                        value={entry.name || ''}
                                        onChange={(e) => updateAdditionalLineItemEntry(index, entryIndex, 'name', e.target.value)}
                                        className="text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={entry.value || ''}
                                        onChange={(e) => updateAdditionalLineItemEntry(index, entryIndex, 'value', e.target.value)}
                                        step="0.01"
                                        className="text-xs"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeAdditionalLineItemEntry(index, entryIndex)}
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
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No custom items added yet
                    </div>
                  )}
                </Card>
              );
            } else if (key.startsWith('Total')) {
              // Render total field differently
              const field = editedData[key] as FieldValue;
              return (
                <Card key={key} className="p-4 bg-muted/30 border-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-bold">{field.fieldLabel}</Label>
                    <span className="text-lg font-bold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(parseFloat(field.value || '0'))}
                    </span>
                  </div>
                </Card>
              );
            } else {
              const field = editedData[key] as FieldValue;
              const entries = field.entries || [];
              
              return (
                <Card key={key} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">{field.fieldLabel}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLineItem(key, field.fieldLabel)}
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
                        value={field.value || ''}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  {entries.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Line Items:</Label>
                      {entries.map((entry: LineItem, index: number) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 bg-muted rounded">
                          <div className="md:col-span-2">
                            <Input
                              placeholder="Item name"
                              value={entry.name || ''}
                              onChange={(e) => updateLineItem(key, index, 'name', e.target.value)}
                              className="text-xs"
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={entry.value || ''}
                              onChange={(e) => updateLineItem(key, index, 'value', e.target.value)}
                              step="0.01"
                              className="text-xs"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLineItem(key, index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            }
          })}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className={colorClass}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SectionEditDialog;
