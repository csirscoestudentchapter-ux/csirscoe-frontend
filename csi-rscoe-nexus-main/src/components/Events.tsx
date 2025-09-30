import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { API_ENDPOINTS } from '@/config/api';

const Events: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  interface EventItem { 
    id: number; 
    title: string; 
    description: string; 
    date: string; 
    location: string; 
    attendees?: string; 
    status?: string; 
    image?: string; 
    qrCodeUrl?: string;
    rulebookUrl?: string;
    whatsappGroupUrl?: string;
    qrUrl?: string;
  }
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showDetails, setShowDetails] = useState<EventItem | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [registerFor, setRegisterFor] = useState<EventItem | null>(null);
  const [customFields, setCustomFields] = useState<Array<{ label: string; type: string; required: boolean; options?: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    name: '',
    teamName: '',
    memberNames: '',
    teamSize: '1',
    whatsappLink: '',
    email: '',
    phone: '',
    department: '',
    college: '',
    year: '',
    rbtNo: '',
    transactionId: '',
    transactionDetails: '',
    message: ''
  });
  const [teamAvailable, setTeamAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.EVENTS);
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) { console.error('Failed to load events', err); }
    };
    load();
  }, []);

  useEffect(() => {
    const loadSchema = async () => {
      if (!registerFor) return;
      try {
        const res = await fetch(API_ENDPOINTS.getEventRegistrationSchema(registerFor.id));
        if (res.ok) {
          const text = await res.text();
          const arr = text ? JSON.parse(text) : [];
          setCustomFields(Array.isArray(arr) ? arr : []);
        } else {
          setCustomFields([]);
        }
      } catch (err) {
        setCustomFields([]);
      }
    };
    loadSchema();
  }, [registerFor]);

  return (
    <>
    <section id="events" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Upcoming <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us for exciting events, workshops, and competitions that will enhance your technical skills 
            and expand your professional network.
          </p>
        </motion.div>

        {events.length > 0 ? (
          <div className="relative">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {events.map((event, index) => (
                  <CarouselItem key={event.id} className="md:basis-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <Card className="gradient-card border-none card-hover group overflow-hidden h-full">
                <div className="relative overflow-hidden">
                  {/* Image removed as requested */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'upcoming' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-playfair font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    {/* Removed Expected Attendees display */}
                    {event.qrCodeUrl && (
                      <div className="flex items-center gap-3 mt-2">
                        <img src={event.qrCodeUrl} alt="QR" className="w-12 h-12 object-contain rounded border" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                        <span className="text-xs text-muted-foreground">Scan and tap Register Now to submit Transaction ID</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:gradient-primary hover:text-primary-foreground group"
                    onClick={() => setRegisterFor(event)}
                  >
                    {event.status === 'upcoming' ? 'Register Now' : 'Register'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <div className="mt-3">
                    <Button variant="outline" className="w-full" onClick={() => setShowDetails(event)}>View Details</Button>
                  </div>
                </CardContent>
              </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <div className="col-span-full text-center text-xl text-muted-foreground font-medium py-12">
            Stay tuned for exciting upcoming events!
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="border-primary text-primary hover:gradient-primary hover:text-primary-foreground" onClick={() => window.location.href = '/events'}>
            View All Events
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
    {registerFor && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-background w-full max-w-2xl rounded-xl shadow-xl p-6 overflow-auto max-h-[90vh]">
          <h3 className="text-xl font-semibold mb-4">Register for {registerFor.title}</h3>
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className={step===1? 'font-semibold text-primary' : 'text-muted-foreground'}>Step 1: Details</span>
            <span>›</span>
            <span className={step===2? 'font-semibold text-primary' : 'text-muted-foreground'}>Step 2: Payment</span>
          </div>
          {(() => { 
            const rb = (registerFor?.rulebookUrl || '').toLowerCase();
            const derived = registerFor?.qrCodeUrl || registerFor?.image || (rb.match(/\.(png|jpe?g)$/) ? registerFor?.rulebookUrl : '');
            if (registerFor) {
              registerFor.qrUrl = derived || '/uploads/QRcode.jpg';
            }
            return null; 
          })()}
          {/* Team settings and custom fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Team size selector */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted-foreground">Number of Team Members</label>
              <select
                className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                value={form.teamSize}
                onChange={e => setForm({ ...form, teamSize: e.target.value })}
              >
                <option value="1">Team Members: 1</option>
                <option value="2">Team Members: 2</option>
                <option value="3">Team Members: 3</option>
                <option value="4">Team Members: 4</option>
                <option value="5">Team Members: 5</option>
              </select>
            </div>
            {/* WhatsApp Group Link (user-provided) */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted-foreground">WhatsApp Group Link (optional)</label>
              <input
                className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                placeholder="https://chat.whatsapp.com/..."
                value={form.whatsappLink}
                onChange={e => setForm({ ...form, whatsappLink: e.target.value })}
              />
            </div>
            {/* Dynamic custom fields loaded from backend schema */}
            {customFields.map((field, index) => (
              <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                {field.type === 'select' ? (
                  <select
                    className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                    value={form[field.label] || ''}
                    onChange={e => setForm({ ...form, [field.label]: e.target.value })}
                    required={field.required}
                  >
                    <option value="">{field.label}</option>
                    {(field.options || '').split(',').map((opt) => (
                      <option key={opt} value={opt.trim()}>{opt.trim()}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                    placeholder={field.label}
                    value={form[field.label] || ''}
                    onChange={e => setForm({ ...form, [field.label]: e.target.value })}
                    required={field.required}
                  />
                ) : field.type === 'display' ? (
                  <input
                    className="p-2 border rounded w-full opacity-70 bg-background text-foreground placeholder:text-muted-foreground border-input"
                    placeholder={field.label}
                    value={form[field.label] || ''}
                    readOnly
                  />
                ) : (
                  <input
                    className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                    placeholder={field.label}
                    value={form[field.label] || ''}
                    onChange={e => setForm({ ...form, [field.label]: e.target.value })}
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Dynamic member name inputs based on team size */}
          {(() => {
            const size = Math.max(1, Math.min(5, parseInt(form.teamSize || '1', 10) || 1));
            const inputs = [] as JSX.Element[];
            for (let i = 1; i <= size; i++) {
              const key = `member_${i}`;
              inputs.push(
                <div key={key} className="mb-2">
                  <label className="text-sm text-muted-foreground block mb-1">Member {i} Name</label>
                  <input
                    className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary border-input"
                    placeholder={`Enter member ${i} full name`}
                    value={(form as any)[key] || ''}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              );
            }
            return <div className="md:col-span-2">{inputs}</div>;
          })()}
          {step === 2 && (
            <div className="my-4 p-4 border rounded bg-white flex flex-col items-center justify-center">
              <div className="text-sm mb-3 text-center">Scan to pay</div>
              {registerFor?.qrUrl ? (
                <>
                  <img src={registerFor.qrUrl} alt="Payment QR" className="w-72 h-72 md:w-80 md:h-80 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
                  <div className="mt-3 text-sm text-center">
                    <a href={registerFor.qrUrl} target="_blank" className="text-primary underline">Open QR in new tab</a>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground text-center">QR not available for this event.</div>
              )}
              {/* Show UPI details if provided via custom fields */}
              <div className="mt-4 text-sm text-center">
                {(() => {
                  const findVal = (keys: string[]) => {
                    for (const k of keys) {
                      const key = customFields.find(f => f.label.toLowerCase() === k.toLowerCase())?.label;
                      if (key && form[key]) return form[key];
                    }
                    return '';
                  };
                  const upiId = findVal(['UPI ID','UPI','UPI Id']);
                  const upiNumber = findVal(['UPI Number','UPI Phone','Payment Number','Phone']);
                  return (
                    <div className="space-y-1">
                      {upiId && <div>UPI ID: <span className="font-medium">{upiId}</span></div>}
                      {upiNumber && <div>UPI Number: <span className="font-medium">{upiNumber}</span></div>}
                      {!upiId && !upiNumber && (
                        <div className="text-muted-foreground">Pay using the QR above, then enter Transaction ID below.</div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Your Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Team Name" value={form.teamName} onChange={e=>{ setForm({...form,teamName:e.target.value}); setTeamAvailable(null); }} onBlur={async ()=>{
              if (!registerFor || !form.teamName.trim()) return;
              try{
                const res = await fetch(API_ENDPOINTS.getEventTeamAvailable(registerFor.id, form.teamName));
                if(res.ok){ const txt = await res.text(); setTeamAvailable(txt === 'true'); }
              }catch{
                // Team availability check failed, continue
              }
            }} />
            <input className="p-2 border rounded md:col-span-2 bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Member Names (comma-separated)" value={form.memberNames} onChange={e=>setForm({...form,memberNames:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Mobile Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="College" value={form.college} onChange={e=>setForm({...form,college:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Year" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
            <input className="p-2 border rounded bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="RBT No" value={form.rbtNo} onChange={e=>setForm({...form,rbtNo:e.target.value})} />
            {step === 2 && (
            <div className="md:col-span-1">
              <input className="p-2 border rounded w-full bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Transaction ID" value={form.transactionId} onChange={e=>setForm({...form,transactionId:e.target.value})} />
              {registerFor?.qrUrl && (
                <div className="text-xs text-muted-foreground mt-1">After paying via QR, enter the transaction ID here.</div>
              )}
            </div>
            )}
            {step === 2 && (
            <input className="p-2 border rounded md:col-span-1 bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Transaction Details" value={form.transactionDetails} onChange={e=>setForm({...form,transactionDetails:e.target.value})} />
            )}
            <textarea className="p-2 border rounded md:col-span-2 bg-background text-foreground placeholder:text-muted-foreground border-input" placeholder="Message (optional)" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <Button variant="outline" onClick={()=>{ setRegisterFor(null); setStep(1); }}>Cancel</Button>
            {step === 1 ? (
              <Button onClick={()=>{
                // Basic required checks before going to payment
                if (!form.name.trim()) { alert('Please enter your name'); return; }
                if (!form.email.trim()) { alert('Please enter email'); return; }
                if (!/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(form.email)) { alert('Invalid email'); return; }
                if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s+/g,''))) { alert('Enter 10-digit mobile number'); return; }
                // If custom fields include any required fields, ensure they are filled
                for (const f of customFields) {
                  if (f.required && !form[f.label]) { alert(`Please fill ${f.label}`); return; }
                }
                setStep(2);
              }}>Next</Button>
            ) : (
            <Button className="bg-primary text-primary-foreground" disabled={isSubmitting} onClick={async ()=>{
              setIsSubmitting(true);
              try{
                // client-side validations
                const emailOk = !form.email || /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(form.email);
                const phoneOk = !form.phone || /^[0-9]{10}$/.test(form.phone.replace(/\s+/g,''));
                if (!emailOk) { alert('Invalid email'); return; }
                if (!phoneOk) { alert('Invalid mobile number'); return; }
                if (teamAvailable === false) { alert('Team name already taken for this event'); return; }
                if (registerFor?.qrCodeUrl && !form.transactionId.trim()) { alert('Please enter Transaction ID after payment'); return; }
                // Ensure no required custom field empty before submit (in case user bypassed step)
                for (const f of customFields) {
                  if (f.required && !form[f.label]) { alert(`Please fill ${f.label}`); return; }
                }
                const fd = new FormData();
                // Build custom fields payload as a JSON object mapping label -> value
                const customData: Record<string, string> = {};
                customFields.forEach(f => { customData[f.label] = form[f.label] || ''; });
                // Build member names array from dynamic inputs
                const teamSize = Math.max(1, Math.min(5, parseInt(form.teamSize || '1', 10) || 1));
                const members: string[] = [];
                for (let i = 1; i <= teamSize; i++) {
                  const v = (form as any)[`member_${i}`];
                  if (typeof v === 'string' && v.trim()) members.push(v.trim());
                }
                const payload = { ...form, teamSize, memberNames: members.join(', '), whatsappGroupUrl: form.whatsappLink, customFieldsJson: JSON.stringify(customData) };
                fd.append('payload', new Blob([JSON.stringify(payload)], { type:'application/json' }));
                const res = await fetch(API_ENDPOINTS.registerForEvent(registerFor.id),{method:'POST',body:fd});
                if(res.ok){ 
                  alert('Registered successfully');
                  const wa = form.whatsappLink || registerFor?.whatsappGroupUrl;
                  if (wa) { window.open(wa, '_blank'); }
                  setRegisterFor(null); setStep(1);
                }
                else if (res.status === 409) { alert('Duplicate found: team/email/phone/transaction already registered'); }
                else{ const t=await res.text(); alert(t||'Failed to register'); }
              } finally { setIsSubmitting(false); }
            }}>Submit Registration</Button>
            )}
          </div>
        </div>
      </div>
    )}
    {showDetails && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={()=>setShowDetails(null)}>
        <div className="bg-background w-full max-w-xl rounded-xl shadow-xl p-6" onClick={e=>e.stopPropagation()}>
          <h3 className="text-xl font-semibold mb-2">{showDetails.title}</h3>
          <div className="text-muted-foreground mb-4">{showDetails.description}</div>
          <div className="text-sm mb-2">Date: {showDetails.date}</div>
          <div className="text-sm mb-4">Location: {showDetails.location}</div>
          <div className="flex items-center gap-4 mb-2">
            {showDetails?.rulebookUrl && (
              <a href={showDetails.rulebookUrl} target="_blank" className="text-primary underline">View Rulebook</a>
            )}
            {showDetails.qrCodeUrl && (
              <a href={showDetails.qrCodeUrl} target="_blank" className="text-primary underline">View Payment QR</a>
            )}
          </div>
          {showDetails.qrCodeUrl && (
            <div className="mt-4">
              <div className="text-sm mb-2">Payment QR</div>
              <img src={showDetails.qrCodeUrl} className="w-48 h-48 object-contain border rounded" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none'; }} />
            </div>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setShowDetails(null)}>Close</Button>
            <Button onClick={()=>{ setRegisterFor(showDetails); setShowDetails(null); }}>Register Now</Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Events;
