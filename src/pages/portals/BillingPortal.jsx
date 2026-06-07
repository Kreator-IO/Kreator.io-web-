import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PortalLayout from '../../components/PortalLayout';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  History,
  Landmark,
  Mail,
  Plus,
  QrCode,
  Receipt,
  RefreshCw,
  Search,
  Shield,
  Sparkles,
  Wallet,
  X,
  Zap,
} from 'lucide-react';

const planCatalog = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    period: 'month',
    description: 'For small retainers and one active project.',
    features: ['3 team seats', '10GB storage', 'Email support', 'Monthly status report'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 49,
    period: 'month',
    description: 'Best for active client teams with multiple projects.',
    features: ['10 team seats', '50GB storage', 'Priority support', 'Advanced project analytics'],
  },
  {
    id: 'enterprise',
    name: 'VexquorAI',
    price: 199,
    period: 'month',
    description: 'For larger teams that need hands-on account coverage.',
    features: ['Unlimited seats', '500GB storage', 'Dedicated success manager', 'Custom integrations'],
  },
];

const initialInvoices = [
  { id: 'INV-2026-005', date: 'May 01, 2026', dueDate: 'May 15, 2026', amount: 2450, status: 'Due', service: 'E-commerce Platform Milestone' },
  { id: 'INV-2026-004', date: 'Apr 01, 2026', dueDate: 'Apr 15, 2026', amount: 49, status: 'Paid', service: 'Professional Subscription' },
  { id: 'INV-2026-003', date: 'Mar 01, 2026', dueDate: 'Mar 15, 2026', amount: 49, status: 'Paid', service: 'Professional Subscription' },
  { id: 'INV-2026-002', date: 'Feb 01, 2026', dueDate: 'Feb 15, 2026', amount: 680, status: 'Paid', service: 'Brand Redesign Add-on' },
  { id: 'INV-2026-001', date: 'Jan 01, 2026', dueDate: 'Jan 15, 2026', amount: 49, status: 'Paid', service: 'Professional Subscription' },
];

const statusStyles = {
  Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Due: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  Failed: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
};

const gatewayCatalog = [
  {
    id: 'card',
    name: 'Card',
    provider: 'Stripe',
    description: 'Visa, Mastercard, Amex',
    fee: '2.9% + $0.30',
    icon: CreditCard,
  },
  {
    id: 'upi',
    name: 'UPI',
    provider: 'Razorpay',
    description: 'Google Pay, PhonePe, BHIM',
    fee: '0.8%',
    icon: Wallet,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    provider: 'PayPal',
    description: 'PayPal balance or linked card',
    fee: '3.4%',
    icon: Shield,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    provider: 'Manual NEFT/ACH',
    description: 'Bank transfer with reference',
    fee: 'No platform fee',
    icon: Landmark,
  },
];

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const BillingPortal = () => {
  const [activePlan, setActivePlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [invoices, setInvoices] = useState(initialInvoices);
  const [invoiceFilter, setInvoiceFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState({
    brand: 'Visa',
    last4: '4242',
    expiry: '12/28',
    holder: 'Acme Corp',
  });
  const [paymentDraft, setPaymentDraft] = useState(paymentMethod);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [billingEmail, setBillingEmail] = useState('billing@acme.com');
  const [emailDraft, setEmailDraft] = useState(billingEmail);
  const [selectedGateway, setSelectedGateway] = useState('card');
  const [isGatewayPanelOpen, setIsGatewayPanelOpen] = useState(false);
  const [checkoutInvoice, setCheckoutInvoice] = useState(null);
  const [gatewayFields, setGatewayFields] = useState({
    cardNumber: '',
    cardName: 'Acme Corp',
    cardExpiry: '',
    cardCvc: '',
    upiId: 'vexquorai.pay@upi',
    paypalEmail: '',
    bankReference: '',
  });
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [paymentError, setPaymentError] = useState('');
  const [hasCompletedPayment, setHasCompletedPayment] = useState(false);
  const [notice, setNotice] = useState('');

  const currentPlan = planCatalog.find((plan) => plan.id === activePlan) || planCatalog[1];
  const yearlyDiscount = billingCycle === 'yearly' ? 0.8 : 1;
  const displayedPrice = billingCycle === 'yearly' ? currentPlan.price * 12 * yearlyDiscount : currentPlan.price;
  const pendingTotal = invoices
    .filter((invoice) => invoice.status === 'Due' || invoice.status === 'Failed')
    .reduce((total, invoice) => total + invoice.amount, 0);
  const pendingInvoices = invoices.filter((invoice) => invoice.status === 'Due' || invoice.status === 'Failed');
  const selectedGatewayInfo = gatewayCatalog.find((gateway) => gateway.id === selectedGateway);
  const isGatewayUnavailable = selectedGateway === 'card' || selectedGateway === 'paypal' || selectedGateway === 'bank';

  const filteredInvoices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const paidInvoiceIds = new Set(paymentRecords.map((record) => record.invoiceId));

    return invoices.filter((invoice) => {
      const wasPaidInThisSession = paidInvoiceIds.has(invoice.id);
      const matchesStatus = invoiceFilter === 'All' || invoice.status === invoiceFilter;
      const matchesSearch =
        !normalizedSearch ||
        invoice.id.toLowerCase().includes(normalizedSearch) ||
        invoice.service.toLowerCase().includes(normalizedSearch);

      return wasPaidInThisSession && matchesStatus && matchesSearch;
    });
  }, [invoiceFilter, invoices, paymentRecords, searchTerm]);

  const upiPaymentUri = useMemo(() => {
    if (!checkoutInvoice) {
      return '';
    }

    const params = new URLSearchParams({
      pa: gatewayFields.upiId.trim() || 'vexquorai.pay@upi',
      pn: 'VexquorAI Payments',
      am: checkoutInvoice.amount.toFixed(2),
      cu: 'INR',
      tn: checkoutInvoice.id,
    });

    return `upi://pay?${params.toString()}`;
  }, [checkoutInvoice, gatewayFields.upiId]);

  const upiQrImageUrl = upiPaymentUri
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=12&data=${encodeURIComponent(upiPaymentUri)}`
    : '';

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2600);
  };

  const handlePlanChange = (planId) => {
    setActivePlan(planId);
    const selectedPlan = planCatalog.find((plan) => plan.id === planId);
    showNotice(`${selectedPlan.name} plan selected. Your next renewal estimate has been updated.`);
  };

  const handlePaymentSave = (event) => {
    event.preventDefault();
    setPaymentMethod(paymentDraft);
    setIsEditingPayment(false);
    showNotice('Payment method updated successfully.');
  };

  const handleEmailSave = (event) => {
    event.preventDefault();
    setBillingEmail(emailDraft);
    showNotice('Billing contact updated.');
  };

  const openGatewayPanel = (gatewayId, invoice = pendingInvoices[0] || null) => {
    setSelectedGateway(gatewayId);
    setCheckoutInvoice(invoice);
    setIsGatewayPanelOpen(true);
    setPaymentError('');
  };

  const openCheckout = (invoice) => {
    openGatewayPanel(selectedGateway, invoice);
  };

  const closeCheckout = () => {
    setIsGatewayPanelOpen(false);
    setCheckoutInvoice(null);
    setPaymentError('');
  };

  const updateGatewayField = (field, value) => {
    setGatewayFields((currentFields) => ({ ...currentFields, [field]: value }));
  };

  const validateGatewayPayment = () => {
    if (isGatewayUnavailable) {
      return `${selectedGatewayInfo.name} checkout is not available right now. Very sorry.`;
    }

    if (selectedGateway === 'card') {
      const cardDigits = gatewayFields.cardNumber.replace(/\D/g, '');
      const cvcDigits = gatewayFields.cardCvc.replace(/\D/g, '');

      if (cardDigits.length < 12 || gatewayFields.cardName.trim().length < 2 || !gatewayFields.cardExpiry.trim() || cvcDigits.length < 3) {
        return 'Enter valid card number, name, expiry, and CVC.';
      }
    }

    if (selectedGateway === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(gatewayFields.upiId.trim())) {
      return 'Enter a valid UPI ID, for example acme@upi.';
    }

    if (selectedGateway === 'paypal' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gatewayFields.paypalEmail.trim())) {
      return 'Enter the PayPal account email.';
    }

    if (selectedGateway === 'bank' && gatewayFields.bankReference.trim().length < 6) {
      return 'Enter a bank transfer reference with at least 6 characters.';
    }

    return '';
  };

  const processGatewayPayment = (event) => {
    event.preventDefault();

    if (!checkoutInvoice) {
      return;
    }

    const validationError = validateGatewayPayment();

    if (validationError) {
      setPaymentError(validationError);
      return;
    }

    const gateway = gatewayCatalog.find((item) => item.id === selectedGateway);
    const paymentId = `PAY-${Date.now().toString().slice(-8)}`;

    setInvoices((currentInvoices) =>
      currentInvoices.map((invoice) =>
        invoice.id === checkoutInvoice.id ? { ...invoice, status: 'Paid' } : invoice,
      ),
    );
    setPaymentRecords((currentRecords) => [
      {
        id: paymentId,
        invoiceId: checkoutInvoice.id,
        gateway: gateway.name,
        amount: checkoutInvoice.amount,
        status: 'Success',
        date: 'May 24, 2026',
      },
      ...currentRecords,
    ]);
    setPaymentError('');
    setCheckoutInvoice(null);
    setIsGatewayPanelOpen(false);
    setHasCompletedPayment(true);
    showNotice(`${checkoutInvoice.id} paid through ${gateway.name}. Transaction ${paymentId} created.`);
  };

  const downloadInvoice = (invoice) => {
    const receipt = [
      'VexquorAI Billing Receipt',
      `Invoice: ${invoice.id}`,
      `Service: ${invoice.service}`,
      `Issued: ${invoice.date}`,
      `Due: ${invoice.dueDate}`,
      `Amount: ${currency.format(invoice.amount)}`,
      `Status: ${invoice.status}`,
      `Billing contact: ${billingEmail}`,
    ].join('\n');
    const blob = new Blob([receipt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${invoice.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice(`${invoice.id} receipt downloaded.`);
  };

  return (
    <PortalLayout title="Billing Portal">
      <div className="space-y-8 animate-fade-in-up">
        <Link
          to="/portals/client"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm font-bold text-slate-300 transition-all hover:border-blue-500/50 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Overview
        </Link>

        {notice && (
          <div className="fixed right-6 top-24 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/90 px-5 py-3 text-sm font-semibold text-emerald-100 shadow-2xl shadow-emerald-950/40 backdrop-blur">
            <CheckCircle2 size={18} className="text-emerald-300" />
            {notice}
          </div>
        )}

        {isGatewayPanelOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm">
            <button
              type="button"
              onClick={closeCheckout}
              className="absolute inset-0 h-full w-full cursor-default"
              aria-label="Close payment gateway panel"
            />
            <form onSubmit={processGatewayPayment} className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-slate-800 bg-slate-950 shadow-2xl shadow-black/50">
              <div className="flex items-start justify-between border-b border-slate-800 p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Payment gateway</p>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {selectedGatewayInfo?.name} Checkout
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedGatewayInfo?.provider}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-900 hover:text-white"
                  aria-label="Close checkout"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-6 p-6">
                {pendingInvoices.length > 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Select invoice</p>
                    <select
                      value={checkoutInvoice?.id || ''}
                      onChange={(event) => {
                        const invoice = pendingInvoices.find((item) => item.id === event.target.value);
                        setCheckoutInvoice(invoice || null);
                        setPaymentError('');
                      }}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-blue-500"
                    >
                      {pendingInvoices.map((invoice) => (
                        <option key={invoice.id} value={invoice.id}>
                          {invoice.id} - {invoice.service} - {currency.format(invoice.amount)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center">
                    <CheckCircle2 size={32} className="mx-auto text-emerald-300" />
                    <h4 className="mt-3 font-bold text-white">No pending invoices</h4>
                    <p className="mt-2 text-sm text-emerald-100/70">All current invoices are already paid.</p>
                  </div>
                )}

                {checkoutInvoice && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                  {isGatewayUnavailable && (
                    <div className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={20} className="mt-0.5 shrink-0 text-amber-300" />
                        <div>
                          <h4 className="font-bold text-amber-100">{selectedGatewayInfo?.name} is not available right now</h4>
                          <p className="mt-2 text-sm leading-6 text-amber-100/70">
                            Very sorry, this checkout method is temporarily unavailable. Please use UPI for now.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Amount</p>
                      <p className="mt-1 text-3xl font-black text-white">{currency.format(checkoutInvoice.amount)}</p>
                    </div>
                    <Shield size={26} className="text-emerald-300" />
                  </div>

                  {selectedGateway === 'card' && (
                    <div className="space-y-3">
                      <input
                        value={gatewayFields.cardNumber}
                        onChange={(event) => updateGatewayField('cardNumber', event.target.value.replace(/[^\d\s]/g, '').slice(0, 19))}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        placeholder="Card number"
                      />
                      <input
                        value={gatewayFields.cardName}
                        onChange={(event) => updateGatewayField('cardName', event.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        placeholder="Name on card"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          value={gatewayFields.cardExpiry}
                          onChange={(event) => updateGatewayField('cardExpiry', event.target.value.slice(0, 5))}
                          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                          placeholder="MM/YY"
                        />
                        <input
                          value={gatewayFields.cardCvc}
                          onChange={(event) => updateGatewayField('cardCvc', event.target.value.replace(/\D/g, '').slice(0, 4))}
                          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                          placeholder="CVC"
                        />
                      </div>
                    </div>
                  )}

                  {selectedGateway === 'upi' && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-800 bg-white p-4">
                        {upiQrImageUrl && (
                          <img
                            src={upiQrImageUrl}
                            alt={`UPI QR code for ${checkoutInvoice.id}`}
                            className="mx-auto h-56 w-56"
                          />
                        )}
                      </div>
                      <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                        <div className="flex items-start gap-2">
                          <QrCode size={16} className="mt-0.5 shrink-0 text-blue-300" />
                          <p className="text-xs leading-5 text-blue-100">
                            Scan this QR with any UPI app to pay {currency.format(checkoutInvoice.amount)} for {checkoutInvoice.id}.
                          </p>
                        </div>
                      </div>
                      <input
                        value={gatewayFields.upiId}
                        onChange={(event) => updateGatewayField('upiId', event.target.value)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                        placeholder="Merchant UPI ID, for example vexquorai.pay@upi"
                      />
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">UPI payment link</p>
                        <p className="mt-2 break-all text-xs text-slate-400">{upiPaymentUri}</p>
                      </div>
                    </div>
                  )}

                  {paymentError && (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-200">
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      {paymentError}
                    </div>
                  )}

                  <button
                    disabled={isGatewayUnavailable}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-all ${
                      isGatewayUnavailable
                        ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <Wallet size={17} />
                    {isGatewayUnavailable ? 'Unavailable Right Now' : `Pay ${currency.format(checkoutInvoice.amount)}`}
                  </button>
                  <p className="mt-3 text-center text-[11px] leading-5 text-slate-600">
                    Demo gateway flow. Replace this handler with a backend payment intent or order API before collecting real money.
                  </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        <section className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-2xl shadow-slate-950/30 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                <Zap size={28} />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-300">Active subscription</p>
                <h2 className="text-3xl font-black text-white">{currentPlan.name} Plan</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Next renewal on June 01, 2026 for{' '}
                  <span className="font-bold text-white">{currency.format(displayedPrice)}</span>
                  {billingCycle === 'yearly' ? ' per year' : ' per month'}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Outstanding</p>
              <p className="mt-2 text-2xl font-black text-white">{currency.format(pendingTotal)}</p>
              <p className="mt-1 text-xs text-slate-500">Open balance across unpaid invoices</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Payment Method</p>
              <p className="mt-2 text-2xl font-black text-white">{paymentMethod.brand} {paymentMethod.last4}</p>
              <p className="mt-1 text-xs text-slate-500">Expires {paymentMethod.expiry}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Billing Contact</p>
              <p className="mt-2 break-all text-lg font-black text-white">{billingEmail}</p>
              <p className="mt-1 text-xs text-slate-500">Receipts and payment alerts</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Payment gateways</p>
              <h3 className="mt-2 text-xl font-black text-white">Accept payments through multiple methods</h3>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              {gatewayCatalog.length} gateways ready
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gatewayCatalog.map((gateway) => {
              const GatewayIcon = gateway.icon;
              const isSelected = selectedGateway === gateway.id;

              return (
                <button
                  key={gateway.id}
                  type="button"
                  onClick={() => openGatewayPanel(gateway.id)}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? 'border-blue-500/70 bg-blue-500/10 shadow-xl shadow-blue-950/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-600'
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-blue-300">
                      <GatewayIcon size={20} />
                    </span>
                    {isSelected && <CheckCircle2 size={18} className="text-blue-300" />}
                  </div>
                  <h4 className="font-bold text-white">{gateway.name}</h4>
                  <p className="mt-1 text-xs text-slate-500">{gateway.provider}</p>
                  <p className="mt-3 text-xs leading-5 text-slate-400">{gateway.description}</p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">Fee {gateway.fee}</p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.6fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Plans</h3>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  {billingCycle === 'yearly' ? '20% saved' : 'Flexible'}
                </span>
              </div>
              <div className="space-y-4">
                {planCatalog.map((plan) => {
                  const isActive = activePlan === plan.id;
                  const planPrice = billingCycle === 'yearly' ? plan.price * 12 * yearlyDiscount : plan.price;

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handlePlanChange(plan.id)}
                      className={`w-full rounded-2xl border p-5 text-left transition-all ${
                        isActive
                          ? 'border-blue-500/70 bg-blue-500/10 shadow-xl shadow-blue-950/20'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-white">{plan.name}</h4>
                          <p className="mt-1 text-xs leading-5 text-slate-500">{plan.description}</p>
                        </div>
                        {isActive && <CheckCircle2 size={20} className="shrink-0 text-blue-300" />}
                      </div>
                      <p className="mt-4 text-2xl font-black text-white">
                        {currency.format(planPrice)}
                        <span className="text-sm font-semibold text-slate-500">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                            <Sparkles size={13} className="text-blue-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Payment Method</h3>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentDraft(paymentMethod);
                    setIsEditingPayment((current) => !current);
                  }}
                  className="rounded-lg p-2 text-blue-300 transition-colors hover:bg-slate-800 hover:text-white"
                  aria-label={isEditingPayment ? 'Close payment form' : 'Edit payment method'}
                >
                  {isEditingPayment ? <X size={18} /> : <Plus size={18} />}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="mb-8 flex items-start justify-between">
                  <CreditCard size={26} className="text-slate-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-600">{paymentMethod.brand}</span>
                </div>
                <p className="text-sm tracking-widest text-slate-300">**** **** **** {paymentMethod.last4}</p>
                <div className="mt-4 flex justify-between text-xs">
                  <span className="font-semibold text-white">{paymentMethod.holder}</span>
                  <span className="text-slate-500">Exp {paymentMethod.expiry}</span>
                </div>
              </div>

              {isEditingPayment && (
                <form onSubmit={handlePaymentSave} className="mt-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={paymentDraft.brand}
                      onChange={(event) => setPaymentDraft({ ...paymentDraft, brand: event.target.value })}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="Card brand"
                      required
                    />
                    <input
                      value={paymentDraft.last4}
                      onChange={(event) => setPaymentDraft({ ...paymentDraft, last4: event.target.value.replace(/\D/g, '').slice(0, 4) })}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="Last 4"
                      minLength={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={paymentDraft.holder}
                      onChange={(event) => setPaymentDraft({ ...paymentDraft, holder: event.target.value })}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="Card holder"
                      required
                    />
                    <input
                      value={paymentDraft.expiry}
                      onChange={(event) => setPaymentDraft({ ...paymentDraft, expiry: event.target.value })}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700">
                    Save Payment Method
                  </button>
                </form>
              )}
            </section>

            {hasCompletedPayment && (
              <section className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6">
                <h3 className="mb-5 text-lg font-bold text-white">Billing Contact</h3>
                <form onSubmit={handleEmailSave} className="space-y-3">
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                    <Mail size={18} className="text-slate-500" />
                    <input
                      type="email"
                      value={emailDraft}
                      onChange={(event) => setEmailDraft(event.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none"
                      required
                    />
                  </label>
                  <button className="w-full rounded-xl bg-slate-800 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-200 transition-all hover:bg-slate-700">
                    Update Contact
                  </button>
                </form>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <Shield size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                  <p className="text-xs leading-5 text-slate-500">
                    Payment details are shown as a local demo. Connect a payment provider before using this with real customer cards.
                  </p>
                </div>
              </section>
            )}
          </div>

          {hasCompletedPayment && (
            <section className="rounded-3xl border border-slate-800 bg-slate-950/50">
              <div className="border-b border-slate-800 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                    <History size={19} className="text-blue-400" />
                    Billing History
                  </h3>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
                      <Search size={16} className="text-slate-500" />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                        placeholder="Search invoice"
                      />
                    </label>
                    <select
                      value={invoiceFilter}
                      onChange={(event) => setInvoiceFilter(event.target.value)}
                      className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-white outline-none focus:border-blue-500"
                    >
                      <option>All</option>
                      <option>Due</option>
                      <option>Paid</option>
                      <option>Failed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-800">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="grid gap-5 p-6 transition-colors hover:bg-slate-900/40 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-slate-500">
                        <FileText size={19} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-bold text-white">{invoice.id}</h4>
                          <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${statusStyles[invoice.status]}`}>
                            {invoice.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">{invoice.service}</p>
                        <p className="mt-2 text-xs text-slate-600">Issued {invoice.date} - Due {invoice.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                      <p className="mr-2 text-lg font-black text-white">{currency.format(invoice.amount)}</p>
                      {invoice.status !== 'Paid' && (
                        <button
                          type="button"
                          onClick={() => openCheckout(invoice)}
                          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-blue-700"
                        >
                          <Wallet size={15} />
                          Pay Now
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => downloadInvoice(invoice)}
                        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:border-slate-600 hover:text-white"
                      >
                        <Download size={15} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredInvoices.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <Receipt size={34} className="text-slate-600" />
                  <h4 className="mt-4 font-bold text-white">No invoices found</h4>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">Try a different search term or invoice status filter.</p>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} />
                  Need help with an invoice?
                </div>
                <button
                  type="button"
                  onClick={() => showNotice('Billing support has been notified.')}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300 transition-all hover:border-blue-500/40 hover:text-white"
                >
                  <RefreshCw size={14} />
                  Contact Billing
                </button>
              </div>
            </section>
          )}
        </div>

        {hasCompletedPayment && (
          <section className="rounded-3xl border border-slate-800 bg-slate-950/50">
            <div className="border-b border-slate-800 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white">
                <Receipt size={19} className="text-blue-400" />
                Payment Transactions
              </h3>
            </div>
            <div className="divide-y divide-slate-800">
              {paymentRecords.map((record) => (
                <div key={record.id} className="grid gap-4 p-6 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
                  <div>
                    <p className="font-bold text-white">{record.id}</p>
                    <p className="mt-1 text-xs text-slate-500">Invoice {record.invoiceId} - {record.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-300">{record.gateway}</p>
                  <p className="text-sm font-black text-white">{currency.format(record.amount)}</p>
                  <span className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PortalLayout>
  );
};

export default BillingPortal;
