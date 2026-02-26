import { useState } from "react"
import { useAuth } from "../providers/auth-provider"
import {
    User, Shield, CreditCard, FileText,
    Camera, Mail, Phone, MapPin, Calendar,
    Lock, Key, Smartphone, Eye, EyeOff,
    Crown, Zap, Check, Star,
    ChevronRight, AlertCircle, Globe, BookOpen, ExternalLink
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = "basic" | "security" | "subscription" | "terms"

// ─── Reusable card wrapper ─────────────────────────────────────────────────────
function SectionCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-6 md:p-8 transition-all duration-300">
            {children}
        </div>
    )
}

// ─── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, subtitle, color }: {
    icon: React.ElementType; title: string; subtitle: string; color: string
}) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${color} shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    )
}

// ─── Input Field ──────────────────────────────────────────────────────────────
function InputField({ label, value, placeholder, icon: Icon, type = "text", disabled = false }:
    { label: string; value?: string; placeholder?: string; icon?: React.ElementType; type?: string; disabled?: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <input
                    type={type}
                    defaultValue={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2.5 rounded-xl border border-border bg-muted/30
                        text-sm text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
                />
            </div>
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — Basic Information
// ═══════════════════════════════════════════════════════════════════════════════
function BasicInformation({ email, role }: { email: string; role: string }) {
    const initials = email.slice(0, 2).toUpperCase()

    return (
        <SectionCard>
            <SectionHeader
                icon={User}
                title="Basic Information"
                subtitle="Manage your personal details and public profile"
                color="bg-linear-to-br from-blue-500 to-blue-600"
            />

            {/* Avatar row */}
            <div className="flex items-center gap-6 mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-pink-500
                        flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {initials}
                    </div>
                    <button className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100
                        transition-opacity flex items-center justify-center cursor-pointer">
                        <Camera className="w-5 h-5 text-white" />
                    </button>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-base truncate">{email}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold
                            ${role === "ADMIN"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                            }`}>
                            <Star className="w-3 h-3" />
                            {role}
                        </span>
                        <span className="text-xs text-muted-foreground">· Active account</span>
                    </div>
                </div>
                <button className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg border border-border
                    hover:bg-muted/50 text-foreground transition-colors duration-200 hidden sm:block">
                    Change Photo
                </button>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <InputField label="Full Name" placeholder="Your full name" icon={User} />
                <InputField label="Email Address" value={email} icon={Mail} type="email" disabled />
                <InputField label="Phone Number" placeholder="+91 00000 00000" icon={Phone} type="tel" />
                <InputField label="Location" placeholder="City, Country" icon={MapPin} />
                <InputField label="Date of Birth" placeholder="DD / MM / YYYY" icon={Calendar} type="date" />
                <InputField label="Website / Portfolio" placeholder="https://yoursite.com" icon={Globe} />
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-500 to-blue-600
                    text-white text-sm font-semibold shadow-sm hover:shadow-md
                    hover:from-blue-600 hover:to-blue-700 transition-all duration-200 active:scale-95">
                    Save Changes
                </button>
            </div>
        </SectionCard>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — Account Security
// ═══════════════════════════════════════════════════════════════════════════════
function SecurityItem({ icon: Icon, title, desc, badge, color, action }: {
    icon: React.ElementType; title: string; desc: string
    badge?: string; color: string; action: string
}) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/20
            hover:bg-muted/40 transition-all duration-200 group cursor-pointer">
            <div className={`p-2.5 rounded-xl ${color} shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    {badge && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700
                            dark:bg-green-900/40 dark:text-green-400">
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{desc}</p>
            </div>
            <span className="text-xs text-blue-500 font-medium shrink-0 group-hover:underline">{action}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
    )
}

function AccountSecurity() {
    const [showPass, setShowPass] = useState(false)

    return (
        <SectionCard>
            <SectionHeader
                icon={Shield}
                title="Account Security"
                subtitle="Keep your account safe with strong security settings"
                color="bg-linear-to-br from-emerald-500 to-emerald-600"
            />

            {/* Security score */}
            <div className="p-4 rounded-xl bg-linear-to-r from-emerald-500/10 to-teal-500/10
                border border-emerald-500/20 mb-6 flex items-center gap-4">
                <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor"
                            strokeWidth="4" className="text-border" />
                        <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor"
                            strokeWidth="4" strokeDasharray={`${2 * Math.PI * 24 * 0.72} ${2 * Math.PI * 24}`}
                            className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400">72%</span>
                </div>
                <div>
                    <p className="text-sm font-semibold text-foreground">Security Score: Good</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Enable 2FA to reach Excellent</p>
                </div>
            </div>

            {/* Change password */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3">Change Password</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type={showPass ? "text" : "password"} placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-muted/30
                                text-sm text-foreground placeholder:text-muted-foreground
                                focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200" />
                            <button onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <InputField label="New Password" placeholder="Min 8 characters" icon={Key} type="password" />
                </div>
            </div>

            {/* Security options */}
            <div className="flex flex-col gap-3 mb-6">
                <SecurityItem icon={Smartphone} title="Two-Factor Authentication" desc="Add an extra layer of login protection"
                    color="bg-linear-to-br from-purple-500 to-purple-600" action="Enable" />
                <SecurityItem icon={Globe} title="Active Sessions" desc="Logged in from 2 devices · Last: Chrome, Windows"
                    badge="Active" color="bg-linear-to-br from-blue-500 to-blue-600" action="Manage" />
            </div>

            <div className="flex justify-end">
                <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600
                    text-white text-sm font-semibold shadow-sm hover:shadow-md
                    hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 active:scale-95">
                    Update Password
                </button>
            </div>
        </SectionCard>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — Subscription
// ═══════════════════════════════════════════════════════════════════════════════
const plans = [
    {
        id: "free", name: "Free", price: "₹0", period: "/mo",
        icon: BookOpen, color: "from-slate-400 to-slate-500",
        features: ["5 Courses", "Basic Support", "1 GB Storage"],
        current: false
    },
    {
        id: "pro", name: "Pro", price: "₹499", period: "/mo",
        icon: Zap, color: "from-blue-500 to-violet-600",
        features: ["Unlimited Courses", "Priority Support", "50 GB Storage", "Certificates"],
        current: true
    },
    {
        id: "enterprise", name: "Enterprise", price: "₹1,499", period: "/mo",
        icon: Crown, color: "from-amber-500 to-orange-600",
        features: ["Everything in Pro", "Dedicated Manager", "Unlimited Storage", "API Access"],
        current: false
    },
]

function SubscriptionPlans() {
    const [selected, setSelected] = useState("pro")

    return (
        <SectionCard>
            <SectionHeader
                icon={CreditCard}
                title="Subscription"
                subtitle="Manage your plan and billing preferences"
                color="bg-linear-to-br from-violet-500 to-violet-600"
            />

            {/* Current plan banner */}
            <div className="p-4 rounded-xl bg-linear-to-r from-blue-500/10 to-violet-500/10
                border border-blue-500/20 mb-6 flex flex-wrap items-center gap-4">
                <Zap className="w-5 h-5 text-blue-500 shrink-0" />
                <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">You're on the <span className="text-blue-500">Pro</span> plan</p>
                    <p className="text-xs text-muted-foreground">Renews on March 1, 2026 · ₹499/month</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    ACTIVE
                </span>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {plans.map((plan) => {
                    const PlanIcon = plan.icon
                    const isSelected = selected === plan.id
                    return (
                        <button key={plan.id} onClick={() => setSelected(plan.id)}
                            className={`relative text-left p-5 rounded-xl border-2 transition-all duration-200
                                ${isSelected
                                    ? "border-blue-500 bg-blue-500/5 shadow-md"
                                    : "border-border bg-muted/20 hover:border-blue-500/50 hover:bg-muted/40"
                                }`}>
                            {plan.current && (
                                <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full
                                    text-[10px] font-bold bg-blue-500 text-white">CURRENT</span>
                            )}
                            <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${plan.color}
                                flex items-center justify-center mb-3 shadow-sm`}>
                                <PlanIcon className="w-4 h-4 text-white" />
                            </div>
                            <p className="font-bold text-foreground">{plan.name}</p>
                            <p className="text-lg font-extrabold text-foreground mt-1">
                                {plan.price}<span className="text-xs font-normal text-muted-foreground">{plan.period}</span>
                            </p>
                            <ul className="mt-3 space-y-1.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {isSelected && (
                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500
                                    flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
                <button className="text-sm text-destructive hover:underline font-medium">Cancel Subscription</button>
                <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-violet-500 to-blue-600
                    text-white text-sm font-semibold shadow-sm hover:shadow-md
                    hover:from-violet-600 hover:to-blue-700 transition-all duration-200 active:scale-95">
                    Upgrade Plan
                </button>
            </div>
        </SectionCard>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — Terms & Conditions
// ═══════════════════════════════════════════════════════════════════════════════
const docs = [
    { icon: FileText, title: "Terms of Service", desc: "Last updated January 15, 2026", link: "#" },
    { icon: Shield, title: "Privacy Policy", desc: "How we collect, use, and protect your data", link: "#" },
    { icon: Globe, title: "Cookie Policy", desc: "Our use of cookies and tracking technologies", link: "#" },
    { icon: AlertCircle, title: "Acceptable Use Policy", desc: "Rules that govern use of our platform", link: "#" },
]

function TermsAndConditions() {
    const [agreed, setAgreed] = useState(true)

    return (
        <SectionCard>
            <SectionHeader
                icon={FileText}
                title="Terms & Conditions"
                subtitle="Review our policies and your legal agreements"
                color="bg-linear-to-br from-rose-500 to-rose-600"
            />

            {/* Agreement status */}
            <div className={`p-4 rounded-xl mb-6 flex items-center gap-4 border
                ${agreed
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-amber-500/10 border-amber-500/20"
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${agreed ? "bg-green-500" : "bg-amber-500"}`}>
                    {agreed ? <Check className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                        {agreed ? "You've agreed to all terms" : "Action required"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {agreed ? "Agreement recorded on Feb 1, 2026" : "Please review and accept the updated terms"}
                    </p>
                </div>
            </div>

            {/* Document links */}
            <div className="flex flex-col gap-3 mb-6">
                {docs.map(({ icon: Icon, title, desc, link }) => (
                    <a key={title} href={link}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border
                            bg-muted/20 hover:bg-muted/40 hover:border-border/80 transition-all duration-200 group">
                        <div className="p-2.5 rounded-xl bg-muted shrink-0">
                            <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{desc}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors shrink-0" />
                    </a>
                ))}
            </div>

            {/* Checkbox acceptance */}
            <label className="flex items-start gap-3 p-4 rounded-xl border border-border
                bg-muted/20 cursor-pointer hover:bg-muted/40 transition-all duration-200 mb-6">
                <div className={`w-5 h-5 rounded-md border-2 shrink-0 mt-0.5 flex items-center justify-center
                    transition-all duration-200
                    ${agreed ? "bg-blue-500 border-blue-500" : "border-border bg-card"}`}
                    onClick={() => setAgreed(!agreed)}>
                    {agreed && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                    I have read and agree to the{" "}
                    <a href="#" className="text-blue-500 hover:underline font-medium">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-500 hover:underline font-medium">Privacy Policy</a>.
                    I understand how my data is processed.
                </span>
            </label>

            <div className="flex flex-wrap gap-3 justify-between items-center">
                <p className="text-xs text-muted-foreground">Agreement ID: TOS-2026-38472</p>
                <button className="px-6 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-rose-600
                    text-white text-sm font-semibold shadow-sm hover:shadow-md
                    hover:from-rose-600 hover:to-rose-700 transition-all duration-200 active:scale-95">
                    Confirm Agreement
                </button>
            </div>
        </SectionCard>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAV TABS
// ═══════════════════════════════════════════════════════════════════════════════
const tabs: { id: Section; label: string; icon: React.ElementType; color: string }[] = [
    { id: "basic", label: "Basic Info", icon: User, color: "text-blue-500" },
    { id: "security", label: "Security", icon: Shield, color: "text-emerald-500" },
    { id: "subscription", label: "Subscription", icon: CreditCard, color: "text-violet-500" },
    { id: "terms", label: "Terms", icon: FileText, color: "text-rose-500" },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function Profile() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<Section>("basic")

    const email = user?.email ?? "user@example.com"
    const role = user?.role ?? "USER"

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 border-amber-300 rounded-2xl mx-auto w-full">
            {/* Tab nav */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted/40 border border-border overflow-x-auto">
                {tabs.map(({ id, label, icon: Icon, color }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                            whitespace-nowrap transition-all duration-200 flex-1 justify-center
                            ${activeTab === id
                                ? "bg-card text-foreground shadow-sm border border-border"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            }`}
                    >
                        <Icon className={`w-4 h-4 ${activeTab === id ? color : ""}`} />
                        <span className="hidden sm:inline">{label}</span>
                    </button>
                ))}
            </div>

            {/* Active section */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === "basic" && <BasicInformation email={email} role={role} />}
                {activeTab === "security" && <AccountSecurity />}
                {activeTab === "subscription" && <SubscriptionPlans />}
                {activeTab === "terms" && <TermsAndConditions />}
            </div>
        </div>
    )
}
