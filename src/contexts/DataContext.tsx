
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type CropType = 'Wheat' | 'Corn' | 'Soybean' | 'Rice' | 'Barley' | 'Coffee' | 'Cotton' | 'Other';

export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  type: CropType;
  quantity: number;
  unit: 'kg' | 'tons' | 'bushels';
  basePrice: number;
  description: string;
  location: string;
  harvestDate: string;
  listed: boolean;
  imageUrl?: string;
  organic: boolean;
  createdAt: string;
  auctionEndDate: string;
}

export interface Bid {
  id: string;
  cropId: string;
  retailerId: string;
  retailerName: string;
  amount: number;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected' | 'won';
}

interface DataContextType {
  crops: Crop[];
  bids: Bid[];
  addCrop: (crop: Omit<Crop, 'id' | 'createdAt'>) => void;
  updateCrop: (id: string, updates: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
  placeBid: (cropId: string, retailerId: string, retailerName: string, amount: number) => void;
  updateBidStatus: (bidId: string, status: Bid['status']) => void;
  getCropsByFarmer: (farmerId: string) => Crop[];
  getBidsByRetailer: (retailerId: string) => Bid[];
  getBidsForCrop: (cropId: string) => Bid[];
  getCropById: (id: string) => Crop | undefined;
  getHighestBidForCrop: (cropId: string) => Bid | undefined;
}

// Sample data
const initialCrops: Crop[] = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'John Farmer',
    type: 'Wheat',
    quantity: 500,
    unit: 'bushels',
    basePrice: 7.50,
    description: 'High-quality winter wheat, harvested at optimal ripeness.',
    location: 'Midwest',
    harvestDate: '2023-07-15',
    listed: true,
    organic: true,
    createdAt: '2023-07-20T10:30:00Z',
    auctionEndDate: '2023-08-20T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1467638815453-f19c98e46bf4?q=80&w=2969&auto=format&fit=crop'
  },
  {
    id: '2',
    farmerId: '1',
    farmerName: 'John Farmer',
    type: 'Corn',
    quantity: 1000,
    unit: 'bushels',
    basePrice: 4.25,
    description: 'Fresh sweet corn, ideal for direct consumer markets.',
    location: 'Midwest',
    harvestDate: '2023-08-10',
    listed: true,
    organic: false,
    createdAt: '2023-08-15T14:20:00Z',
    auctionEndDate: '2023-09-15T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1601472533267-35d098b5b0b3?q=80&w=3026&auto=format&fit=crop'
  },
  {
    id: '3',
    farmerId: '1',
    farmerName: 'John Farmer',
    type: 'Soybean',
    quantity: 750,
    unit: 'bushels',
    basePrice: 10.15,
    description: 'Non-GMO soybeans, excellent for food-grade processing.',
    location: 'Midwest',
    harvestDate: '2023-09-20',
    listed: true,
    organic: true,
    createdAt: '2023-09-25T09:45:00Z',
    auctionEndDate: '2023-10-25T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1585454531583-93a955afef2e?q=80&w=3025&auto=format&fit=crop'
  }
];

const initialBids: Bid[] = [
  {
    id: '1',
    cropId: '1',
    retailerId: '2',
    retailerName: 'Sarah Retailer',
    amount: 8.00,
    createdAt: '2023-07-25T15:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    cropId: '1',
    retailerId: '2',
    retailerName: 'Sarah Retailer',
    amount: 8.25,
    createdAt: '2023-07-26T10:15:00Z',
    status: 'pending'
  },
  {
    id: '3',
    cropId: '2',
    retailerId: '2',
    retailerName: 'Sarah Retailer',
    amount: 4.50,
    createdAt: '2023-08-18T09:20:00Z',
    status: 'pending'
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [bids, setBids] = useState<Bid[]>(initialBids);
  const { toast } = useToast();

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCrops = localStorage.getItem('farmMarketCrops');
    const storedBids = localStorage.getItem('farmMarketBids');
    
    if (storedCrops) setCrops(JSON.parse(storedCrops));
    if (storedBids) setBids(JSON.parse(storedBids));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('farmMarketCrops', JSON.stringify(crops));
    localStorage.setItem('farmMarketBids', JSON.stringify(bids));
  }, [crops, bids]);

  const addCrop = (cropData: Omit<Crop, 'id' | 'createdAt'>) => {
    const newCrop: Crop = {
      ...cropData,
      id: `crop-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setCrops([...crops, newCrop]);
    toast({
      title: "Crop added",
      description: `Your ${cropData.type} crop has been listed successfully.`,
    });
  };

  const updateCrop = (id: string, updates: Partial<Crop>) => {
    setCrops(crops.map(crop => 
      crop.id === id ? { ...crop, ...updates } : crop
    ));
    
    toast({
      title: "Crop updated",
      description: "Your crop listing has been updated successfully.",
    });
  };

  const deleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
    
    // Also remove any bids for this crop
    setBids(bids.filter(bid => bid.cropId !== id));
    
    toast({
      title: "Crop deleted",
      description: "Your crop listing has been removed.",
    });
  };

  const placeBid = (cropId: string, retailerId: string, retailerName: string, amount: number) => {
    const crop = crops.find(c => c.id === cropId);
    
    if (!crop) {
      toast({
        variant: "destructive",
        title: "Bid failed",
        description: "This crop listing no longer exists.",
      });
      return;
    }

    const highestBid = getHighestBidForCrop(cropId);
    
    if (highestBid && amount <= highestBid.amount) {
      toast({
        variant: "destructive",
        title: "Bid too low",
        description: `Your bid must be higher than the current highest bid of $${highestBid.amount.toFixed(2)}.`,
      });
      return;
    }

    if (amount <= crop.basePrice) {
      toast({
        variant: "destructive",
        title: "Bid too low",
        description: `Your bid must be higher than the base price of $${crop.basePrice.toFixed(2)}.`,
      });
      return;
    }

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      cropId,
      retailerId,
      retailerName,
      amount,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    setBids([...bids, newBid]);
    
    toast({
      title: "Bid placed",
      description: `Your bid of $${amount.toFixed(2)} has been placed successfully.`,
    });
  };

  const updateBidStatus = (bidId: string, status: Bid['status']) => {
    setBids(bids.map(bid => 
      bid.id === bidId ? { ...bid, status } : bid
    ));
    
    if (status === 'accepted') {
      toast({
        title: "Bid accepted",
        description: "The farmer has accepted your bid.",
      });
    } else if (status === 'rejected') {
      toast({
        title: "Bid rejected",
        description: "The farmer has rejected your bid.",
      });
    } else if (status === 'won') {
      toast({
        title: "Auction won",
        description: "Congratulations! You've won the auction.",
      });
    }
  };

  const getCropsByFarmer = (farmerId: string) => {
    return crops.filter(crop => crop.farmerId === farmerId);
  };

  const getBidsByRetailer = (retailerId: string) => {
    return bids.filter(bid => bid.retailerId === retailerId);
  };

  const getBidsForCrop = (cropId: string) => {
    return bids.filter(bid => bid.cropId === cropId);
  };

  const getCropById = (id: string) => {
    return crops.find(crop => crop.id === id);
  };

  const getHighestBidForCrop = (cropId: string) => {
    const cropBids = getBidsForCrop(cropId);
    if (cropBids.length === 0) return undefined;
    
    return cropBids.reduce((prev, current) => 
      current.amount > prev.amount ? current : prev
    );
  };

  return (
    <DataContext.Provider value={{
      crops,
      bids,
      addCrop,
      updateCrop,
      deleteCrop,
      placeBid,
      updateBidStatus,
      getCropsByFarmer,
      getBidsByRetailer,
      getBidsForCrop,
      getCropById,
      getHighestBidForCrop
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
