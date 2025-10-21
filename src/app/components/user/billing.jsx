// 'use client';
// import React, { useState } from 'react';
// import { CreditCard, Plus, Calendar, DollarSign, CheckCircle } from 'lucide-react';

// const Billing = () => {
//   const [showAddCard, setShowAddCard] = useState(false);
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [balance, setBalance] = useState(250);
//   const [creditAmount, setCreditAmount] = useState('');
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [creditSuccess, setCreditSuccess] = useState(false);

//   const [paymentMethods, setPaymentMethods] = useState([
//     { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
//   ]);

//   const handleAddCard = (e) => {
//     e.preventDefault();
//     if (cardNumber.length < 16 || !expiry) return;

//     const last4 = cardNumber.slice(-4);
//     const newCard = {
//       id: paymentMethods.length + 1,
//       type: 'Debit',
//       last4,
//       expiry,
//       isDefault: false,
//     };

//     setPaymentMethods([...paymentMethods, newCard]);
//     setCardNumber('');
//     setExpiry('');
//     setShowAddCard(false);
//   };

//   const handleAddCredit = (e) => {
//     e.preventDefault();
//     if (!selectedCard || !creditAmount) return;

//     const amount = parseFloat(creditAmount);
//     if (isNaN(amount) || amount <= 0) return;

//     // Add credit to balance instead of deducting
//     setBalance(balance + amount);
//     setCreditAmount('');
//     setSelectedCard(null);
//     setCreditSuccess(true);

//     setTimeout(() => setCreditSuccess(false), 2000);
//   };

//   return (
//     <div className="min-h-screen max-w-7xl mx-auto p-6 bg-black text-white">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-white">Add Card</h1>
//         <p className="text-gray-300 mt-1">Manage your debit cards, add credit to your balance, and view your funds</p>
//       </div>

//       {/* Balance Section */}
//       <div className="bg-gradient-to-br to-black rounded-lg shadow-md p-4 text-white border border-gray-800 mb-6">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <p className="text-gray-400 text-xs">Available Balance</p>
//             <h2 className="text-2xl font-bold mt-1 text-white">${balance.toFixed(2)}</h2>
//           </div>
//           <div className="flex items-center text-xs text-gray-300">
//             <Calendar className="w-3.5 h-3.5 mr-1" />
//             <span>Last updated: Oct 08, 2025</span>
//           </div>
//         </div>
//       </div>

//       {/* Payment Methods */}
//       <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-white">Debit Cards</h2>
//           <button
//             onClick={() => setShowAddCard(!showAddCard)}
//             className="flex items-center text-gray-100 hover:text-gray-300 font-semibold"
//           >
//             <Plus className="w-4 h-4 mr-1" /> Add Debit Card
//           </button>
//         </div>

//         {showAddCard && (
//           <form onSubmit={handleAddCard} className="mb-6 bg-gray-800 p-4 rounded-lg space-y-3">
//             <div>
//               <label className="text-sm text-gray-400">Card Number</label>
//               <input
//                 type="text"
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//                 maxLength="16"
//                 placeholder="Enter 16-digit card number"
//                 className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-400">Expiry Date</label>
//               <input
//                 type="text"
//                 value={expiry}
//                 onChange={(e) => setExpiry(e.target.value)}
//                 placeholder="MM/YY"
//                 className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
//             >
//               Save Card
//             </button>
//           </form>
//         )}

//         <div className="space-y-3">
//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className={`flex items-center justify-between p-4 border rounded-lg transition-colors cursor-pointer ${
//                 selectedCard === method.id
//                   ? 'border-red-500 bg-gray-800/70'
//                   : 'border-gray-700 hover:border-red-500'
//               }`}
//               onClick={() => setSelectedCard(method.id)}
//             >
//               <div className="flex items-center">
//                 <div className="w-12 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center mr-3">
//                   <CreditCard className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-white">
//                     {method.type} •••• {method.last4}
//                   </p>
//                   <p className="text-sm text-gray-400">Expires {method.expiry}</p>
//                 </div>
//               </div>
//               {method.isDefault && (
//                 <span className="text-xs bg-red-600/30 text-gray-200 px-2 py-1 rounded-full font-semibold">
//                   Default
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add Credit Section */}
//       <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6">
//         <h2 className="text-xl font-bold text-white mb-4">Add Credit to Balance</h2>

//         <form onSubmit={handleAddCredit} className="space-y-4">
//           <div>
//             <label className="text-sm text-gray-400">Credit Amount ($)</label>
//             <div className="flex items-center bg-gray-900 border border-gray-700 rounded p-2 mt-1">
//               <DollarSign className="text-gray-400 mr-2 w-4 h-4" />
//               <input
//                 type="number"
//                 value={creditAmount}
//                 onChange={(e) => setCreditAmount(e.target.value)}
//                 placeholder="Enter amount to add"
//                 className="w-full bg-transparent text-white outline-none text-sm"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={!selectedCard || !creditAmount}
//             className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
//               selectedCard && creditAmount
//                 ? 'bg-red-600 text-white hover:bg-red-700'
//                 : 'bg-gray-800 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {selectedCard ? 'Add Credit' : 'Select a Card to Add Credit'}
//           </button>
//         </form>

//         {creditSuccess && (
//           <div className="flex items-center justify-center mt-4 text-green-400 text-sm font-semibold">
//             <CheckCircle className="w-4 h-4 mr-2" /> Credit added successfully!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Billing;


'use client';
import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { useBalance } from '@/app/hooks/usebalance';

const Billing = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [creditSuccess, setCreditSuccess] = useState(false);
  
  // Use the useBalance hook
  const { balance, addCredits, isLoading } = useBalance();

  const [paymentMethods, setPaymentMethods] = useState([
    // { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  ]);

  const handleAddCard = (e) => {
    e.preventDefault();
    if (cardNumber.length < 16 || !expiry) return;

    const last4 = cardNumber.slice(-4);
    const newCard = {
      id: paymentMethods.length + 1,
      type: 'Debit',
      last4,
      expiry,
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newCard]);
    setCardNumber('');
    setExpiry('');
    setShowAddCard(false);
  };

  const handleAddCredit = async (e) => {
    e.preventDefault();
    if (!selectedCard || !creditAmount) return;

    const amount = parseFloat(creditAmount);
    if (isNaN(amount) || amount <= 0) return;

    try {
      // Use the addCredits function from useBalance hook
      await addCredits(amount);
      setCreditAmount('');
      setSelectedCard(null);
      setCreditSuccess(true);

      setTimeout(() => setCreditSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add credits:', error);
      // You can show an error message to the user here
    }
  };

  // Get current date for "last updated"
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 bg-black text-white">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Add Card</h1>
        <p className="text-gray-300 mt-1">Manage your debit cards, add credit to your balance, and view your funds</p>
      </div>

      {/* Balance Section */}
      <div className="bg-gradient-to-br to-black rounded-lg shadow-md p-4 text-white border border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-400 text-xs">Available Balance</p>
            <h2 className="text-2xl font-bold mt-1 text-white">${balance.toFixed(2)}</h2>
          </div>
          <div className="flex items-center text-xs text-gray-300">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>Last updated: {getCurrentDate()}</span>
          </div>
        </div>
        {isLoading && (
          <div className="text-xs text-blue-400 mt-2">
            Updating balance...
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Debit Cards</h2>
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            className="flex items-center text-gray-100 hover:text-gray-300 font-semibold"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Debit Card
          </button>
        </div>

        {showAddCard && (
          <form onSubmit={handleAddCard} className="mb-6 bg-gray-800 p-4 rounded-lg space-y-3">
            <div>
              <label className="text-sm text-gray-400">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                placeholder="Enter 16-digit card number"
                className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
            >
              Save Card
            </button>
          </form>
        )}

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-lg transition-colors cursor-pointer ${
                selectedCard === method.id
                  ? 'border-red-500 bg-gray-800/70'
                  : 'border-gray-700 hover:border-red-500'
              }`}
              onClick={() => setSelectedCard(method.id)}
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
              {method.isDefault && (
                <span className="text-xs bg-red-600/30 text-gray-200 px-2 py-1 rounded-full font-semibold">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Credit Section */}
      <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Add Credit to Balance</h2>

        <form onSubmit={handleAddCredit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Credit Amount ($)</label>
            <div className="flex items-center bg-gray-900 border border-gray-700 rounded p-2 mt-1">
              <DollarSign className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="Enter amount to add"
                className="w-full bg-transparent text-white outline-none text-sm"
                min="1"
                step="1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedCard || !creditAmount || isLoading}
            className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
              selectedCard && creditAmount && !isLoading
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Adding Credit...' : selectedCard ? 'Add Credit' : 'Select a Card to Add Credit'}
          </button>
        </form>

        {creditSuccess && (
          <div className="flex items-center justify-center mt-4 text-green-400 text-sm font-semibold">
            <CheckCircle className="w-4 h-4 mr-2" /> Credit added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;


// 'use client';
// import React, { useState } from 'react';
// import { CreditCard, Plus, Calendar } from 'lucide-react';

// const Billing = () => {
//   const [showAddCard, setShowAddCard] = useState(false);
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry] = useState('');
//   const [balance, setBalance] = useState(250);

//   const [paymentMethods, setPaymentMethods] = useState([
//     { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
//   ]);

//   const handleAddCard = (e) => {
//     e.preventDefault();
//     if (cardNumber.length < 16 || !expiry) return;

//     const last4 = cardNumber.slice(-4);
//     const newCard = {
//       id: paymentMethods.length + 1,
//       type: 'Debit',
//       last4,
//       expiry,
//       isDefault: false,
//     };

//     setPaymentMethods([...paymentMethods, newCard]);
//     setCardNumber('');
//     setExpiry('');
//     setShowAddCard(false);
//   };

//   return (
//     <div className="min-h-screen max-w-7xl mx-auto p-6 bg-black text-white">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-white">Payment Plan</h1>
//         <p className="text-gray-300 mt-1">Manage your debit cards and view your balance</p>
//       </div>

//       {/* Balance Section */}
//       <div className="bg-gradient-to-br to-black rounded-lg shadow-md p-4 text-white border border-gray-800 mb-6">
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <p className="text-gray-400 text-xs">Available Balance</p>
//             <h2 className="text-2xl font-bold mt-1 text-white">${balance}</h2>
//           </div>
//           <div className="flex items-center text-xs text-gray-300">
//             <Calendar className="w-3.5 h-3.5 mr-1" />
//             <span>Last updated: Oct 08, 2025</span>
//           </div>
//         </div>
//       </div>

//       {/* Payment Methods */}
//       <div className="bg-gray-900/5 rounded-xl shadow-sm border border-gray-800 p-6 mb-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold text-white">Debit Cards</h2>
//           <button
//             onClick={() => setShowAddCard(!showAddCard)}
//             className="flex items-center text-red-400 hover:text-red-300 font-semibold"
//           >
//             <Plus className="w-4 h-4 mr-1" /> Add Debit Card
//           </button>
//         </div>

//         {showAddCard && (
//           <form onSubmit={handleAddCard} className="mb-6 bg-gray-800 p-4 rounded-lg space-y-3">
//             <div>
//               <label className="text-sm text-gray-400">Card Number</label>
//               <input
//                 type="text"
//                 value={cardNumber}
//                 onChange={(e) => setCardNumber(e.target.value)}
//                 maxLength="16"
//                 placeholder="Enter 16-digit card number"
//                 className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-400">Expiry Date</label>
//               <input
//                 type="text"
//                 value={expiry}
//                 onChange={(e) => setExpiry(e.target.value)}
//                 placeholder="MM/YY"
//                 className="w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded text-white text-sm"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
//             >
//               Save Card
//             </button>
//           </form>
//         )}

//         <div className="space-y-3">
//           {paymentMethods.map((method) => (
//             <div
//               key={method.id}
//               className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:border-red-500 transition-colors"
//             >
//               <div className="flex items-center">
//                 <div className="w-12 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center mr-3">
//                   <CreditCard className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-white">
//                     {method.type} •••• {method.last4}
//                   </p>
//                   <p className="text-sm text-gray-400">Expires {method.expiry}</p>
//                 </div>
//               </div>
//               {method.isDefault && (
//                 <span className="text-xs bg-red-900 text-red-400 px-2 py-1 rounded-full font-semibold">
//                   Default
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Billing;

