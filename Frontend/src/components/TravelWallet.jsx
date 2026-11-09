import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  Trash2, 
  TrendingDown, 
  TrendingUp, 
  PieChart, 
  Sparkles,
  CheckCircle2,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function TravelWallet({ activeTrip }) {
  const totalBudget = Number(activeTrip?.budget) || 5000;
  
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Hotel Booking Deposit', category: 'Accommodation', amount: 1800, date: 'Today, 09:00 AM' },
    { id: '2', title: 'Regional Breakfast & Coffee', category: 'Food & Dining', amount: 180, date: 'Today, 10:30 AM' },
    { id: '3', title: 'Local Metro Card Recharge', category: 'Transit', amount: 200, date: 'Today, 11:15 AM' },
    { id: '4', title: 'Monument Entry Passes', category: 'Sightseeing', amount: 150, date: 'Today, 02:00 PM' }
  ]);

  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'Food & Dining',
    amount: ''
  });

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remainingBudget = totalBudget - totalSpent;
  const percentSpent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title.trim() || !newExpense.amount) return;

    const entry = {
      id: Date.now().toString(),
      title: newExpense.title.trim(),
      category: newExpense.category,
      amount: Number(newExpense.amount),
      date: 'Just now'
    };

    setExpenses([entry, ...expenses]);
    setNewExpense({ title: '', category: 'Food & Dining', amount: '' });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="wallet-page-container">
      <div className="page-header-box">
        <div className="badge-pill">
          <Wallet className="w-4 h-4 text-indigo-400" />
          <span>BUDGET AGENT EXPENSE MANAGER</span>
        </div>
        <h2 className="page-title">Smart Travel Wallet & Expenses</h2>
        <p className="page-subtext">Monitor your expenditures in real-time with AI-driven cost optimization signals.</p>
      </div>

      {/* TOP STATS CARDS */}
      <div className="wallet-metrics-grid">
        <div className="w-metric-card">
          <span className="wm-label">TOTAL ALLOCATED BUDGET</span>
          <strong className="wm-val text-white">₹{totalBudget.toLocaleString('en-IN')}</strong>
          <span className="wm-subtext text-slate-400">{activeTrip?.days || 2} Days Trip Allocation</span>
        </div>

        <div className="w-metric-card">
          <span className="wm-label">TOTAL RECORDED SPEND</span>
          <strong className="wm-val text-amber-400">₹{totalSpent.toLocaleString('en-IN')}</strong>
          <span className="wm-subtext text-slate-400">{expenses.length} Logged Transactions</span>
        </div>

        <div className="w-metric-card">
          <span className="wm-label">REMAINING BALANCE</span>
          <strong className={`wm-val ${remainingBudget >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ₹{remainingBudget.toLocaleString('en-IN')}
          </strong>
          <span className="wm-subtext text-emerald-400">
            {remainingBudget >= 0 ? '✓ Within Safe Target' : '⚠️ Over Budget Alert'}
          </span>
        </div>
      </div>

      {/* BUDGET BURN BAR */}
      <div className="budget-burn-card">
        <div className="burn-label-row">
          <span>Budget Utilization Meter</span>
          <strong>{percentSpent}% Used</strong>
        </div>
        <div className="burn-track">
          <div 
            className={`burn-fill ${percentSpent > 90 ? 'burn-danger' : percentSpent > 70 ? 'burn-warn' : 'burn-good'}`}
            style={{ width: `${percentSpent}%` }}
          ></div>
        </div>
      </div>

      <div className="wallet-split-layout">
        {/* LOG NEW EXPENSE FORM */}
        <div className="wallet-form-box">
          <h3 className="wallet-section-title">
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Log a New Expense</span>
          </h3>

          <form onSubmit={handleAddExpense} className="expense-form">
            <div className="form-group-item mb-3">
              <label>Expense Name / Item</label>
              <input 
                type="text" 
                placeholder="e.g. Dinner, Taxi, Water Bottle..." 
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                className="input-primary"
                required
              />
            </div>

            <div className="form-trio-grid mb-3">
              <div className="form-group-item">
                <label>Amount (₹ INR)</label>
                <input 
                  type="number" 
                  min="1" 
                  placeholder="250" 
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="input-primary"
                  required
                />
              </div>

              <div className="form-group-item">
                <label>Category</label>
                <select 
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="input-primary"
                >
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Transit">Local Transit</option>
                  <option value="Sightseeing">Sightseeing & Passes</option>
                  <option value="Shopping">Shopping & Souvenirs</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-hero-primary w-full">
              <span>+ Add to Expense Log</span>
            </button>
          </form>

          {/* AI Budget Coach Tips */}
          <div className="ai-coach-box mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <strong className="text-xs text-indigo-300 uppercase tracking-wider">AI Budget Coach Insights</strong>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              • Using rapid metro routes instead of app cabs will save an estimated ₹650 on Day 2.
            </p>
            <p className="text-xs text-slate-300">
              • Traditional local mess meals provide authentic regional delicacies at 40% lower cost than hotel dining.
            </p>
          </div>
        </div>

        {/* EXPENSE TRANSACTION HISTORY */}
        <div className="wallet-history-box">
          <h3 className="wallet-section-title">
            <span>Transaction History</span>
            <span className="text-xs text-slate-400">({expenses.length} Records)</span>
          </h3>

          <div className="transactions-list">
            {expenses.map((item) => (
              <div key={item.id} className="transaction-row">
                <div className="tx-left">
                  <span className="tx-icon">
                    {item.category.includes('Food') ? '🍲' : item.category.includes('Hotel') || item.category.includes('Accom') ? '🏨' : item.category.includes('Transit') ? '🚇' : '🎟️'}
                  </span>
                  <div>
                    <strong className="tx-title">{item.title}</strong>
                    <span className="tx-meta">{item.category} • {item.date}</span>
                  </div>
                </div>
                <div className="tx-right">
                  <strong className="tx-amount">- ₹{item.amount.toLocaleString('en-IN')}</strong>
                  <button 
                    className="tx-delete-btn" 
                    onClick={() => handleDeleteExpense(item.id)}
                    title="Delete record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
