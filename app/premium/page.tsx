// app/premium/page.jsx
"use client";

import { useState } from 'react';
import PlanCard from '../components/PlanCard'; // Import the component from step 4
import { FiCheck, FiZap, FiUsers, FiStar, FiAward } from 'react-icons/fi';

export default function PremiumPage() {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

  const planFeatures = {
    standard: ["Access to all standard commands", "Basic AI image generation (10/day)", "Server economy features", "Standard support"],
    pro: ["Everything in Standard", "Unlimited AI image generation", "Priority command processing", "Custom command prefixes", "Advanced server analytics", "Priority support"],
    enterprise: ["Everything in Pro", "Fully customized bot instance", "Dedicated support manager", "Feature request priority", "White-label options (no branding)"],
  };

  const plans = [
    {
      tier: 'Standard',
      icon: <FiZap />,
      price: { monthly: 4.99, yearly: 49.99 },
      description: 'Essential tools for growing communities.',
      features: planFeatures.standard,
      cta: 'Get Started',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      popular: false,
    },
    {
      tier: 'Pro',
      icon: <FiStar />,
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Advanced features for power users & large servers.',
      features: planFeatures.pro,
      cta: 'Go Premium',
      gradient: 'from-orange-500/20 to-purple-500/20',
      borderColor: 'border-orange-500/40',
      popular: true, // Highlights this plan
    },
    {
      tier: 'Enterprise',
      icon: <FiAward />,
      price: { monthly: 24.99, yearly: 249.99 },
      description: 'Fully customized solutions for maximum scale.',
      features: planFeatures.enterprise,
      cta: 'Contact Sales',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6" style={{ background: '#F8B96F', color: '#3a2a13' }}>
      <div className="max-w-7xl mx-auto" style={{ color: '#3a2a13' }}>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#3a2a13' }}>
            Unlock <span style={{ color: '#b86b00' }}>BunBun Premium</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-10" style={{ color: '#7a4a00' }}>
            Upgrade your experience with powerful features, priority support, and exclusive tools designed for the most demanding servers.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl" style={{ background: '#F8B96F33', border: '1px solid #F8B96F55' }}>
            <button 
              onClick={() => setBillingPeriod('monthly')}
              className={`px-8 py-3 rounded-xl font-medium transition-all`}
              style={billingPeriod === 'monthly' ? { background: '#F8B96F', color: '#3a2a13' } : {}}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod('yearly')}
              className={`px-8 py-3 rounded-xl font-medium transition-all`}
              style={billingPeriod === 'yearly' ? { background: '#F8B96F', color: '#3a2a13' } : {}}
            >
              Yearly <span className="text-sm text-green-400 ml-2">(Save 16%)</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard 
              key={index} 
              plan={plan} 
              billingPeriod={billingPeriod} 
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-32">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#3a2a13' }}>Detailed Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid #F8B96F88' }}>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #F8B96F55' }}>
                  <th className="text-left p-6 font-semibold" style={{ color: '#3a2a13' }}>Feature</th>
                  <th className="text-center p-6 font-semibold" style={{ color: '#3a2a13' }}>Standard</th>
                  <th className="text-center p-6 font-semibold" style={{ background: '#F8B96F33', color: '#3a2a13' }}>Pro</th>
                  <th className="text-center p-6 font-semibold" style={{ color: '#3a2a13' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F8B96F33' }}>
                  <td className="p-6">Custom Bot Prefix</td>
                  <td className="text-center p-6" style={{ color: '#b86b00' }}></td>
                  <td className="text-center p-6" style={{ background: '#F8B96F22', color: '#3a2a13' }}></td>
                  <td className="text-center p-6" style={{ color: '#3a2a13' }}></td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32">
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: '#3a2a13' }}>Premium FAQs</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl" style={{ border: '1px solid #F8B96F88', background: '#F8B96F22', color: '#3a2a13' }}>
              <h4 className="font-bold mb-2">Can I switch plans later?</h4>
              <p className="text-sm" style={{ color: '#7a4a00' }}>Yes, you can upgrade or downgrade at any time. Prorated credits are applied when upgrading.</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ border: '1px solid #F8B96F88', background: '#F8B96F22', color: '#3a2a13' }}>
              <h4 className="font-bold mb-2">Is there a free trial?</h4>
              <p className="text-sm" style={{ color: '#7a4a00' }}>We offer a 7-day free trial for the Pro plan to test all advanced features.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}