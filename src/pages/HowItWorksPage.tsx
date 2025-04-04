
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How FarmBid Works</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform connects farmers directly with retailers through a transparent and efficient bidding process.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-2xl mx-auto mb-4">1</div>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Choose your role and get started</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Sign up as either a farmer or a retailer. Farmers list their crops for auction, while retailers browse and bid on available listings.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/register">
              <Button>Register Now</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-2xl mx-auto mb-4">2</div>
            <CardTitle>Farmers List Crops</CardTitle>
            <CardDescription>Set your price and details</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Farmers create detailed listings for their available crops, including quantity, quality, harvest date, and minimum price.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/dashboard">
              <Button variant="outline">Farmer Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-2xl mx-auto mb-4">3</div>
            <CardTitle>Retailers Place Bids</CardTitle>
            <CardDescription>Competitive and transparent</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Retailers browse available crop listings and place competitive bids. The bidding process ensures fair market value for both parties.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/marketplace">
              <Button variant="outline">Browse Marketplace</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">For Farmers</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-farm-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-farm-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Easy Listing Creation</h3>
                <p className="text-gray-600">
                  Our simple form makes it easy to create detailed crop listings with all the information retailers need.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-farm-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-farm-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Bid Management</h3>
                <p className="text-gray-600">
                  Review incoming bids and accept or reject them based on your preferences. No obligation to accept any bid.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-farm-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-farm-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Secure Payments</h3>
                <p className="text-gray-600">
                  Once a bid is accepted, our secure payment system ensures you get paid promptly and reliably.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-farm-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-farm-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Market Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into current market trends and pricing to help you make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">For Retailers</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-market-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-market-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Wide Selection</h3>
                <p className="text-gray-600">
                  Browse a diverse range of crops from farms across different regions, all in one place.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-market-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-market-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Direct from Farmers</h3>
                <p className="text-gray-600">
                  Cut out middlemen and deal directly with farmers for better pricing and fresher produce.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-market-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-market-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Competitive Bidding</h3>
                <p className="text-gray-600">
                  Set your own price through our bidding system, ensuring you never pay more than you're comfortable with.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-market-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-market-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Quality Assurance</h3>
                <p className="text-gray-600">
                  Detailed crop listings include information about quality, farming practices, and harvest dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-farm-600 to-farm-800 text-white rounded-lg p-8 mb-16">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Is there a fee to use FarmBid?</h3>
                <p className="text-farm-100">
                  Basic accounts are free. We charge a small commission only on successful transactions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">How is quality guaranteed?</h3>
                <p className="text-farm-100">
                  Farmers must provide detailed information about their crops. Retailers can also rate farmers after transactions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">What happens if a transaction falls through?</h3>
                <p className="text-farm-100">
                  Our dispute resolution system helps mediate any issues that arise between farmers and retailers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0 md:w-1/3 md:flex md:flex-col md:items-center md:justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full bg-white text-farm-700 hover:bg-farm-50">
                Get Started Today
              </Button>
            </Link>
            <p className="mt-4 text-center text-farm-100">
              Join thousands of farmers and retailers already using FarmBid
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8">Our Process</h2>
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-farm-100"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-farm-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">1</div>
              <div className="mt-4 text-center max-w-xs">
                <h3 className="font-semibold mb-1">Registration</h3>
                <p className="text-sm text-gray-600">Create an account as a farmer or retailer</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-farm-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">2</div>
              <div className="mt-4 text-center max-w-xs">
                <h3 className="font-semibold mb-1">List or Browse</h3>
                <p className="text-sm text-gray-600">Farmers list crops, retailers browse listings</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-farm-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">3</div>
              <div className="mt-4 text-center max-w-xs">
                <h3 className="font-semibold mb-1">Bidding</h3>
                <p className="text-sm text-gray-600">Retailers place competitive bids on crops</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-farm-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">4</div>
              <div className="mt-4 text-center max-w-xs">
                <h3 className="font-semibold mb-1">Transaction</h3>
                <p className="text-sm text-gray-600">Secure payment and delivery arrangements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
