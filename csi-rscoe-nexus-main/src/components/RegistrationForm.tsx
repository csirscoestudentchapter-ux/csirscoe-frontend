import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/config/api';

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
        const customFieldsJson = JSON.stringify(form);
        const payload: Record<string, any> = {
          name: form['Full Name'] || form.name,
          email: form['Email'] || form.email,
          phone: form['Phone'] || form.phone,
          college: form['College'] || form.college,
          year: form['Year'] || form.year,
          department: form['Branch'] || form.branch,
          customFieldsJson
        };
        const fd = new FormData();
        fd.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
        const res = await fetch(API_ENDPOINTS.registerForEvent(event.id), { method: 'POST', body: fd });
        if (res.ok) { 
          onSuccess && onSuccess(); 
          const whatsapp = (form['WhatsApp Group URL'] || form.whatsappGroupUrl);
          if (whatsapp && typeof whatsapp === 'string') {
            window.open(whatsapp, '_blank');
          }
          onClose(); 
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
          onSuccess && onSuccess();
          onClose();
        } else {
          const t = await res.text();
          alert(t || 'Failed to register for club');
        }
      }
    } finally { 
      setBusy(false); 
    }
  };

  const validateForm = () => {
    for (const field of fields) {
      if (field.required && !form[field.label]) {
        return false;
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
    </div>
  );
};

export default RegistrationForm;


