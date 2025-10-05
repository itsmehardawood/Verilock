// 'use client';
// import React, { useState } from 'react';
// import { CreditCard, Download, Receipt, Plus, Check, AlertCircle, Calendar, DollarSign, TrendingUp, Package } from 'lucide-react';

// const Billing = () => {
//   const [selectedPlan, setSelectedPlan] = useState('pro');
//   const [showAddCredits, setShowAddCredits] = useState(false);
//   const [creditAmount, setCreditAmount] = useState('100');

//   const plans = [
//     {
//       id: 'basic',
//       name: 'Basic',
//       price: 29,
//       credits: 100,
//       features: [
//         '100 scans per month',
//         'Basic detection algorithm',
//         'Email support',
//         '7-day report history',
//         'Standard accuracy'
//       ]
//     },
//     {
//       id: 'pro',
//       name: 'Professional',
//       price: 79,
//       credits: 300,
//       popular: true,
//       features: [
//         '300 scans per month',
//         'Advanced AI detection',
//         'Priority support',
//         '30-day report history',
//         'High accuracy (95%+)',
//         'Multi-platform scanning'
//       ]
//     },
//     {
//       id: 'enterprise',
//       name: 'Enterprise',
//       price: 199,
//       credits: 1000,
//       features: [
//         'Unlimited scans',
//         'Enterprise AI model',
//         '24/7 dedicated support',
//         'Unlimited report history',
//         'Highest accuracy (98%+)',
//         'API access',
//         'Custom integrations',
//         'Team collaboration'
//       ]
//     }
//   ];

//   const transactions = [
//     {
//       id: 'INV-2024-089',
//       type: 'subscription',
//       description: 'Professional Plan - Monthly',
//       amount: 79.00,
//       date: '2024-09-01',
//       status: 'paid',
//       credits: 300
//     },
//     {
//       id: 'INV-2024-078',
//       type: 'credits',
//       description: 'Additional Credits Purchase',
//       amount: 25.00,
//       date: '2024-08-15',
//       status: 'paid',
//       credits: 100
//     },
//     {
//       id: 'INV-2024-067',
//       type: 'subscription',
//       description: 'Professional Plan - Monthly',
//       amount: 79.00,
//       date: '2024-08-01',
//       status: 'paid',
//       credits: 300
//     },
//     {
//       id: 'INV-2024-056',
//       type: 'subscription',
//       description: 'Professional Plan - Monthly',
//       amount: 79.00,
//       date: '2024-07-01',
//       status: 'paid',
//       credits: 300
//     },
//     {
//       id: 'INV-2024-045',
//       type: 'credits',
//       description: 'Additional Credits Purchase',
//       amount: 50.00,
//       date: '2024-06-20',
//       status: 'paid',
//       credits: 200
//     }
//   ];

//   const paymentMethods = [
//     {
//       id: 1,
//       type: 'Visa',
//       last4: '4242',
//       expiry: '12/25',
//       isDefault: true
//     },
//     {
//       id: 2,
//       type: 'Mastercard',
//       last4: '8888',
//       expiry: '09/26',
//       isDefault: false
//     }
//   ];

//   const creditPackages = [
//     { credits: 50, price: 15, bonus: 0 },
//     { credits: 100, price: 25, bonus: 10 },
//     { credits: 250, price: 60, bonus: 30 },
//     { credits: 500, price: 100, bonus: 75 }
//   ];

//   const getStatusBadge = (status) => {
//     const styles = {
//       paid: 'bg-green-100 text-green-800',
//       pending: 'bg-yellow-100 text-yellow-800',
//       failed: 'bg-red-100 text-red-800'
//     };
//     return styles[status] || styles.pending;
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Billing & Subscription</h1>
//         <p className="text-gray-600 mt-1">Manage your subscription, credits, and payment methods</p>
//       </div>

//       {/* Current Plan Overview */}
//       {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
//           <div className="flex items-start justify-between mb-4">
//             <div>
//               <p className="text-blue-100 text-sm">Current Plan</p>
//               <h2 className="text-3xl font-bold mt-1">Professional</h2>
//             </div>
//             <div className="bg-blue-500 bg-opacity-50 rounded-lg px-3 py-1">
//               <span className="text-sm font-semibold">Active</span>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 gap-6 mb-6">
//             <div>
//               <p className="text-blue-100 text-sm">Monthly Cost</p>
//               <p className="text-2xl font-bold mt-1">$79.00</p>
//             </div>
//             <div>
//               <p className="text-blue-100 text-sm">Credits Included</p>
//               <p className="text-2xl font-bold mt-1">300</p>
//             </div>
//           </div>

//           <div className="bg-blue-500 bg-opacity-30 rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-sm">Credits Used This Month</span>
//               <span className="text-sm font-semibold">50 / 300</span>
//             </div>
//             <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-2">
//               <div className="bg-white h-2 rounded-full" style={{ width: '16.6%' }}></div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center text-sm">
//               <Calendar className="w-4 h-4 mr-2" />
//               <span>Next billing date: Oct 01, 2024</span>
//             </div>
//             <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
//               Manage Plan
//             </button>
//           </div>
//         </div>
        

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
//           <div className="space-y-3">
//             <button 
//               onClick={() => setShowAddCredits(!showAddCredits)}
//               className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
//             >
//               <div className="flex items-center">
//                 <Plus className="w-5 h-5 text-green-600 mr-3" />
//                 <span className="text-sm font-semibold text-green-900">Add Credits</span>
//               </div>
//             </button>
            
//             <button className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
//               <div className="flex items-center">
//                 <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
//                 <span className="text-sm font-semibold text-blue-900">Upgrade Plan</span>
//               </div>
//             </button>
            
//             <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
//               <div className="flex items-center">
//                 <Download className="w-5 h-5 text-purple-600 mr-3" />
//                 <span className="text-sm font-semibold text-purple-900">Download Invoices</span>
//               </div>
//             </button>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-600">Total Spent</span>
//               <span className="text-lg font-bold text-gray-900">$312.00</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-600">Credits Purchased</span>
//               <span className="text-lg font-bold text-gray-900">1,300</span>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       {/* Current Plan + Quick Actions */}
// <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//   {/* Current Plan */}
//   <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-4 text-white">
//     <div className="flex items-start justify-between mb-3">
//       <div>
//         <p className="text-blue-100 text-xs">Current Plan</p>
//         <h2 className="text-xl font-bold mt-1">Professional</h2>
//       </div>
//       <div className="bg-blue-500 bg-opacity-50 rounded-md px-2 py-0.5">
//         <span className="text-xs font-semibold">Active</span>
//       </div>
//     </div>

//     <div className="grid grid-cols-2 gap-4 mb-4">
//       <div>
//         <p className="text-blue-100 text-xs">Monthly Cost</p>
//         <p className="text-lg font-bold mt-1">$79.00</p>
//       </div>
//       <div>
//         <p className="text-blue-100 text-xs">Credits Included</p>
//         <p className="text-lg font-bold mt-1">300</p>
//       </div>
//     </div>

//     <div className="bg-blue-500 bg-opacity-30 rounded-md p-3 mb-3">
//       <div className="flex justify-between items-center mb-1">
//         <span className="text-xs">Credits Used This Month</span>
//         <span className="text-xs font-semibold">50 / 300</span>
//       </div>
//       <div className="w-full bg-blue-900 bg-opacity-30 rounded-full h-1.5">
//         <div className="bg-white h-1.5 rounded-full" style={{ width: '16.6%' }}></div>
//       </div>
//     </div>

//     <div className="flex items-center justify-between">
//       <div className="flex items-center text-xs">
//         <Calendar className="w-3.5 h-3.5 mr-1" />
//         <span>Next billing date: Oct 01, 2024</span>
//       </div>
//       <button className="bg-white text-blue-600 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-blue-50 transition-colors">
//         Manage Plan
//       </button>
//     </div>
//   </div>

//   {/* Quick Actions */}
//   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//     <h3 className="text-base font-bold text-gray-800 mb-3">Quick Actions</h3>
//     <div className="space-y-2">
//       <button
//         onClick={() => setShowAddCredits(!showAddCredits)}
//         className="w-full flex items-center justify-between p-2.5 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
//       >
//         <div className="flex items-center">
//           <Plus className="w-4 h-4 text-green-600 mr-2" />
//           <span className="text-xs font-semibold text-green-900">Add Credits</span>
//         </div>
//       </button>

//       <button className="w-full flex items-center justify-between p-2.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
//         <div className="flex items-center">
//           <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
//           <span className="text-xs font-semibold text-blue-900">Upgrade Plan</span>
//         </div>
//       </button>

//       <button className="w-full flex items-center justify-between p-2.5 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors">
//         <div className="flex items-center">
//           <Download className="w-4 h-4 text-purple-600 mr-2" />
//           <span className="text-xs font-semibold text-purple-900">Download Invoices</span>
//         </div>
//       </button>
//     </div>

//     <div className="mt-4 pt-4 border-t border-gray-200">
//       <div className="flex items-center justify-between mb-1.5">
//         <span className="text-xs text-gray-600">Total Spent</span>
//         <span className="text-sm font-bold text-gray-900">$312.00</span>
//       </div>
//       <div className="flex items-center justify-between">
//         <span className="text-xs text-gray-600">Credits Purchased</span>
//         <span className="text-sm font-bold text-gray-900">1,300</span>
//       </div>
//     </div>
//   </div>
// </div>


//       {/* Add Credits Modal */}
//       {showAddCredits && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Purchase Additional Credits</h2>
//             <button 
//               onClick={() => setShowAddCredits(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             {creditPackages.map((pkg) => (
//               <div
//                 key={pkg.credits}
//                 onClick={() => setCreditAmount(pkg.credits.toString())}
//                 className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
//                   creditAmount === pkg.credits.toString()
//                     ? 'border-blue-600 bg-blue-50'
//                     : 'border-gray-200 hover:border-blue-300'
//                 }`}
//               >
//                 {pkg.bonus > 0 && (
//                   <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     +{pkg.bonus} Free
//                   </div>
//                 )}
//                 <div className="text-center">
//                   <Package className="w-8 h-8 text-gray-600 mx-auto mb-2" />
//                   <p className="text-2xl font-bold text-gray-900">{pkg.credits + pkg.bonus}</p>
//                   <p className="text-xs text-gray-500 mb-2">credits</p>
//                   <p className="text-lg font-bold text-blue-600">${pkg.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
//             Purchase Credits
//           </button>
//         </div>
//       )}

//       {/* Subscription Plans */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Available Plans</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`relative bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
//                 plan.popular
//                   ? 'border-blue-600'
//                   : 'border-gray-200'
//               }`}
//             >
//               {plan.popular && (
//                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                   <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
//                     MOST POPULAR
//                   </span>
//                 </div>
//               )}
              
//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
//                 <div className="flex items-baseline justify-center">
//                   <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
//                   <span className="text-gray-500 ml-2">/month</span>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-2">{plan.credits} credits/month</p>
//               </div>

//               <ul className="space-y-3 mb-6">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
//                     <span className="text-sm text-gray-700">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 className={`w-full py-3 rounded-lg font-semibold transition-colors ${
//                   selectedPlan === plan.id
//                     ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//                 disabled={selectedPlan === plan.id}
//               >
//                 {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Payment Methods */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
//             <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
//               <Plus className="w-4 h-4 mr-1" />
//               Add New
//             </button>
//           </div>

//           <div className="space-y-3">
//             {paymentMethods.map((method) => (
//               <div
//                 key={method.id}
//                 className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
//               >
//                 <div className="flex items-center">
//                   <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center mr-3">
//                     <CreditCard className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">
//                       {method.type} •••• {method.last4}
//                     </p>
//                     <p className="text-sm text-gray-500">Expires {method.expiry}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {method.isDefault && (
//                     <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
//                       Default
//                     </span>
//                   )}
//                   <button className="text-gray-400 hover:text-gray-600">⋮</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Billing Info */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-6">Billing Information</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-600">Company Name</label>
//               <p className="font-semibold text-gray-900">Acme Corporation</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Email</label>
//               <p className="font-semibold text-gray-900">john.doe@acme.com</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Billing Address</label>
//               <p className="font-semibold text-gray-900">123 Business St, Suite 100</p>
//               <p className="font-semibold text-gray-900">San Francisco, CA 94105</p>
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Tax ID</label>
//               <p className="font-semibold text-gray-900">XX-XXXXXXX</p>
//             </div>
//           </div>
//           <button className="mt-6 w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
//             Edit Information
//           </button>
//         </div>
//       </div>

//       {/* Transaction History */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
//           <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
//             <Download className="w-4 h-4 mr-1" />
//             Export All
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Invoice ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Credits
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {transactions.map((transaction) => (
//                 <tr key={transaction.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm font-medium text-gray-900">{transaction.id}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       {transaction.type === 'subscription' ? (
//                         <Receipt className="w-4 h-4 text-blue-600 mr-2" />
//                       ) : (
//                         <DollarSign className="w-4 h-4 text-green-600 mr-2" />
//                       )}
//                       <span className="text-sm text-gray-900">{transaction.description}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                     {transaction.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                     ${transaction.amount.toFixed(2)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm text-gray-600">+{transaction.credits}</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(transaction.status)}`}>
//                       {transaction.status.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <button className="text-blue-600 hover:text-blue-700">
//                       <Download className="w-4 h-4" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-600">Showing 5 of 15 transactions</p>
//           <div className="flex items-center space-x-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
//               Previous
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;


'use client';
import React, { useState } from 'react';
import { CreditCard, Download, Receipt, Plus, Check, AlertCircle, Calendar, DollarSign, TrendingUp, Package } from 'lucide-react';

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showAddCredits, setShowAddCredits] = useState(false);
  const [creditAmount, setCreditAmount] = useState('100');

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false
    }
  ];

  const creditPackages = [
    { credits: 50, price: 15, bonus: 0 },
    { credits: 100, price: 25, bonus: 10 },
    { credits: 250, price: 60, bonus: 30 },
    { credits: 500, price: 100, bonus: 75 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Payment Plan</h1>
        <p className="text-gray-300 mt-1">Manage your subscription, credits, and payment methods</p>
      </div>

      {/* Load Balance + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Load Balance */}
        <div className="lg:col-span-2 bg-gradient-to-br to-black rounded-lg shadow-md p-4 text-white border border-gray-800">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-gray-400 text-xs">Load Balance</p>
              <h2 className="text-xl font-bold mt-1 text-white">Available Balance</h2>
            </div>
            <div className="bg-gray-800 rounded-md px-2 py-0.5">
              <span className="text-xs font-semibold text-green-400">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-400 text-xs">Current Balance</p>
              <p className="text-lg font-bold mt-1 text-white">250</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Credits Used This Month</p>
              <p className="text-lg font-bold mt-1 text-white">50</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-md p-3 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-300">Monthly Usage</span>
              <span className="text-xs font-semibold text-white">50 / 300</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '16.6%' }}></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-300">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Next reset: Oct 01, 2024</span>
            </div>
            <button 
              onClick={() => setShowAddCredits(!showAddCredits)}
              className="bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-red-700 transition-colors"
            >
              Add Credits
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900/5 rounded-lg shadow-sm border border-gray-800 p-4">
          <h3 className="text-base font-bold text-white mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => setShowAddCredits(!showAddCredits)}
              className="w-full flex items-center justify-between p-2.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              <div className="flex items-center">
                <Plus className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-xs font-semibold text-white">Add Credits</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-2.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-xs font-semibold text-white">Upgrade Plan</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-2.5 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-xs font-semibold text-white">Download Invoices</span>
              </div>
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">Total Spent</span>
              <span className="text-sm font-bold text-white">$312.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Credits Purchased</span>
              <span className="text-sm font-bold text-white">1,300</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Credits Modal */}
      {showAddCredits && (
        <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Purchase Additional Credits</h2>
            <button 
              onClick={() => setShowAddCredits(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.credits}
                onClick={() => setCreditAmount(pkg.credits.toString())}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  creditAmount === pkg.credits.toString()
                    ? 'border-red-600 bg-gray-800'
                    : 'border-gray-700 hover:border-red-500'
                }`}
              >
                {pkg.bonus > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    +{pkg.bonus} Free
                  </div>
                )}
                <div className="text-center">
                  <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{pkg.credits + pkg.bonus}</p>
                  <p className="text-xs text-gray-400 mb-2">credits</p>
                  <p className="text-lg font-bold text-red-400">${pkg.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Purchase Credits
          </button>
        </div>
      )}

      {/* Payment Methods */}
      <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Payment Methods</h2>
          <button className="flex items-center text-red-400 hover:text-red-300 font-semibold">
            <Plus className="w-4 h-4 mr-1" />
            Add New
          </button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-red-500 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-12 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center mr-3">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {method.type} •••• {method.last4}
                  </p>
                  <p className="text-sm text-gray-400">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault && (
                  <span className="text-xs bg-red-900 text-red-400 px-2 py-1 rounded-full font-semibold">
                    Default
                  </span>
                )}
                <button className="text-gray-400 hover:text-white">⋮</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Billing;