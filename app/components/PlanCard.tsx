"use client";
import type { ReactNode } from 'react';
import { FiCheck } from 'react-icons/fi';

type BillingPeriod = 'monthly' | 'yearly';

type Plan = {
  price: Record<BillingPeriod, number | string>;
  borderColor?: string;
  popular?: boolean;
  icon?: ReactNode;
  tier: string;
  description?: string;
  features: string[];
  cta: string;
};

export default function PlanCard({ plan, billingPeriod }: { plan: Plan; billingPeriod: BillingPeriod }) {
  const price = plan.price[billingPeriod];
  const isYearly = billingPeriod === 'yearly';
  return (
    <div className={`relative p-8 rounded-3xl border-2 ${plan.borderColor} bg-linear-to-b from-black/80 to-black/50 ${plan.popular ? 'ring-2 ring-orange-500/30' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-6 py-1.5 rounded-full bg-linear-to-r from-orange-500 to-yellow-500 text-sm font-bold">
          MOST POPULAR
        </div>
      )}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-linear-to-br from-white/10 to-transparent">
          {plan.icon}
        </div>
        <h3 className="text-2xl font-bold">{plan.tier}</h3>
      </div>
      <p className="text-zinc-400 mb-8">{plan.description}</p>
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-zinc-400 ml-2">/{isYearly ? 'year' : 'month'}</span>
        </div>
        {isYearly && <p className="text-sm text-green-400 mt-2">Billed annually, save over monthly</p>}
      </div>
      <ul className="space-y-4 mb-10">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <FiCheck className="text-green-500 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular 
        ? 'bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-2xl hover:shadow-orange-500/30' 
        : 'bg-white/10 border border-white/20 hover:bg-white/20'
      } hover:scale-[1.02]`}>
        {plan.cta}
      </button>
    </div>
  );
}