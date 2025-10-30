import { useMemo, useState } from "react"; import { Card } from "@/components/ui/card"; import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const models = [ { name: "AI Powered Nostro Recon", domain: "C&I - Customer and Operations Technology", platform: "Sirius", status: "Live", maturity: 87, updated: "15-Jun-2025", description: "Uses description text to identify counterparty, reference ID, amount, etc., to reconcile data." }, { name: "Invoice Discounting Reconciliation", domain: "C&I - Customer and Operations Technology", platform: "Sirius", status: "Live", maturity: 82, updated: "10-May-2025", description: "OCRs receivables and payables PDFs to identify funding asks, risks, and any overexposure to sellers." }, { name: "Signature Matching", domain: "C&I - Customer and Operations Technology", platform: "Sirius", status: "Live", maturity: 80, updated: "03-Jun-2025", description: "Verifies customer requests against signatures stored in the ISV platform." }, { name: "OpsMate – Onboarding Assistant", domain: "C&I - Customer and Operations Technology", platform: "Sirius", status: "Development", maturity: 68, updated: "20-Sep-2025", description: "Agentic co-pilot for onboarding case management that suggests next-best actions." } ];

const pillars = ["Strategy", "Product", "Governance", "Engineering", "Data", "Operating", "Culture"];

function RadarThumb({ score }) { const data = pillars.map((p) => ({ dim: p, val: score })); return ( <div className="w-16 h-16"> <ResponsiveContainer width="100%" height="100%"> <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}> <PolarGrid radialLines={false} stroke="#e5e7eb" /> <PolarAngleAxis dataKey="dim" tick={false} axisLine={false} /> <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} /> <Radar name="Maturity" dataKey="val" stroke="#401664" fill="#401664" fillOpacity={0.45} /> </RadarChart> </ResponsiveContainer> <div className="-mt-10 text-[10px] text-center font-semibold text-gray-800">{score}</div> </div> ); }

export default function PreviewMarketplaceListView() { const [domain, setDomain] = useState("All"); const [platform, setPlatform] = useState("All"); const [status, setStatus] = useState("All");

const options = useMemo(() => { const d = Array.from(new Set(models.map((m) => m.domain))); const p = Array.from(new Set(models.map((m) => m.platform))); const s = Array.from(new Set(models.map((m) => m.status))); return { d, p, s }; }, []);

const filtered = useMemo(() => { return models.filter( (m) => (domain === "All" || m.domain === domain) && (platform === "All" || m.platform === platform) && (status === "All" || m.status === status) ); }, [domain, platform, status]);

const resetFilters = () => { setDomain("All"); setPlatform("All"); setStatus("All"); };

return ( <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-md"> <h2 className="text-lg font-semibold text-purple-900 mb-3">NatWest AI MarketPlace</h2>

{/* Filter Toolbar */}
  <div className="mb-3 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
    <div>
      <label className="block text-xs text-gray-600 mb-1">Domain</label>
      <select value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
        <option>All</option>
        {options.d.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-xs text-gray-600 mb-1">Platform</label>
      <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
        <option>All</option>
        {options.p.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-xs text-gray-600 mb-1">Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm">
        <option>All</option>
        {options.s.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>
    </div>
    <div className="flex gap-2">
      <button onClick={resetFilters} className="border border-purple-200 text-purple-900 text-sm rounded-md px-3 py-1 hover:bg-purple-50">Clear</button>
      <div className="text-xs text-gray-600 self-center">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
    </div>
  </div>

  <table className="w-full text-sm border-collapse">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-3 py-2 text-left">Maturity</th>
        <th className="px-3 py-2 text-left">Model / Domain</th>
        <th className="px-3 py-2 text-left">Status</th>
        <th className="px-3 py-2 text-left">Description</th>
        <th className="px-3 py-2 text-left">Last Updated</th>
      </tr>
    </thead>
    <tbody>
      {filtered.map((m, i) => (
        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 align-top">
          <td className="px-3 py-2"><RadarThumb score={m.maturity} /></td>
          <td className="px-3 py-2">
            <div className="font-medium text-purple-900">{m.name}</div>
            <div className="text-xs text-gray-600">{m.domain}</div>
            <div className="text-[10px] text-gray-500">Platform: {m.platform}</div>
          </td>
          <td className="px-3 py-2">{m.status}</td>
          <td className="px-3 py-2 max-w-[420px]"><span className="block truncate" title={m.description}>{m.description}</span></td>
          <td className="px-3 py-2 whitespace-nowrap">{m.updated}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

); }
