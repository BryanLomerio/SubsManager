import React, { useState, useEffect } from 'react';
import { TbMoneybag } from "react-icons/tb";
import SubscriptionForm from './SubscriptionForm';
import SubscriptionList from './SubscriptionList';
import SubscriptionChart from './SubscriptionChart';

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [sortBy, setSortBy] = useState('deadline');
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
    billingCycle: 'monthly',
    paymentDate: '',
    notes: ''
  });

  const [showChart, setShowChart] = useState(false);  // State for toggling the chart visibility

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('subscriptions');
    if (saved) {
      console.log('Loaded subscriptions from localStorage:', JSON.parse(saved));
      setSubscriptions(JSON.parse(saved));
    } else {
      setSubscriptions([]);
    }
  }, []);

  useEffect(() => {
    console.log('Subscriptions saved to localStorage:', subscriptions);
    if (subscriptions.length > 0) {
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  const addSubscription = (e) => {
    e.preventDefault();
    console.log('Form Data Before Adding:', formData);

    if (!formData.name || !formData.amount || !formData.paymentDate) {
      console.log('Form is incomplete, cannot add subscription.');
      return;
    }

    const newSub = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      paymentDate: formData.paymentDate
    };

    setSubscriptions([...subscriptions, newSub]);
    setFormData({
      name: '',
      amount: '',
      currency: 'USD',
      billingCycle: 'monthly',
      paymentDate: '',
      notes: ''
    });
  };

  const deleteSubscription = (id) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="">subsManager</span>
        <TbMoneybag style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
      </h1>

      <SubscriptionForm
        formData={formData}
        setFormData={setFormData}
        currencies={currencies}
        addSubscription={addSubscription}
      />

      <div className="mb-6 flex justify-end">
        <select
          onChange={e => setSortBy(e.target.value)}
          className="p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none w-48"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="amount">Sort by Amount</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      <SubscriptionList
        subscriptions={subscriptions}
        sortBy={sortBy}
        deleteSubscription={deleteSubscription}
        currencies={currencies}
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowChart(!showChart)} 
          className="p-2 bg-[#2A2A2A] text-white rounded-md"
        >
          {showChart ? 'Hide Graph' : 'Show Graph'} 
        </button>
      </div>

      {showChart && (
        <SubscriptionChart
          subscriptions={subscriptions}
          currencies={currencies}
        />
      )}
    </div>
  );
};

export default SubscriptionManager;
