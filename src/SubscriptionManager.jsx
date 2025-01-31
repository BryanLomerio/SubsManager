import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { TbMoneybag } from "react-icons/tb";

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
            setSubscriptions(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        console.log('Subscriptions saved to localStorage:', subscriptions); // Debugging log
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }, [subscriptions]);


    const formatCurrency = (amount, currencyCode) => {
        const currency = currencies.find(c => c.code === currencyCode) || currencies[0];

        const formattedAmount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);

        return `${currency.symbol}${formattedAmount}`;
    };


    const addSubscription = (e) => {
        e.preventDefault();
        const newSub = {
            ...formData,
            id: Date.now(),
            amount: parseFloat(formData.amount),
            paymentDate: new Date(formData.paymentDate)
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
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    };

    const getUpcomingSubscriptions = () => {
        return [...subscriptions].sort((a, b) => {
            if (sortBy === 'deadline') return a.paymentDate - b.paymentDate;
            if (sortBy === 'amount') return b.amount - a.amount;
            return a.name.localeCompare(b.name);
        });
    };

    const chartData = {
        labels: subscriptions.map(sub => sub.name),
        datasets: [{
            label: 'Subscription Costs',
            data: subscriptions.map(sub => sub.amount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    subsManager
                </span>
                <TbMoneybag style={{ marginLeft: '10px', verticalAlign: 'middle' }} />
            </h1>

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

            <div className="space-y-4 mb-8">
                {getUpcomingSubscriptions().map(sub => (
                    <div key={sub.id} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
                            <p className="text-gray-600">
                                <span className="font-medium">Amount:</span>
                                {formatCurrency(sub.amount, sub.currency)} ({sub.billingCycle})
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Next Payment:</span>
                                {sub.paymentDate.toLocaleDateString()}
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

            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Subscription Cost Breakdown</h2>
                <div className="h-96">
                    <Bar
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            const sub = subscriptions[context.dataIndex];
                                            return `${sub.name}: ${formatCurrency(sub.amount, sub.currency)}`;
                                        }
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const isPaymentDue = (paymentDate) => {
    const dueDate = new Date(paymentDate);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
};

export default SubscriptionManager;