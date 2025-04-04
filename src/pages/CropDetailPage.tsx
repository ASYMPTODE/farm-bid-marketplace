
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Bid, useData } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CropDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCropById, getBidsForCrop, getHighestBidForCrop, placeBid } = useData();
  const { user, isAuthenticated } = useAuth();
  
  const [bidAmount, setBidAmount] = useState<string>('');
  
  if (!id) {
    return <div>Invalid crop ID</div>;
  }
  
  const crop = getCropById(id);
  
  if (!crop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Crop Not Found</h1>
        <p className="mb-6">The crop you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate('/marketplace')}>
          Return to Marketplace
        </Button>
      </div>
    );
  }
  
  const bids = getBidsForCrop(id);
  const highestBid = getHighestBidForCrop(id);
  
  const isOwner = user?.id === crop.farmerId;
  const isRetailer = user?.role === 'retailer';
  const isFarmer = user?.role === 'farmer';
  
  const auctionEndDate = new Date(crop.auctionEndDate);
  const isAuctionEnded = auctionEndDate < new Date();
  
  const handleBidSubmit = () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in or register to place a bid.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!isRetailer) {
      toast({
        title: "Retailer account required",
        description: "Only retailers can place bids on crops.",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(bidAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid bid amount",
        description: "Please enter a valid bid amount.",
        variant: "destructive"
      });
      return;
    }
    
    placeBid(crop.id, user.id, user.name, amount);
    setBidAmount('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Crop Image */}
        <div className="md:col-span-1">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            {crop.imageUrl ? (
              <img 
                src={crop.imageUrl} 
                alt={crop.type}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-farm-100 flex items-center justify-center">
                <span className="text-farm-600">No image available</span>
              </div>
            )}
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              {crop.organic && (
                <Badge className="bg-farm-600">Organic</Badge>
              )}
              <Badge variant="outline">
                Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-500">
              Listed {formatDistanceToNow(new Date(crop.createdAt), { addSuffix: true })}
            </p>
            
            <p className={`text-sm font-medium ${isAuctionEnded ? "text-red-500" : "text-green-600"}`}>
              {isAuctionEnded
                ? "Auction ended"
                : `Auction ends ${formatDistanceToNow(auctionEndDate, { addSuffix: true })}`}
            </p>
          </div>
        </div>
        
        {/* Crop Details */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{crop.type}</h1>
              <p className="text-xl text-gray-700">
                {crop.quantity} {crop.unit} • {crop.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                ${crop.basePrice.toFixed(2)}
              </div>
              <p className="text-sm text-gray-500">Base price</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{crop.description}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Seller Information</h2>
            <div className="bg-farm-50 rounded-lg p-4">
              <p className="font-medium">{crop.farmerName}</p>
              <p className="text-gray-600">Location: {crop.location}</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Bidding Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Place a Bid</h2>
            
            {isAuctionEnded ? (
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-center font-medium">This auction has ended</p>
              </div>
            ) : isOwner ? (
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-center font-medium">You cannot bid on your own crop</p>
              </div>
            ) : isFarmer ? (
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <p className="text-center font-medium">Only retailers can place bids</p>
              </div>
            ) : (
              <div className="flex space-x-2 mb-4">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    type="number"
                    min={highestBid ? highestBid.amount + 0.01 : crop.basePrice + 0.01}
                    step="0.01"
                    placeholder={`Minimum bid: $${(highestBid ? highestBid.amount + 0.01 : crop.basePrice + 0.01).toFixed(2)}`}
                    className="pl-7"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleBidSubmit}>
                  Place Bid
                </Button>
              </div>
            )}
            
            {highestBid && (
              <div className="bg-market-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-market-800">Current Highest Bid:</span>
                  <span className="font-bold text-market-800 text-lg">${highestBid.amount.toFixed(2)}</span>
                </div>
                <div className="mt-1 text-sm text-market-600">
                  by {highestBid.retailerName} • {formatDistanceToNow(new Date(highestBid.createdAt), { addSuffix: true })}
                </div>
              </div>
            )}
            
            {/* Bid History */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Bid History ({bids.length})</h3>
              {bids.length > 0 ? (
                <div className="space-y-2">
                  {[...bids]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((bid: Bid) => (
                      <Card key={bid.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{bid.retailerName}</p>
                              <p className="text-sm text-gray-500">
                                {formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}
                              </p>
                            </div>
                            <div className="text-lg font-semibold">${bid.amount.toFixed(2)}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No bids yet. Be the first to bid!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailPage;
