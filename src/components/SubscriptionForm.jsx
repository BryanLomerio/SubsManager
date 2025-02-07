import React from 'react';

const SubscriptionForm = ({ formData, setFormData, currencies, addSubscription }) => {
  return (
    <form
      onSubmit={addSubscription}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white border border-gray-200 rounded-lg"
    >
      <input
        type="text"
        placeholder="Service Name"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <select
        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        placeholder={`Amount (${currencies.find(c => c.code === formData.currency)?.symbol || ''})`}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.amount}
        onChange={e => setFormData({ ...formData, amount: e.target.value })}
        step="0.01"
        required
      />

      <select
        className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.billingCycle}
        onChange={e => setFormData({ ...formData, billingCycle: e.target.value })}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
        <option value="weekly">Weekly</option>
      </select>

      <input
        type="date"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={formData.paymentDate}
        onChange={e => setFormData({ ...formData, paymentDate: e.target.value })}
        required
      />

      <textarea
        placeholder="Additional notes"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none md:col-span-2"
        value={formData.notes}
        onChange={e => setFormData({ ...formData, notes: e.target.value })}
        rows="2"
      />

      <button
        type="submit"
        className="bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium md:col-span-3"
      >
        Add Subscription
      </button>
    </form>
  );
};

export default SubscriptionForm;
