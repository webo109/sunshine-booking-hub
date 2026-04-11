import { useState } from "react";
import { getBookings, exportBookingsCSV, type Booking } from "@/data/bookings";
import { tours } from "@/data/tours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, LogOut, Users, DollarSign, CalendarDays, BarChart3 } from "lucide-react";

const ADMIN_PASS = "sunshine2026";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (pass === ADMIN_PASS) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-card p-8 rounded-xl border border-border/50 max-w-sm w-full space-y-4">
          <h1 className="font-heading text-2xl font-bold text-center text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground text-center">Sunshine Tours Dashboard</p>
          <Input
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="bg-muted/50 border-border/50"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleLogin} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Login</Button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const bookings = getBookings();
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthlyRevenue = bookings
    .filter((b) => b.createdAt.startsWith(thisMonth))
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const upcoming = bookings.filter((b) => new Date(b.date) >= now);

  const handleExport = () => {
    const csv = exportBookingsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bookedDates = bookings.map((b) => new Date(b.date));

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card">
        <div className="container flex items-center justify-between h-14">
          <h1 className="font-heading text-lg font-bold text-accent">Sunshine Tours Admin</h1>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, icon: BarChart3, color: "text-accent" },
            { label: "Upcoming", value: upcoming.length, icon: CalendarDays, color: "text-blue-400" },
            { label: "Revenue (Month)", value: `OMR ${monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
            { label: "Customers", value: new Set(bookings.map((b) => b.customerEmail)).size, icon: Users, color: "text-orange-400" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl border border-border/50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="tours">Tours</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-xl font-bold text-foreground">All Bookings</h2>
              <Button variant="outline" size="sm" onClick={handleExport} className="border-border/50">
                <Download className="h-4 w-4 mr-1" /> Export CSV
              </Button>
            </div>
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No bookings yet. They'll appear here after customers book tours.</p>
            ) : (
              <div className="overflow-x-auto bg-card rounded-xl border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Ref</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b) => (
                      <TableRow key={b.id} className="border-border/50">
                        <TableCell className="font-mono text-xs text-accent">{b.reference}</TableCell>
                        <TableCell className="max-w-[150px] truncate text-foreground">{b.tourName}</TableCell>
                        <TableCell className="text-foreground">{b.date}</TableCell>
                        <TableCell className="text-foreground">{b.customerName}</TableCell>
                        <TableCell className="text-foreground">{b.adults}A {b.children > 0 ? `${b.children}C` : ""}</TableCell>
                        <TableCell className="font-semibold text-accent">OMR {b.totalPrice}</TableCell>
                        <TableCell><Badge className="bg-accent/20 text-accent border-0">{b.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <h2 className="font-heading text-xl font-bold mb-4 text-foreground">Booking Calendar</h2>
            <div className="bg-card rounded-xl border border-border/50 p-4 inline-block">
              <Calendar
                mode="multiple"
                selected={bookedDates}
                className="pointer-events-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Highlighted dates have bookings.</p>
          </TabsContent>

          <TabsContent value="tours">
            <h2 className="font-heading text-xl font-bold mb-4 text-foreground">Manage Tours</h2>
            <div className="space-y-3">
              {tours.map((t) => (
                <div key={t.id} className="bg-card rounded-xl border border-border/50 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{t.shortName}</h3>
                    <p className="text-sm text-muted-foreground">{t.duration} · OMR {t.price}/person · {t.availableDates.length} dates available</p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-0">{t.groupType}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <h2 className="font-heading text-xl font-bold mb-4 text-foreground">Customers</h2>
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No customers yet.</p>
            ) : (
              <div className="overflow-x-auto bg-card rounded-xl border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Bookings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from(new Map(bookings.map((b) => [b.customerEmail, b])).values()).map((b) => (
                      <TableRow key={b.customerEmail} className="border-border/50">
                        <TableCell className="text-foreground">{b.customerName}</TableCell>
                        <TableCell className="text-foreground">{b.customerEmail}</TableCell>
                        <TableCell className="text-foreground">{b.customerPhone}</TableCell>
                        <TableCell className="text-foreground">{b.nationality}</TableCell>
                        <TableCell className="text-foreground">{bookings.filter((x) => x.customerEmail === b.customerEmail).length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
