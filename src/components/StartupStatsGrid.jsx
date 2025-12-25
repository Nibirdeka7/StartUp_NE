'use client';
import { useMemo, useState } from 'react';
import { utils } from 'swapy';
import { SwapyItem, SwapyLayout, SwapySlot } from '../../components/uilayouts/swapy';
import { Users, TrendingUp, Award, Clock, CheckCircle, Rocket, Target, BarChart3, Globe } from 'lucide-react';

// Stats Cards with your red-700 theme
export function RegisteredStartupsCard() {
  return (
    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Users className="text-red-100" size={32} />
        <h2 className="text-white text-5xl font-bold">500+</h2>
      </div>
      <p className="text-red-100 text-lg font-semibold">Startups Registered</p>
      <p className="text-red-200/80 text-sm mt-1">Across Northeast India</p>
    </div>
  );
}

export function FundingRaisedCard() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl h-full p-6 flex flex-col justify-center shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="text-red-700" size={24} />
        <p className="text-red-700 font-semibold">Total Funding Raised</p>
      </div>
      <h2 className="text-red-700 text-5xl font-bold leading-none">₹50Cr+</h2>
      <p className="text-green-600 font-medium mt-2 flex items-center gap-1">
        <TrendingUp size={16} /> +25% YoY Growth
      </p>
    </div>
  );
}

export function SuccessRateCard() {
  return (
    <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl h-full p-6 flex flex-col justify-between relative overflow-hidden shadow-lg">
      <div className="bg-red-500/20 text-white font-medium px-4 py-2 rounded-xl inline-block mb-4 max-w-fit backdrop-blur-sm">
        <CheckCircle className="inline mr-2" size={18} />
        98% Success Rate
      </div>
      <div>
        <p className="font-semibold text-red-100 mb-2">Startup Approval</p>
        <div className="flex items-end gap-2">
          <span className="text-6xl font-bold text-white">98%</span>
          <span className="text-green-300 font-medium mb-1">+2%</span>
        </div>
      </div>
    </div>
  );
}

export function ServicesCard() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl h-full p-6 relative overflow-hidden shadow-lg">
      <div className="text-red-900 mb-4">
        <p className="text-2xl font-bold">25+ Services</p>
        <p className="text-lg font-medium">For Your Startup Journey</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-red-100 p-3 flex flex-col items-center justify-center">
          <Rocket className="text-red-700 mb-2" size={20} />
          <span className="text-sm font-medium text-red-800">Registration</span>
        </div>
        <div className="rounded-xl bg-red-100 p-3 flex flex-col items-center justify-center">
          <Target className="text-red-700 mb-2" size={20} />
          <span className="text-sm font-medium text-red-800">Marketing</span>
        </div>
        <div className="rounded-xl bg-red-100 p-3 flex flex-col items-center justify-center">
          <BarChart3 className="text-red-700 mb-2" size={20} />
          <span className="text-sm font-medium text-red-800">Funding</span>
        </div>
        <div className="rounded-xl bg-red-100 p-3 flex flex-col items-center justify-center">
          <Globe className="text-red-700 mb-2" size={20} />
          <span className="text-sm font-medium text-red-800">Development</span>
        </div>
      </div>
    </div>
  );
}

export function AwardsCard() {
  return (
    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-lg">
      <div className="w-20 h-20 mb-4 flex items-center justify-center">
        <Award className="text-yellow-300" size={64} />
      </div>
      <h2 className="text-2xl font-bold text-white text-center">
        Award-Winning Support
      </h2>
      <p className="text-red-100 text-sm mt-2">Best Startup Ecosystem 2024</p>
    </div>
  );
}

export function ProcessingTimeCard() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl h-full p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="text-red-700" size={24} />
        <h3 className="text-xl font-bold text-red-800">Fast Processing</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-red-700">Company Registration</span>
          <span className="font-bold text-red-800">7-10 Days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-red-700">Trademark Filing</span>
          <span className="font-bold text-red-800">24 Hours</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-red-700">Funding Consultation</span>
          <span className="font-bold text-red-800">48 Hours</span>
        </div>
      </div>
    </div>
  );
}

export function StateCoverageCard() {
  return (
    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl h-full p-6 relative overflow-hidden shadow-lg">
      <div className="text-white">
        <p className="text-2xl font-bold mb-2">8 States</p>
        <p className="text-lg font-medium">Northeast Coverage</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-2 text-center">
          <span className="text-white text-sm">Assam</span>
        </div>
        <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-2 text-center">
          <span className="text-white text-sm">Manipur</span>
        </div>
        <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-2 text-center">
          <span className="text-white text-sm">Meghalaya</span>
        </div>
        <div className="bg-red-500/30 backdrop-blur-sm rounded-lg p-2 text-center">
          <span className="text-white text-sm">Nagaland</span>
        </div>
      </div>
    </div>
  );
}

export function MentorNetworkCard() {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl h-full p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-red-800">Expert Network</h3>
      
      <div className="space-y-4">
        <div className="bg-red-100 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-red-800">Industry Mentors</span>
            <span className="text-2xl font-bold text-red-700">100+</span>
          </div>
        </div>
        
        <div className="bg-red-100 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-red-800">Legal Experts</span>
            <span className="text-2xl font-bold text-red-700">50+</span>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export function GrowthMetricsCard() {
  return (
    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl h-full p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-white">Startup Growth</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-red-100 mb-1">
            <span>Revenue Growth</span>
            <span className="font-bold">2.5x</span>
          </div>
          <div className="h-2 bg-red-500/30 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-red-100 mb-1">
            <span>Job Creation</span>
            <span className="font-bold">10K+</span>
          </div>
          <div className="h-2 bg-red-500/30 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-red-100 mb-1">
            <span>Market Reach</span>
            <span className="font-bold">3x</span>
          </div>
          <div className="h-2 bg-red-500/30 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Initial items configuration
const initialItems = [
  {
    id: '1',
    title: 'Registered Startups',
    widgets: <RegisteredStartupsCard />,
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
  },
  {
    id: '2',
    title: 'Funding Raised',
    widgets: <FundingRaisedCard />,
    className: 'lg:col-span-3 sm:col-span-5 col-span-12',
  },
  {
    id: '3',
    title: 'Success Rate',
    widgets: <SuccessRateCard />,
    className: 'lg:col-span-5 sm:col-span-5 col-span-12',
  },
  {
    id: '4',
    title: 'Services Offered',
    widgets: <ServicesCard />,
    className: 'lg:col-span-5 sm:col-span-7 col-span-12',
  },
  {
    id: '5',
    title: 'Awards',
    widgets: <AwardsCard />,
    className: 'lg:col-span-4 sm:col-span-6 col-span-12',
  },
  {
    id: '6',
    title: 'Processing Time',
    widgets: <ProcessingTimeCard />,
    className: 'lg:col-span-3 sm:col-span-6 col-span-12',
  },
  {
    id: '7',
    title: 'State Coverage',
    widgets: <StateCoverageCard />,
    className: 'lg:col-span-4 sm:col-span-5 col-span-12',
  },
  {
    id: '8',
    title: 'Mentor Network',
    widgets: <MentorNetworkCard />,
    className: 'lg:col-span-4 sm:col-span-7 col-span-12',
  },
  {
    id: '9',
    title: 'Growth Metrics',
    widgets: <GrowthMetricsCard />,
    className: 'lg:col-span-4 sm:col-span-12 col-span-12',
  },
];

function StartupStatsGrid() {
  const [slotItemMap, setSlotItemMap] = useState(
    utils.initSlotItemMap(initialItems, 'id')
  );
  
  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, 'id', slotItemMap),
    [initialItems, slotItemMap]
  );
  
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-800 mb-4">
            Startup Northeast Impact
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Transforming ideas into successful businesses across Northeast India. 
            Drag and rearrange the cards to explore our impact metrics.
          </p>
        </div>
        
        {/* Swapy Grid */}
        <SwapyLayout
          id="startup-stats"
          className="w-full"
          config={{
            swapMode: 'hover',
          }}
          onSwap={(event) => {
            console.log('Grid rearranged!', event.newSlotItemMap.asArray);
          }}
        >
          <div className="grid w-full grid-cols-12 gap-4 md:gap-6">
            {slottedItems.map(({ slotId, itemId }) => {
              const item = initialItems.find((i) => i.id === itemId);
              return (
                <SwapySlot
                  key={slotId}
                  className={`swapyItem rounded-xl h-64 ${item?.className}`}
                  id={slotId}
                >
                  <SwapyItem
                    id={itemId}
                    className="relative rounded-xl w-full h-full transform transition-transform duration-200 hover:scale-[1.02]"
                    key={itemId}
                  >
                    {item?.widgets}
                  </SwapyItem>
                </SwapySlot>
              );
            })}
          </div>
        </SwapyLayout>
        
        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 Drag and drop cards to rearrange • Hover to swap positions
          </p>
        </div>
      </div>
    </div>
  );
}

export default StartupStatsGrid;