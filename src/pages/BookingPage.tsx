import { useParams, useSearchParams, Link } from "react-router-dom";
import { getTourBySlug } from "@/data/tours";
import { saveBooking, generateReference, type Booking } from "@/data/bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Minus, Plus, Check, CreditCard, MessageCircle } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Phone number required").max(20),
  whatsapp: z.string().trim().min(6, "WhatsApp number required").max(20),
  nationality: z.string().trim().min(2, "Nationality required").max(50),
});

const steps = ["Date", "Guests", "Details", "Review", "Payment"];

const BookingPage = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const tour = getTourBySlug(slug || "");

  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(
    params.get("date") ? new Date(params.get("date")!) : undefined
  );
  const [adults, setAdults] = useState(Number(params.get("adults")) || 2);
  const [children, setChildren] = useState(Number(params.get("children")) || 0);
  const [pickup, setPickup] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", whatsapp: "", nationality: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Tour not found</h1>
          <Link to="/tours"><Button>Back to Tours</Button></Link>
        </div>
      </div>
    );
  }

  const total = adults * tour.price + children * tour.childPrice;
  const availableSet = new Set(tour.availableDates);

  const nextStep = () => {
    if (step === 1 && !date) { toast.error("Please select a date"); return; }
    if (step === 2 && !pickup.trim()) { toast.error("Please enter pickup location"); return; }
    if (step === 3) {
      const result = customerSchema.safeParse(form);
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.errors.forEach((e) => { errs[e.path[0] as string] = e.message; });
        setErrors(errs);
        return;
      }
      setErrors({});
    }
    setStep(step + 1);
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const ref = generateReference();
      const newBooking: Booking = {
        id: crypto.randomUUID(),
        tourId: tour.id,
        tourName: tour.name,
        date: date!.toISOString().split("T")[0],
        adults,
        children,
        pickupLocation: pickup,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerWhatsApp: form.whatsapp,
        nationality: form.nationality,
        totalPrice: total,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        reference: ref,
      };
      saveBooking(newBooking);
      setBooking(newBooking);
      setProcessing(false);
      setStep(6);
    }, 2500);
  };

  // Success screen
  if (step === 6 && booking) {
    const waMsg = encodeURIComponent(
      `Hi Sunshine Tours! I just booked: ${tour.name} on ${booking.date}. Reference: ${booking.reference}. Name: ${booking.customerName}. Looking forward to it!`
    );
    return (
      <div className="min-h-screen py-10">
        <div className="container max-w-lg mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-accent" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Booking Confirmed!</h1>
          <p className="text-muted-foreground">Thank you, {booking.customerName}! Your adventure awaits.</p>

          <div className="bg-card rounded-xl border border-border/50 p-6 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-bold font-mono text-accent">{booking.reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tour</span>
              <span className="font-medium text-foreground">{tour.shortName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="text-foreground">{booking.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Guests</span>
              <span className="text-foreground">{booking.adults} adults{booking.children > 0 ? `, ${booking.children} children` : ""}</span>
            </div>
            <div className="flex justify-between text-sm font-bold border-t border-border/50 pt-2">
              <span className="text-foreground">Total Paid</span>
              <span className="text-accent">OMR {booking.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* QR placeholder */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <p className="text-sm font-semibold mb-3 text-foreground">Your Booking QR Code</p>
            <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <span className="text-xs text-muted-foreground text-center px-2">QR: {booking.reference}</span>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-sm text-accent">
            <MessageCircle className="h-5 w-5 inline mr-2" />
            We sent a confirmation to your WhatsApp!
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/96892830836?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full" style={{ backgroundColor: "#25D366" }}>
                <MessageCircle className="h-4 w-4 mr-2" /> Open WhatsApp
              </Button>
            </a>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full border-border/50 text-foreground">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-10">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/tours/${tour.slug}`} className="text-sm text-muted-foreground hover:text-accent mb-2 inline-block">
            ← Back to {tour.shortName}
          </Link>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Book Your Tour</h1>
          <p className="text-muted-foreground">{tour.name}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium mb-2">
            {steps.map((s, i) => (
              <span key={s} className={step > i + 1 ? "text-accent" : step === i + 1 ? "text-foreground" : "text-muted-foreground"}>
                {s}
              </span>
            ))}
          </div>
          <Progress value={(step / 5) * 100} className="h-2" />
        </div>

        <div className="bg-card rounded-xl border border-border/50 p-6 space-y-6">
          {/* Step 1: Date */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-foreground">Select Your Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => {
                  const ds = d.toISOString().split("T")[0];
                  return d < new Date() || !availableSet.has(ds);
                }}
                className="rounded-md border border-border/50 mx-auto pointer-events-auto"
              />
              {date && <p className="text-center text-sm text-accent font-medium">Selected: {format(date, "EEEE, MMMM d, yyyy")}</p>}
            </div>
          )}

          {/* Step 2: Guests */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Guests & Pickup</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Adults</p>
                    <p className="text-xs text-muted-foreground">OMR {tour.price} per person</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center font-semibold text-lg text-foreground">{adults}</span>
                    <button onClick={() => setAdults(Math.min(tour.maxGroupSize, adults + 1))} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Children (3–12)</p>
                    <p className="text-xs text-muted-foreground">OMR {tour.childPrice} per person</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center font-semibold text-lg text-foreground">{children}</span>
                    <button onClick={() => setChildren(Math.min(4, children + 1))} className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center hover:bg-muted text-foreground"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="pickup" className="text-foreground">Pickup Location</Label>
                <Input id="pickup" placeholder="e.g. Grand Hyatt Muscat, Airport..." value={pickup} onChange={(e) => setPickup(e.target.value)} className="mt-1 bg-muted/50 border-border/50" />
              </div>
            </div>
          )}

          {/* Step 3: Customer details */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-foreground">Your Details</h2>
              {[
                { key: "name", label: "Full Name", placeholder: "Mohammed Al-Said", type: "text" },
                { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
                { key: "phone", label: "Phone Number", placeholder: "+968 9XXX XXXX", type: "tel" },
                { key: "whatsapp", label: "WhatsApp Number", placeholder: "+968 9XXX XXXX", type: "tel" },
                { key: "nationality", label: "Nationality", placeholder: "e.g. British, German, Omani", type: "text" },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <Label htmlFor={key} className="text-foreground">{label}</Label>
                  <Input
                    id={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className={cn("mt-1 bg-muted/50 border-border/50", errors[key] && "border-destructive")}
                  />
                  {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold text-foreground">Review Your Booking</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Tour</span><span className="font-medium text-foreground">{tour.shortName}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Date</span><span className="text-foreground">{date ? format(date, "PPP") : ""}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Guests</span><span className="text-foreground">{adults} adults{children > 0 ? `, ${children} children` : ""}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Pickup</span><span className="text-foreground">{pickup}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Name</span><span className="text-foreground">{form.name}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Email</span><span className="text-foreground">{form.email}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50"><span className="text-muted-foreground">Phone</span><span className="text-foreground">{form.phone}</span></div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Adults ({adults} × OMR {tour.price})</span>
                  <span className="text-foreground">OMR {(adults * tour.price).toLocaleString()}</span>
                </div>
                {children > 0 && (
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Children ({children} × OMR {tour.childPrice})</span>
                    <span className="text-foreground">OMR {(children * tour.childPrice).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">OMR {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Payment</h2>
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-sm text-muted-foreground mb-3">Select payment method</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card cursor-pointer hover:border-accent/50">
                    <input type="radio" name="payment" defaultChecked className="accent-[hsl(35,100%,55%)]" />
                    <CreditCard className="h-5 w-5 text-accent" />
                    <span className="font-medium text-sm text-foreground">Credit / Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card cursor-pointer hover:border-accent/50">
                    <input type="radio" name="payment" className="accent-[hsl(35,100%,55%)]" />
                    <span className="font-bold text-sm text-accent">OmanNet</span>
                  </label>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-accent mb-1">OMR {total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Demo mode – no real charge</p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 border-border/50 text-foreground">
                Back
              </Button>
            )}
            {step < 5 && (
              <Button onClick={nextStep} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Continue
              </Button>
            )}
            {step === 5 && (
              <Button onClick={handlePayment} disabled={processing} className="flex-1 bg-accent text-accent-foreground font-semibold hover:bg-accent/90">
                {processing ? "Processing..." : `Pay OMR ${total.toLocaleString()}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
