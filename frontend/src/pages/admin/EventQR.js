import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../../components/ui/button';
import { Printer, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '../../components/ui/sonner';
import AdminLayout from '../../components/AdminLayout';
import { IMG } from '../../assets/images';

// Default site URL — used for the QR target. Edit if hibiscusplus.co.uk changes.
const SITE_URL = 'https://hibiscusplus.co.uk';
const DEFAULT_PATH = '/launch-list';

const PRESETS = [
  { label: 'Westminster Park · 80 Years', path: '/launch-list', sub: "Today's tasting — newsletter + review" },
  { label: 'Tasting Feedback', path: '/feedback', sub: 'Chester / general feedback page' },
  { label: 'Shop', path: '/shop', sub: 'Product catalogue + Stripe checkout' },
];

export default function EventQR() {
  const [path, setPath] = useState(DEFAULT_PATH);
  const url = SITE_URL + path;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('URL copied');
    } catch {
      toast.error('Copy failed — please copy manually');
    }
  };

  const handlePrint = () => window.print();

  const downloadPNG = () => {
    const svg = document.querySelector('#hp-qr-svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 1024;
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFBF5';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement('a');
      a.download = `hibiscusplus-qr-${path.replace(/\//g, '-') || 'home'}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(xml)));
  };

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <style>{`
        @media print {
          body { background: #FFFBF5 !important; }
          [data-testid="admin-sidebar"], [data-testid="admin-main"] > div > div:not([data-testid="qr-print-area"]) { display: none !important; }
          [data-testid="qr-print-area"] { padding: 40px !important; box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div data-testid="event-qr-page">
        {/* Controls — hidden when printing */}
        <div className="mb-8 print:hidden">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--hp-burgundy)] mb-2">QR Code</p>
          <h1 className="text-4xl font-light leading-tight mb-2">Event QR for visitors to scan</h1>
          <p className="text-sm text-[var(--hp-muted)] font-light mb-6">Pick a destination, print or download, place at the stall.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {PRESETS.map((p) => (
              <button
                key={p.path}
                onClick={() => setPath(p.path)}
                className={`text-left p-4 border transition-all ${
                  path === p.path
                    ? 'bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] border-[var(--hp-burgundy)]'
                    : 'bg-[var(--hp-ivory)] text-[var(--hp-ink-soft)] border-[var(--hp-line)] hover:border-[var(--hp-burgundy)]'
                }`}
                data-testid={`qr-preset-${p.path.replace(/\//g, '-')}`}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] mb-1">{p.label}</p>
                <p className={`text-[10px] ${path===p.path?'text-[var(--hp-cream)]/80':'text-[var(--hp-muted)]'}`}>{p.sub}</p>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <code className="text-sm bg-[var(--hp-ivory)] border border-[var(--hp-line)] px-3 py-2 flex-1 truncate" data-testid="qr-url-display">{url}</code>
            <Button onClick={copy} variant="outline" className="border-[var(--hp-line)] text-[var(--hp-ink-soft)] rounded-none text-[11px] uppercase tracking-[0.18em] px-4 py-2 h-auto" data-testid="qr-copy-btn">
              <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
            </Button>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[var(--hp-line)] text-[var(--hp-ink-soft)] rounded-none text-[11px] uppercase tracking-[0.18em] px-4 py-2 h-auto" data-testid="qr-open-btn">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Open
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            <Button
              onClick={handlePrint}
              className="bg-[var(--hp-burgundy)] text-[var(--hp-ivory)] hover:bg-[var(--hp-wine)] rounded-none text-[11px] uppercase tracking-[0.2em] px-5 py-3 h-auto"
              data-testid="qr-print-btn"
            >
              <Printer className="h-4 w-4 mr-2" /> Print A4
            </Button>
            <Button
              onClick={downloadPNG}
              variant="outline"
              className="border-[var(--hp-burgundy)]/40 text-[var(--hp-burgundy)] hover:bg-[var(--hp-burgundy)]/5 rounded-none text-[11px] uppercase tracking-[0.2em] px-5 py-3 h-auto"
              data-testid="qr-download-btn"
            >
              Download PNG
            </Button>
          </div>
        </div>

        {/* Print-ready card */}
        <div className="bg-[var(--hp-ivory)] border border-[var(--hp-line)] p-12 md:p-16 max-w-2xl mx-auto text-center" data-testid="qr-print-area">
          <img src={IMG.logo} alt="HibiscusPlus" className="h-14 w-auto mx-auto mb-8" />
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--hp-burgundy)] mb-3">Westminster Park · 80 Years</p>
          <h2 className="text-3xl md:text-4xl font-light leading-tight mb-3">
            Loved the tasting?
          </h2>
          <p className="text-base text-[var(--hp-ink-soft)] font-light mb-8 max-w-md mx-auto">
            Scan to join the launch list and share your tea-sampling review.
          </p>

          <div className="bg-white p-6 inline-block border border-[var(--hp-line-soft)] mb-6" data-testid="qr-svg-wrapper">
            <QRCodeSVG
              id="hp-qr-svg"
              value={url}
              size={280}
              bgColor="#FFFBF5"
              fgColor="#2A1418"
              level="H"
              includeMargin={false}
              imageSettings={{ src: IMG.logo, height: 50, width: 50, excavate: true }}
            />
          </div>

          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--hp-burgundy)] mb-1">hibiscusplus.co.uk{path}</p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--hp-muted)] italic">
            Boldly Spiced &middot; Beautifully Balanced
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
