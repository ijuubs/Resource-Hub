import React, { useState } from 'react';
import {
  Code,
  Copy,
  CheckCircle2,
  FileCode,
  Clock,
  Key,
  Database,
  Search,
  RefreshCw,
  Sliders,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';

interface DevToolsRunnerProps {
  toolType:
    | 'json-yaml-converter'
    | 'sql-formatter-tool'
    | 'cron-parser-tool'
    | 'unix-timestamp-tool'
    | 'jwt-decoder-tool'
    | 'base64-hash-uuid-tool'
    | 'regex-tester-tool'
    | 'diff-checker-tool'
    | 'text-case-converter';
  initialConfig?: Record<string, any>;
}

export const DevToolsRunner: React.FC<DevToolsRunnerProps> = ({ toolType, initialConfig }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. JSON to YAML / CSV Converter State ---
  const [jsonInput, setJsonInput] = useState<string>(
    initialConfig?.json ||
      JSON.stringify(
        [
          { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Engineering Lead', active: true },
          { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Product Manager', active: false },
          { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'UX Designer', active: true }
        ],
        null,
        2
      )
  );

  // Simple JSON to YAML/CSV Converters
  const getYamlOutput = (jsonStr: string) => {
    try {
      const obj = JSON.parse(jsonStr);
      const toYaml = (val: any, indent = 0): string => {
        const space = ' '.repeat(indent);
        if (Array.isArray(val)) {
          return val.map((item) => `${space}- ${toYaml(item, indent + 2).trim()}`).join('\n');
        } else if (typeof val === 'object' && val !== null) {
          return Object.entries(val)
            .map(([k, v]) => {
              if (typeof v === 'object' && v !== null) {
                return `${space}${k}:\n${toYaml(v, indent + 2)}`;
              }
              return `${space}${k}: ${JSON.stringify(v)}`;
            })
            .join('\n');
        }
        return String(val);
      };
      return toYaml(obj);
    } catch (e: any) {
      return `// Invalid JSON: ${e.message}`;
    }
  };

  const getCsvOutput = (jsonStr: string) => {
    try {
      const obj = JSON.parse(jsonStr);
      const arr = Array.isArray(obj) ? obj : [obj];
      if (arr.length === 0) return '';
      const headers = Object.keys(arr[0]);
      const rows = arr.map((item) =>
        headers.map((h) => JSON.stringify(item[h] ?? '')).join(',')
      );
      return [headers.join(','), ...rows].join('\n');
    } catch (e: any) {
      return `// Invalid JSON: ${e.message}`;
    }
  };

  // --- 2. SQL Query Beautifier State ---
  const [sqlInput, setSqlInput] = useState<string>(
    initialConfig?.sql ||
      `select u.id, u.name, count(o.id) as total_orders, sum(o.amount) as revenue from users u left join orders o on u.id = o.user_id where u.status = 'active' and o.created_at >= '2026-01-01' group by u.id, u.name having sum(o.amount) > 500 order by revenue desc limit 50;`
  );

  const getFormattedSql = (raw: string) => {
    let formatted = raw
      .replace(/\s+/g, ' ')
      .replace(/\s*([,()])\s*/g, '$1 ')
      .replace(/\b(SELECT|FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|GROUP BY|HAVING|ORDER BY|LIMIT|OFFSET|AND|OR|ON|VALUES|INSERT INTO|UPDATE|SET|DELETE FROM)\b/gi, (match) => `\n${match.toUpperCase()}`)
      .trim();
    return formatted;
  };

  // --- 3. Cron Expression Parser State ---
  const [cronInput, setCronInput] = useState<string>(initialConfig?.cron || '*/15 9-17 * * 1-5');

  const parseCron = (expression: string) => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { valid: false, text: 'Cron expression must have exactly 5 fields (minute, hour, day of month, month, day of week)' };
    }
    const [min, hr, dom, mon, dow] = parts;
    let desc = 'Runs ';

    if (min === '*') desc += 'every minute ';
    else if (min.startsWith('*/')) desc += `every ${min.replace('*/', '')} minutes `;
    else desc += `at minute ${min} `;

    if (hr === '*') desc += 'of every hour ';
    else if (hr.includes('-')) desc += `between hours ${hr} `;
    else desc += `at hour ${hr} `;

    if (dow === '1-5') desc += 'on weekdays (Monday to Friday)';
    else if (dow === '*') desc += 'every day of the week';
    else desc += `on day-of-week ${dow}`;

    return { valid: true, text: desc };
  };

  // --- 4. Unix Timestamp Converter State ---
  const [timestampInput, setTimestampInput] = useState<number>(Math.floor(Date.now() / 1000));
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 16));

  const parsedDate = new Date(timestampInput * 1000);

  // --- 5. JWT Decoder State ---
  const [jwtInput, setJwtInput] = useState<string>(
    initialConfig?.jwt ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIFNtaXRoIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4MDAwMDAwMDB9.Signature'
  );

  const decodeJwt = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('JWT must contain 3 dot-separated parts');
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      return { header, payload, valid: true };
    } catch (e: any) {
      return { header: null, payload: null, valid: false, error: e.message };
    }
  };

  // --- 6. Base64 / Hash / UUID Generator State ---
  const [b64Input, setB64Input] = useState<string>('Hello ResourceHub Developer!');
  const [uuidList, setUuidList] = useState<string[]>([
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '8e3b12a4-11ef-4299-b141-9a7061d3e800'
  ]);
  const [generatedPassword, setGeneratedPassword] = useState<string>('kX9#mP2$vL5!qR8');

  const generateUuid = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuidList((prev) => [newUuid, ...prev.slice(0, 4)]);
  };

  const generatePass = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let pass = '';
    for (let i = 0; i < 16; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(pass);
  };

  // --- 7. RegEx Tester State ---
  const [regexPattern, setRegexPattern] = useState<string>(initialConfig?.pattern || '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [regexTestText, setRegexTestText] = useState<string>(
    'Send inquiries to contact@acme.com or sales@nexuscloud.io. For support visit https://help.acme.org.'
  );

  const getRegexMatches = () => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = Array.from(regexTestText.matchAll(re));
      return { matches: matches.map((m) => m[0]), valid: true };
    } catch (e: any) {
      return { matches: [], valid: false, error: e.message };
    }
  };

  // --- 8. Diff Checker State ---
  const [diffOriginal, setDiffOriginal] = useState<string>(
    `function calculateTotal(price, tax) {\n  return price + (price * tax);\n}`
  );
  const [diffModified, setDiffModified] = useState<string>(
    `function calculateTotal(price, taxRate = 0.08, discount = 0) {\n  const discounted = Math.max(0, price - discount);\n  return discounted + (discounted * taxRate);\n}`
  );

  // --- 9. Text Case Converter State ---
  const [caseInput, setCaseInput] = useState<string>('resource hub growth platform 2026');

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Dynamic Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white capitalize">
              {toolType.replace(/-/g, ' ')}
            </h3>
            <p className="text-xs text-zinc-400">Browser-Based High Performance Developer Utility</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* --- 1. JSON TO YAML / CSV --- */}
        {toolType === 'json-yaml-converter' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">JSON Input</label>
              <textarea
                rows={14}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-emerald-400 rounded-xl p-3 text-xs font-mono"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-300">Converted YAML Output</span>
                  <button
                    onClick={() => handleCopy(getYamlOutput(jsonInput))}
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy YAML
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={6}
                  value={getYamlOutput(jsonInput)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-amber-300 rounded-xl p-3 text-xs font-mono"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-300">Converted CSV Output</span>
                  <button
                    onClick={() => handleCopy(getCsvOutput(jsonInput))}
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy CSV
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={6}
                  value={getCsvOutput(jsonInput)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-sky-300 rounded-xl p-3 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- 2. SQL QUERY BEAUTIFIER --- */}
        {toolType === 'sql-formatter-tool' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-300">Raw SQL Query</label>
                <textarea
                  rows={10}
                  value={sqlInput}
                  onChange={(e) => setSqlInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3 text-xs font-mono"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-zinc-300">Formatted SQL Query</label>
                  <button
                    onClick={() => handleCopy(getFormattedSql(sqlInput))}
                    className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Formatted SQL
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={10}
                  value={getFormattedSql(sqlInput)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-sky-400 rounded-xl p-3 text-xs font-mono leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- 3. CRON EXPRESSION PARSER --- */}
        {toolType === 'cron-parser-tool' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">Enter Cron Schedule Expression</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={cronInput}
                  onChange={(e) => setCronInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono rounded-xl px-4 py-2.5 text-sm"
                  placeholder="* * * * *"
                />
              </div>
            </div>

            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Human-Readable Schedule</span>
              <p className="text-lg font-bold text-white">
                {parseCron(cronInput).text}
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono text-zinc-400">
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <span className="block text-white font-bold">{cronInput.split(' ')[0] || '*'}</span>
                <span>Minute</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <span className="block text-white font-bold">{cronInput.split(' ')[1] || '*'}</span>
                <span>Hour</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <span className="block text-white font-bold">{cronInput.split(' ')[2] || '*'}</span>
                <span>Day of Mo</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <span className="block text-white font-bold">{cronInput.split(' ')[3] || '*'}</span>
                <span>Month</span>
              </div>
              <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                <span className="block text-white font-bold">{cronInput.split(' ')[4] || '*'}</span>
                <span>Day of Wk</span>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. UNIX TIMESTAMP CONVERTER --- */}
        {toolType === 'unix-timestamp-tool' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-4">
              <label className="block text-xs font-semibold text-zinc-300">Unix Timestamp (Seconds)</label>
              <input
                type="number"
                value={timestampInput}
                onChange={(e) => setTimestampInput(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 text-white font-mono rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={() => setTimestampInput(Math.floor(Date.now() / 1000))}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5" /> Reset to Current Epoch Time
              </button>
            </div>

            <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Parsed Date Formats</span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-zinc-500 block">UTC Standard ISO String:</span>
                  <span className="font-mono text-white">{parsedDate.toUTCString()}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Local ISO Date String:</span>
                  <span className="font-mono text-amber-300">{parsedDate.toString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. JWT DECODER --- */}
        {toolType === 'jwt-decoder-tool' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">Encoded JWT Token Input</label>
              <textarea
                rows={4}
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-amber-300 font-mono rounded-xl p-3 text-xs"
              />
            </div>

            {decodeJwt(jwtInput).valid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-rose-400 uppercase">Header</span>
                  <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-rose-300 overflow-x-auto">
                    {JSON.stringify(decodeJwt(jwtInput).header, null, 2)}
                  </pre>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-purple-400 uppercase">Payload (Claims)</span>
                  <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono text-purple-300 overflow-x-auto">
                    {JSON.stringify(decodeJwt(jwtInput).payload, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-rose-950/40 border border-rose-800 p-4 rounded-xl text-xs text-rose-300">
                Invalid JWT: {decodeJwt(jwtInput).error}
              </div>
            )}
          </div>
        )}

        {/* --- 6. BASE64 / HASH / UUID --- */}
        {toolType === 'base64-hash-uuid-tool' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold">Base64 Encoder / Decoder</h4>
              <textarea
                rows={3}
                value={b64Input}
                onChange={(e) => setB64Input(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg p-2.5 text-xs font-mono"
              />
              <div className="space-y-2">
                <span className="text-[11px] text-zinc-400 block">Base64 Output:</span>
                <div className="bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 text-xs font-mono text-emerald-300 break-all flex justify-between items-center">
                  <span>{btoa(b64Input)}</span>
                  <button onClick={() => handleCopy(btoa(b64Input))} className="text-zinc-400 hover:text-white">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-mono uppercase text-indigo-400 font-semibold">UUID & Secure Password Generator</h4>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-300 font-mono">{uuidList[0]}</span>
                <button
                  onClick={generateUuid}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-semibold"
                >
                  New UUID v4
                </button>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                <span className="text-xs font-mono text-amber-300">{generatedPassword}</span>
                <button
                  onClick={generatePass}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg font-semibold"
                >
                  Gen 16-Char Pass
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 7. REGEX TESTER --- */}
        {toolType === 'regex-tester-tool' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-3">
                <label className="block text-xs font-semibold text-zinc-300">RegEx Pattern</label>
                <input
                  type="text"
                  value={regexPattern}
                  onChange={(e) => setRegexPattern(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300">Flags</label>
                <input
                  type="text"
                  value={regexFlags}
                  onChange={(e) => setRegexFlags(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-amber-300 font-mono rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-300">Test String Input</label>
                <textarea
                  rows={6}
                  value={regexTestText}
                  onChange={(e) => setRegexTestText(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-zinc-300">Matches Found ({getRegexMatches().matches.length})</label>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 h-[140px] overflow-y-auto space-y-1 text-xs font-mono">
                  {getRegexMatches().matches.map((m, idx) => (
                    <div key={idx} className="bg-emerald-950/60 text-emerald-300 px-2 py-1 rounded border border-emerald-800/60">
                      Match {idx + 1}: {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 8. DIFF CHECKER --- */}
        {toolType === 'diff-checker-tool' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">Original Text</label>
              <textarea
                rows={10}
                value={diffOriginal}
                onChange={(e) => setDiffOriginal(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono rounded-xl p-3 text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">Modified Text</label>
              <textarea
                rows={10}
                value={diffModified}
                onChange={(e) => setDiffModified(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-emerald-300 font-mono rounded-xl p-3 text-xs"
              />
            </div>
          </div>
        )}

        {/* --- 9. TEXT CASE CONVERTER --- */}
        {toolType === 'text-case-converter' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-300">Input String</label>
              <input
                type="text"
                value={caseInput}
                onChange={(e) => setCaseInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono rounded-xl px-4 py-2.5 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'camelCase', val: caseInput.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => +match === 0 ? "" : index === 0 ? match.toLowerCase() : match.toUpperCase()) },
                { label: 'snake_case', val: caseInput.toLowerCase().replace(/\s+/g, '_') },
                { label: 'kebab-case', val: caseInput.toLowerCase().replace(/\s+/g, '-') },
                { label: 'UPPERCASE', val: caseInput.toUpperCase() },
                { label: 'lowercase', val: caseInput.toLowerCase() },
                { label: 'Title Case', val: caseInput.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) }
              ].map((item, idx) => (
                <div key={idx} className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-mono">{item.label}</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-emerald-300 truncate pr-2">{item.val}</span>
                    <button onClick={() => handleCopy(item.val)} className="text-zinc-400 hover:text-white">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
