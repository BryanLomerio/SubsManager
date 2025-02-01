import React from 'react';
import { isPaymentDue } from '../utils/isPaymentDue';
import { formatCurrency } from '../utils/formatCurrency';

const SubscriptionList = ({ subscriptions, sortBy, deleteSubscription, currencies }) => {

  const getUpcomingSubscriptions = () => {
    return [...subscriptions].sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.paymentDate) - new Date(b.paymentDate);
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.name.localeCompare(b.name);
    });
  };

  return (
    <div className="space-y-4 mb-8">
      {getUpcomingSubscriptions().map(sub => (
        <div key={sub.id} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
            <p className="text-gray-600">
              <span className="font-medium">Amount:</span> {formatCurrency(sub.amount, sub.currency, currencies)} ({sub.billingCycle})
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Next Payment:</span> {new Date(sub.paymentDate).toLocaleDateString()}
            </p>
            {sub.notes && (
              <p className="text-gray-500 text-sm">
                <span className="font-medium">Notes:</span> {sub.notes}
              </p>
            )}
            {isPaymentDue(sub.paymentDate) && (
              <div className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                Due Soon!
              </div>
            )}
          </div>
          <button
            onClick={() => deleteSubscription(sub.id)}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionList;
