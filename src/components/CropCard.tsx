
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Crop, useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';

interface CropCardProps {
  crop: Crop;
  showBidButton?: boolean;
}

const CropCard: React.FC<CropCardProps> = ({ crop, showBidButton = true }) => {
  const { getHighestBidForCrop } = useData();
  const highestBid = getHighestBidForCrop(crop.id);

  // Format dates for display
  const listedDate = new Date(crop.createdAt);
  const timeAgo = formatDistanceToNow(listedDate, { addSuffix: true });
  
  const endDate = new Date(crop.auctionEndDate);
  const isAuctionEnded = endDate < new Date();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden">
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
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {crop.organic && (
            <Badge className="bg-farm-600">Organic</Badge>
          )}
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{crop.type}</h3>
            <p className="text-sm text-gray-500">
              {crop.quantity} {crop.unit} • {crop.location}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ${crop.basePrice.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Base price</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-700 line-clamp-2">{crop.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Farmer: {crop.farmerName}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
          </Badge>
        </div>
        {highestBid && (
          <div className="mt-3 p-2 bg-market-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-market-800">Current Highest Bid:</span>
              <span className="font-semibold text-market-800">${highestBid.amount.toFixed(2)}</span>
            </div>
          </div>
        )}
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>Listed {timeAgo}</span>
          <span className={isAuctionEnded ? "text-red-500" : "text-green-600"}>
            {isAuctionEnded ? "Auction ended" : `Ends ${formatDistanceToNow(endDate, { addSuffix: true })}`}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between">
          <Link to={`/crop/${crop.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
          {showBidButton && !isAuctionEnded && (
            <Link to={`/crop/${crop.id}`}>
              <Button size="sm">Place Bid</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CropCard;
