
import React, { useState } from 'react';
import CropCard from '@/components/CropCard';
import { useData, CropType } from '@/contexts/DataContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const cropTypes: CropType[] = [
  'Wheat',
  'Corn',
  'Soybean',
  'Rice',
  'Barley',
  'Coffee',
  'Cotton',
  'Other',
];

const MarketplacePage = () => {
  const { crops } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showOrganic, setShowOrganic] = useState(false);
  const [sortOption, setSortOption] = useState('newest');

  // Filter crops based on search, type, and organic status
  const filteredCrops = crops.filter(crop => {
    // Only show crops that are listed for sale
    if (!crop.listed) return false;

    // Filter by search term
    const matchesSearch = searchTerm === '' || 
      crop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by crop type
    const matchesType = selectedType === '' || crop.type === selectedType;

    // Filter by organic status
    const matchesOrganic = !showOrganic || crop.organic;

    return matchesSearch && matchesType && matchesOrganic;
  });

  // Sort the filtered crops
  const sortedCrops = [...filteredCrops].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'priceAsc':
        return a.basePrice - b.basePrice;
      case 'priceDesc':
        return b.basePrice - a.basePrice;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Crop Marketplace</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <Label htmlFor="search" className="text-sm">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by crop type, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Crop Type Filter */}
          <div>
            <Label htmlFor="cropType" className="text-sm">Crop Type</Label>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger id="cropType">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                {cropTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Sort Options */}
          <div>
            <Label htmlFor="sortOption" className="text-sm">Sort By</Label>
            <Select
              value={sortOption}
              onValueChange={setSortOption}
            >
              <SelectTrigger id="sortOption">
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="organicOnly" 
              checked={showOrganic}
              onCheckedChange={(checked) => setShowOrganic(checked as boolean)}
            />
            <Label htmlFor="organicOnly" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Organic crops only
            </Label>
          </div>
          
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
                setShowOrganic(false);
                setSortOption('newest');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      
      {sortedCrops.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCrops.map(crop => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-gray-900">No crops found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
