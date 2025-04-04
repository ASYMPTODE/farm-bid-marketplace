
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CropCard from '@/components/CropCard';
import { useData } from '@/contexts/DataContext';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { crops } = useData();
  
  // Get the three most recent crops for the featured section
  const recentCrops = [...crops]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-farm-600 to-farm-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connecting Farmers & Retailers Through Fair Auctions
              </h1>
              <p className="text-xl mb-8">
                FarmBid provides a transparent marketplace where farmers can sell their crops directly to retailers through a competitive bidding process.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-farm-700 hover:bg-farm-50">
                    Get Started
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-farm-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
                alt="Farmer in field" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy for farmers to sell their crops and for retailers to purchase them directly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Farmers List Crops</h3>
              <p className="text-gray-600">
                Farmers create listings for their available crops, including details like quantity, quality, and minimum price.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Retailers Place Bids</h3>
              <p className="text-gray-600">
                Retailers browse available listings and place competitive bids on crops they want to purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-farm-100 rounded-full flex items-center justify-center text-farm-700 font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Once a bid is accepted, our platform facilitates secure payment and delivery arrangements.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/how-it-works">
              <Button className="gap-2">
                Learn More <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Listings</h2>
            <Link to="/marketplace" className="text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentCrops.map(crop => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-farm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-farm-200 flex items-center justify-center text-farm-800 font-bold">JD</div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Deere</h4>
                  <p className="text-sm text-gray-500">Wheat Farmer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "FarmBid has revolutionized how I sell my crops. I'm getting better prices than before, and the platform is incredibly easy to use."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-market-200 flex items-center justify-center text-market-800 font-bold">MR</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Maria Rodriguez</h4>
                  <p className="text-sm text-gray-500">Local Grocery Chain</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a retailer, I appreciate the direct access to farmers and the quality of the produce. The bidding system ensures fair pricing for everyone."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-market-600 to-market-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of farmers and retailers to start buying and selling crops in a more efficient way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-market-700 hover:bg-market-50">
                Create an Account
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-market-700">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
