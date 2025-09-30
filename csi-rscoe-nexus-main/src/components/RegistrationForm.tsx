import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/config/api';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type CustomField = { label: string; type: string; required: boolean; options?: string };

interface Props {
  event?: { id: number; title: string; fee?: number };
  onClose: () => void;
  onSuccess?: () => void;
  standalone?: boolean;
}

const RegistrationForm: React.FC<Props> = ({ event, onClose, onSuccess, standalone = false }) => {
  const { user } = useAuth();
  const [fields, setFields] = useState<CustomField[]>([]);
  const [form, setForm] = useState<Record<string, any>>({
    name: '',
    email: '',
    phone: '',
    college: 'RSCOE',
    branch: '',
    year: '',
  });
  const [busy, setBusy] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | undefined>(undefined);
  const teamSizeValue = (() => {
    const v = String(form['Team Members'] ?? '').trim();
    const n = parseInt(v || '1', 10);
    if (Number.isFinite(n) && n >= 1 && n <= 10) return n;
    return 1;
  })();

  useEffect(() => {
    if (event) {
      const load = async () => {
        try {
          const res = await fetch(API_ENDPOINTS.getEventRegistrationSchema(event.id));
          if (res.ok) {
            const text = await res.text();
            const arr = text ? JSON.parse(text) : [];
            setFields(Array.isArray(arr) ? arr : []);
            const init: Record<string, any> = { ...form };
            (Array.isArray(arr) ? arr : []).forEach((f: CustomField) => {
              if (f.label === 'Event Fee') init[f.label] = event.fee || 0;
              else if (!init[f.label]) init[f.label] = '';
            });
            setForm(init);
          }
        } catch {}
      };
      load();
    } else if (standalone) {
      // Default fields for standalone registration
      setFields([
        { label: 'Full Name', type: 'text', required: true },
        { label: 'Email', type: 'email', required: true },
        { label: 'Phone', type: 'tel', required: true },
        { label: 'College', type: 'text', required: true },
        { label: 'Branch', type: 'select', required: true, options: 'Computer,IT,ENTC,Mechanical,Civil,Other' },
        { label: 'Year', type: 'select', required: true, options: 'FE,SE,TE,BE' }
      ]);
    }
  }, [event?.id, standalone]);

  const submit = async () => {
    setBusy(true);
    try {
      if (event) {
        // Event registration
        // Build memberNames from dynamic inputs if Team Members present
        const members: string[] = [];
        for (let i = 1; i <= teamSizeValue; i++) {
          const key = `Member ${i} Name`;
          const v = (form[key] ?? '').toString().trim();
          if (v) members.push(v);
        }
        const customFieldsJson = JSON.stringify(form);
        const payload: Record<string, any> = {
          name: form['Full Name'] || form.name,
          email: form['Email'] || form.email,
          phone: form['Phone'] || form.phone,
          college: form['College'] || form.college,
          year: form['Year'] || form.year,
          department: form['Branch'] || form.branch,
          teamSize: form['Team Members'] ? teamSizeValue : undefined,
          memberNames: members.length ? members.join(', ') : (form['Member Names'] || form.memberNames),
          customFieldsJson
        };
        const fd = new FormData();
        fd.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        const res = await fetch(API_ENDPOINTS.registerForEvent(event.id), { method: 'POST', body: fd });
        if (res.ok) { 
          onSuccess && onSuccess(); 
          const whatsapp = (form['WhatsApp Group URL'] || form.whatsappGroupUrl) as string | undefined;
          setWhatsappLink(whatsapp);
          setSuccessOpen(true);
        }
        else {
          if (res.status === 409) {
            alert('Duplicate registration detected (email/phone/team).');
          } else if (res.status === 400) {
            alert('Invalid data. Please check your email/phone.');
          } else {
            const t = await res.text();
            alert(t || 'Failed to register for event');
          }
        }
      } else {
        // Club membership registration
        const payload = {
          name: form['Full Name'] || form.name,
          email: form['Email'] || form.email,
          phone: form['Phone'] || form.phone,
          college: form['College'] || form.college,
          branch: form['Branch'] || form.branch,
          year: form['Year'] || form.year
        };
        
        const res = await fetch(API_ENDPOINTS.REGISTER, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (res.ok) {
          const msg = await res.text();
          alert(msg || 'Registration successful! Welcome to CSI Club!');
          const whatsappEnv = (import.meta as any).env?.VITE_WHATSAPP_GROUP_URL as string | undefined;
          setWhatsappLink(whatsappEnv);
          onSuccess && onSuccess();
          setSuccessOpen(true);
        } else {
          const t = await res.text();
          alert(t || 'Failed to register for club');
        }
      }
    } finally { 
      setBusy(false); 
    }
  };

  const requiredTeamSize = (() => {
    const v = String(form['Team Size'] ?? form['Required Team Size'] ?? '').trim();
    const n = parseInt(v || '0', 10);
    return Number.isFinite(n) && n > 0 && n <= 10 ? n : 0;
  })();

  const leaderRequired = (() => {
    const v = String(form['Leader Required'] ?? '').trim().toLowerCase();
    return v === 'true' || v === 'yes' || v === '1';
  })();

  const validateForm = () => {
    for (const field of fields) {
      if (field.required && !form[field.label]) {
        return false;
      }
    }
    if (event && requiredTeamSize > 0) {
      // Require at least name or email/phone per member
      for (let i = 1; i <= requiredTeamSize; i++) {
        const name = String(form[`Member ${i} Name`] ?? '').trim();
        const email = String(form[`Member ${i} Email`] ?? '').trim();
        const phone = String(form[`Member ${i} Phone`] ?? '').trim();
        if (!name && !email && !phone) return false;
      }
      if (leaderRequired) {
        const leader = parseInt(String(form['Team Leader'] ?? '').trim() || '0', 10);
        if (!leader || leader < 1 || leader > requiredTeamSize) return false;
      }
    }
    return true;
  };

  return (
    <div className={`space-y-4 ${standalone ? 'p-6 bg-white rounded-lg shadow-md max-w-md mx-auto' : ''}`}>
      {standalone && <h2 className="text-2xl font-bold text-center mb-6">CSI Club Registration</h2>}
      
      {fields.map((f, idx) => (
        <div key={idx} className="mb-4">
          <label className="block text-sm font-medium mb-1">{f.label}</label>
          {f.type === 'select' ? (
            <select 
              className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary" 
              value={form[f.label] || ''} 
              onChange={e=>setForm({ ...form, [f.label]: e.target.value })} 
              required={f.required}
            >
              <option value="">Select {f.label}</option>
              {(f.options || '').split(',').map(o => <option key={o} value={o.trim()}>{o.trim()}</option>)}
            </select>
          ) : f.type === 'textarea' ? (
            <textarea 
              className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder={`Enter ${f.label.toLowerCase()}`} 
              value={form[f.label] || ''} 
              onChange={e=>setForm({ ...form, [f.label]: e.target.value })} 
              required={f.required} 
            />
          ) : f.type === 'display' ? (
            <input 
              className="p-2 border rounded w-full opacity-70" 
              placeholder={f.label} 
              value={form[f.label] || ''} 
              readOnly 
            />
          ) : (
            <input 
              type={f.type} 
              className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary" 
              placeholder={`Enter ${f.label.toLowerCase()}`} 
              value={form[f.label] || ''} 
              onChange={e=>setForm({ ...form, [f.label]: e.target.value })} 
              required={f.required} 
            />
          )}
        </div>
      ))}
      {/* Team members based on schema-driven team size/leader flags */}
      {event && requiredTeamSize > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: requiredTeamSize }).map((_, i) => {
              const idx = i + 1;
              return (
                <div key={idx} className="space-y-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{`Member ${idx} Name`}</label>
                    <input
                      className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={`Enter Member ${idx} Name`}
                      value={(form[`Member ${idx} Name`] ?? '').toString()}
                      onChange={e => setForm({ ...form, [`Member ${idx} Name`]: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{`Member ${idx} Email`}</label>
                    <input
                      type="email"
                      className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={`Enter Member ${idx} Email`}
                      value={(form[`Member ${idx} Email`] ?? '').toString()}
                      onChange={e => setForm({ ...form, [`Member ${idx} Email`]: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">{`Member ${idx} Phone`}</label>
                    <input
                      className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder={`Enter Member ${idx} Phone`}
                      value={(form[`Member ${idx} Phone`] ?? '').toString()}
                      onChange={e => setForm({ ...form, [`Member ${idx} Phone`]: e.target.value })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {leaderRequired && (
            <div className="mt-3">
              <label className="block text-sm font-medium mb-1">Team Leader</label>
              <select
                className="p-2 border rounded w-full focus:ring-2 focus:ring-primary focus:border-primary"
                value={(form['Team Leader'] ?? '').toString()}
                onChange={e => setForm({ ...form, ['Team Leader']: e.target.value })}
              >
                <option value="">Select Leader</option>
                {Array.from({ length: requiredTeamSize }).map((_, i) => (
                  <option key={i+1} value={i+1}>{`Member ${i+1}`}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end gap-2 mt-6">
        <button 
          className="px-4 py-2 rounded border hover:bg-gray-100 transition-colors" 
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" 
          disabled={busy || !validateForm()} 
          onClick={submit}
        >
          {busy ? 'Processing...' : 'Register'}
        </button>
      </div>

      <Dialog open={successOpen} onOpenChange={(open) => {
        setSuccessOpen(open);
        if (!open) {
          onClose();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful</DialogTitle>
            <DialogDescription>
              You have been registered successfully.
            </DialogDescription>
          </DialogHeader>
          {whatsappLink ? (
            <div className="space-y-3">
              <p className="text-sm">Join the WhatsApp group for further updates:</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Open WhatsApp Group
              </a>
            </div>
          ) : (
            <p className="text-sm">No WhatsApp link provided.</p>
          )}
          <DialogFooter>
            <button
              className="px-4 py-2 rounded border hover:bg-gray-100 transition-colors"
              onClick={() => setSuccessOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationForm;


