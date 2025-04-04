
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Bid, Crop, useData } from '@/contexts/DataContext';
import CropCard from '@/components/CropCard';
import NewCropForm from '@/components/NewCropForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { getCropsByFarmer, bids, updateBidStatus } = useData();
  const [openNewCropDialog, setOpenNewCropDialog] = useState(false);
  
  if (!user || user.role !== 'farmer') {
    return null;
  }
  
  const myCrops = getCropsByFarmer(user.id);
  
  // Get all bids placed on my crops
  const myBids = bids.filter(bid => {
    const crop = myCrops.find(c => c.id === bid.cropId);
    return crop !== undefined;
  });
  
  // Group bids by crop for easier display
  const bidsByCrop = myBids.reduce((acc, bid) => {
    const cropId = bid.cropId;
    if (!acc[cropId]) {
      acc[cropId] = [];
    }
    acc[cropId].push(bid);
    return acc;
  }, {} as Record<string, Bid[]>);
  
  const handleAcceptBid = (bidId: string) => {
    updateBidStatus(bidId, 'accepted');
  };
  
  const handleRejectBid = (bidId: string) => {
    updateBidStatus(bidId, 'rejected');
  };
  
  const activeCrops = myCrops.filter(crop => crop.listed);
  const inactiveCrops = myCrops.filter(crop => !crop.listed);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
        <Dialog open={openNewCropDialog} onOpenChange={setOpenNewCropDialog}>
          <DialogTrigger asChild>
            <Button>+ Add New Crop</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Crop Listing</DialogTitle>
            </DialogHeader>
            <NewCropForm onComplete={() => setOpenNewCropDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="crops">
        <TabsList className="mb-6">
          <TabsTrigger value="crops">My Crops</TabsTrigger>
          <TabsTrigger value="bids">Received Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crops">
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-4">Active Listings ({activeCrops.length})</h3>
              {activeCrops.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeCrops.map(crop => (
                    <CropCard key={crop.id} crop={crop} showBidButton={false} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No active crop listings</p>
                    <Button className="mt-4" onClick={() => setOpenNewCropDialog(true)}>
                      Add Your First Crop
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
            
            {inactiveCrops.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold mb-4">Inactive Listings ({inactiveCrops.length})</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inactiveCrops.map(crop => (
                    <CropCard key={crop.id} crop={crop} showBidButton={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="bids">
          {Object.keys(bidsByCrop).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(bidsByCrop).map(([cropId, cropBids]) => {
                const crop = myCrops.find(c => c.id === cropId);
                if (!crop) return null;
                
                return (
                  <Card key={cropId}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>{crop.type}</CardTitle>
                          <CardDescription>
                            {crop.quantity} {crop.unit} • Listed on {format(new Date(crop.createdAt), 'MMM d, yyyy')}
                          </CardDescription>
                        </div>
                        <Link to={`/crop/${crop.id}`}>
                          <Button variant="outline" size="sm">View Listing</Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-medium mb-2">Received Bids:</h4>
                      <div className="space-y-3">
                        {cropBids
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .map(bid => (
                            <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                              <div>
                                <div className="font-medium">{bid.retailerName}</div>
                                <div className="text-sm text-gray-500">
                                  ${bid.amount.toFixed(2)} • {format(new Date(bid.createdAt), 'MMM d, yyyy')}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                {bid.status === 'pending' ? (
                                  <>
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleAcceptBid(bid.id)}
                                    >
                                      Accept
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => handleRejectBid(bid.id)}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                ) : (
                                  <Badge className={
                                    bid.status === 'accepted' ? 'bg-green-500' : 
                                    bid.status === 'rejected' ? 'bg-red-500' : 
                                    'bg-gray-500'
                                  }>
                                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No bids received yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const RetailerDashboard = () => {
  const { user } = useAuth();
  const { getBidsByRetailer, getCropById } = useData();
  
  if (!user || user.role !== 'retailer') {
    return null;
  }
  
  const myBids = getBidsByRetailer(user.id);
  
  // Get unique crop IDs that the retailer has bid on
  const uniqueCropIds = [...new Set(myBids.map(bid => bid.cropId))];
  
  // Get crops that the retailer has bid on
  const biddedCrops = uniqueCropIds
    .map(cropId => {
      const crop = getCropById(cropId);
      // Get the highest bid by this retailer for this crop
      const highestBid = myBids
        .filter(bid => bid.cropId === cropId)
        .sort((a, b) => b.amount - a.amount)[0];
      
      return { crop, highestBid };
    })
    .filter(item => item.crop !== undefined) as { crop: Crop, highestBid: Bid }[];
  
  // Separate won bids and active bids
  const wonBids = biddedCrops.filter(item => item.highestBid.status === 'accepted');
  const activeBids = biddedCrops.filter(item => item.highestBid.status === 'pending');
  const rejectedBids = biddedCrops.filter(item => item.highestBid.status === 'rejected');
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Retailer Dashboard</h2>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Bids</TabsTrigger>
          <TabsTrigger value="won">Won Auctions</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeBids.length > 0 ? (
            <div className="space-y-6">
              {activeBids.map(({ crop, highestBid }) => (
                <Card key={crop.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 mr-4">
                        {crop.imageUrl ? (
                          <img 
                            src={crop.imageUrl} 
                            alt={crop.type} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-farm-100 flex items-center justify-center">
                            <span className="text-farm-600">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{crop.type}</h3>
                            <p className="text-sm text-gray-500">
                              {crop.quantity} {crop.unit} • {crop.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">Your Bid: ${highestBid.amount.toFixed(2)}</div>
                            <p className="text-xs text-gray-500">
                              Placed on {format(new Date(highestBid.createdAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <Badge variant="outline">Farmer: {crop.farmerName}</Badge>
                          </div>
                          <Link to={`/crop/${crop.id}`}>
                            <Button size="sm">View Auction</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No active bids</p>
                <Link to="/marketplace">
                  <Button className="mt-4">Browse Marketplace</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="won">
          {wonBids.length > 0 ? (
            <div className="space-y-6">
              {wonBids.map(({ crop, highestBid }) => (
                <Card key={crop.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 mr-4">
                        {crop.imageUrl ? (
                          <img 
                            src={crop.imageUrl} 
                            alt={crop.type} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-farm-100 flex items-center justify-center">
                            <span className="text-farm-600">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{crop.type}</h3>
                            <p className="text-sm text-gray-500">
                              {crop.quantity} {crop.unit} • {crop.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">
                              Winning Bid: ${highestBid.amount.toFixed(2)}
                            </div>
                            <Badge className="bg-green-500 mt-1">Accepted</Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <Badge variant="outline">Farmer: {crop.farmerName}</Badge>
                          </div>
                          <Button size="sm">Proceed to Payment</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No won auctions yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedBids.length > 0 ? (
            <div className="space-y-6">
              {rejectedBids.map(({ crop, highestBid }) => (
                <Card key={crop.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 mr-4">
                        {crop.imageUrl ? (
                          <img 
                            src={crop.imageUrl} 
                            alt={crop.type} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-farm-100 flex items-center justify-center">
                            <span className="text-farm-600">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{crop.type}</h3>
                            <p className="text-sm text-gray-500">
                              {crop.quantity} {crop.unit} • {crop.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-700">
                              Your Bid: ${highestBid.amount.toFixed(2)}
                            </div>
                            <Badge variant="destructive" className="mt-1">Rejected</Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <Badge variant="outline">Farmer: {crop.farmerName}</Badge>
                          </div>
                          <Link to={`/crop/${crop.id}`}>
                            <Button size="sm" variant="outline">View Auction</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No rejected bids</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-gray-600">
          {user?.role === 'farmer' 
            ? 'Manage your crop listings and review bids from retailers.'
            : 'Browse available crops and manage your bids.'
          }
        </p>
      </div>
      
      <Separator className="my-8" />
      
      {user?.role === 'farmer' ? <FarmerDashboard /> : <RetailerDashboard />}
    </div>
  );
};

export default DashboardPage;
