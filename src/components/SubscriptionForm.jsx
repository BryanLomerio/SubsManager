import React from 'react';

const SubscriptionForm = ({ formData, setFormData, currencies, addSubscription }) => {
  return (
    <form onSubmit={addSubscription} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Service Name"
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <select
        className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.currency}
        onChange={e => setFormData({ ...formData, currency: e.target.value })}
      >
        {currencies.map(currency => (
          <option key={currency.code} value={currency.code}>
            {currency.name} ({currency.symbol})
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder={`Amount (${currencies.find(c => c.code === formData.currency)?.symbol})`}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.amount}
        onChange={e => setFormData({ ...formData, amount: e.target.value })}
        step="0.01"
        required
      />

      <select
        className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.billingCycle}
        onChange={e => setFormData({ ...formData, billingCycle: e.target.value })}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="weekly">Weekly</option>
      </select>

      <input
        type="date"
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={formData.paymentDate}
        onChange={e => setFormData({ ...formData, paymentDate: e.target.value })}
        required
      />

      <textarea
        placeholder="Additional notes"
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none md:col-span-2"
        value={formData.notes}
        onChange={e => setFormData({ ...formData, notes: e.target.value })}
        rows="2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Add Subscription
      </button>
    </form>
  );
};

export default SubscriptionForm;
