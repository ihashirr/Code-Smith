"use client"
import { CheckIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion';
import Link from 'next/link';

const cardData = [
  {
    title: 'Software Purchase',
    description: 'Purchase our software package and own it forever. Get full access to all features with a one-time payment.',
    price: '999 DHS',
    oldPrice: '1999 DHS',
    features: ['Lifetime access to software', 'Full feature set included'],
    backgroundColor: '#BAD6DE',
    textColor: 'text-gray-900',
    buttonColor: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-500',
  },
  {
    title: 'Monthly Subscription',
    description: 'Subscribe to our monthly package and get continuous access to the software with free maintenance updates.',
    price: '199 DHS / month',
    oldPrice: '249 DHS / month',
    features: ['Monthly subscription', 'Free maintenance updates', 'Cancel anytime'],
    backgroundColor: '#FED7B0',
    textColor: 'text-gray-800',
    buttonColor: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-400',
  },
];

export default function Example() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <motion.h2
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1, ease: [0.48, 0.15, 0.25, 0.96] },
                color: 'hotPink',
              }}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              whileHover={{
                scaleX: 1.05,
                transition: { duration: 0.1, ease: [0.48, 0.15, 0.25, 0.96] },
                color: 'hotPink',
              }}
              className="mt-3 sm:mt-4 text-base sm:text-lg leading-6 text-white"
            >
              We offer two plans tailored to your needs.
            </motion.p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {cardData.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1, ease: [0.48, 0.15, 0.25, 0.96] },
                  backgroundColor: card.backgroundColor,
                }}
                className="rounded-lg bg-gray-50 py-4 sm:py-6 text-center ring-1 ring-inset ring-gray-900/5"
              >
                <div className="mx-auto max-w-xs px-4 sm:px-6">
                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${card.textColor}`}>{card.title}</h3>
                  <p className={`mt-2 sm:mt-3 text-sm sm:text-base leading-6 ${card.textColor}`}>{card.description}</p>
                  <div className="mt-3 flex items-center justify-center sm:justify-start gap-x-2">
                    <h4 className="flex-none text-xs font-semibold leading-6 text-indigo-600">What’s included</h4>
                    <div className="h-px flex-auto bg-gray-100" />
                  </div>
                  <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-1 text-xs sm:text-sm leading-5 text-gray-600"
                  >
                    {card.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-x-2">
                        <CheckIcon className="h-3 w-3 flex-none text-indigo-600" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 flex items-baseline justify-center gap-x-1">
                    <span className="text-sm sm:text-base font-bold tracking-tight text-gray-900">{card.price}</span>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-red-500 line-through ml-2">{card.oldPrice}</span>
                  </p>
                  <Link
                    href="/login"
                    className={`mt-4 block w-full rounded-md ${card.buttonColor} px-3 py-1.5 sm:py-2 text-center text-xs sm:text-sm font-semibold text-white shadow-sm ${card.hoverColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    Get started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
