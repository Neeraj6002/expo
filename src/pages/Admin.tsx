import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CyberBackground } from '@/components/CyberBackground';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Trash2, 
  Users, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  RefreshCw,
  Crown,
  User,
  Check,
  X,
  Download,
  Search
} from 'lucide-react';

// Firebase imports
import { auth, db } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department?: string;
  year?: string;
  isIEEEMember: boolean;
  ieeeNumber?: string;
  price: number;
  registeredAt: string;
  approved?: boolean;
}

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin panel.',
      });
      onLogin();
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.code === 'auth/invalid-credential' 
        ? 'Invalid email or password' 
        : err.message || 'Invalid credentials';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin panel.',
      });
      onLogin();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      const errorMessage = err.code === 'auth/popup-closed-by-user'
        ? 'Sign-in cancelled'
        : err.message || 'Failed to sign in with Google';
      setError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative bg-card/80 border-2 border-border rounded-lg p-8 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary" />

        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground font-mono mt-2">Enter credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Admin email"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              className="pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm font-mono"
            >
              [ERROR] {error}
            </motion.p>
          )}

          <Button type="submit" variant="cyber" className="w-full" disabled={loading || googleLoading}>
            {loading ? 'Authenticating...' : 'Access Panel'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-mono">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          {googleLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </div>
    </motion.div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'registrations'), orderBy('registeredAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const regs: Registration[] = [];
      querySnapshot.forEach((doc) => {
        regs.push({ id: doc.id, ...doc.data() } as Registration);
      });
      
      setRegistrations(regs);
      setFilteredRegistrations(regs);
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load registrations.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredRegistrations(registrations);
      return;
    }

    const filtered = registrations.filter((reg) => {
      return (
        reg.fullName.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.phone.includes(query) ||
        reg.college.toLowerCase().includes(query) ||
        (reg.department?.toLowerCase().includes(query)) ||
        (reg.year?.toLowerCase().includes(query)) ||
        (reg.ieeeNumber?.includes(query))
      );
    });

    setFilteredRegistrations(filtered);
  }, [searchQuery, registrations]);

  const handleApprovalToggle = async (id: string, currentStatus: boolean, name: string) => {
    try {
      await updateDoc(doc(db, 'registrations', id), {
        approved: !currentStatus
      });
      await loadRegistrations();
      toast({
        title: !currentStatus ? 'Registration Approved' : 'Approval Revoked',
        description: `${name}'s registration has been ${!currentStatus ? 'approved' : 'unapproved'}.`,
      });
    } catch (error) {
      console.error('Error updating approval:', error);
      toast({
        title: 'Error',
        description: 'Failed to update approval status.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}'s registration?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'registrations', id));
      await loadRegistrations();
      toast({
        title: 'Registration Deleted',
        description: `Removed ${name} from registrations.`,
      });
    } catch (error) {
      console.error('Error deleting registration:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete registration.',
        variant: 'destructive',
      });
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'College',
      'Department',
      'Year',
      'IEEE Member',
      'IEEE Number',
      'Price',
      'Approved',
      'Registration Date'
    ];

    const rows = filteredRegistrations.map((reg) => [
      reg.fullName,
      reg.email,
      reg.phone,
      reg.college,
      reg.department || 'N/A',
      reg.year || 'N/A',
      reg.isIEEEMember ? 'Yes' : 'No',
      reg.ieeeNumber || 'N/A',
      reg.price,
      reg.approved ? 'Yes' : 'No',
      new Date(reg.registeredAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `xploitix_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'CSV Exported',
      description: `Exported ${filteredRegistrations.length} registration(s) to CSV.`,
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
      toast({
        title: 'Logged Out',
        description: 'You have been logged out.',
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const totalRevenue = registrations.reduce((sum, r) => sum + r.price, 0);
  const ieeeCount = registrations.filter(r => r.isIEEEMember).length;
  const nonIeeeCount = registrations.length - ieeeCount;
  const approvedCount = registrations.filter(r => r.approved).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            <span className="text-primary">XPLOITIX</span> Admin
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">Registration Dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="cyber-outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
          <Button variant="cyber-outline" size="sm" onClick={loadRegistrations} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Registrations', value: registrations.length, icon: Users },
          { label: 'Approved', value: approvedCount, icon: Check },
          { label: 'IEEE Members', value: ieeeCount, icon: Crown },
          { label: 'Non-IEEE', value: nonIeeeCount, icon: User },
          { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: Users },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm"
          >
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-mono">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Registrations Table */}
      <div className="bg-card/50 border border-border rounded-lg backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-display font-bold text-foreground">All Registrations</h2>
          <Button variant="cyber" size="sm" onClick={handleExportCSV} disabled={registrations.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, email, phone, college, department, or IEEE number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground font-mono mt-2">
              Found {filteredRegistrations.length} result(s)
            </p>
          )}
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground font-mono">Loading registrations...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">
              {searchQuery ? 'No registrations match your search' : 'No registrations yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Name</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Email</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Phone</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">College</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Dept</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">IEEE</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Price</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Date</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Status</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredRegistrations.map((reg) => (
                    <motion.tr
                      key={reg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-border hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 text-sm font-mono text-foreground">{reg.fullName}</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">{reg.email}</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">{reg.phone}</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">{reg.college}</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">{reg.department || 'N/A'}</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">{reg.year || 'N/A'}</td>
                      <td className="p-4">
                        {reg.isIEEEMember ? (
                          <div className="flex flex-col">
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-primary">
                              <Crown className="w-3 h-3" /> Yes
                            </span>
                            {reg.ieeeNumber && (
                              <span className="text-xs font-mono text-muted-foreground mt-1">
                                #{reg.ieeeNumber}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs font-mono text-muted-foreground">No</span>
                        )}
                      </td>
                      <td className="p-4 text-sm font-mono text-primary">₹{reg.price}</td>
                      <td className="p-4 text-xs font-mono text-muted-foreground">
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <Button
                          variant={reg.approved ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleApprovalToggle(reg.id, reg.approved || false, reg.fullName)}
                          className={reg.approved ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {reg.approved ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Pending
                            </>
                          )}
                        </Button>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(reg.id, reg.fullName)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <RefreshCw className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CyberBackground />
      
      <div className="fixed inset-0 pointer-events-none scanlines opacity-[0.02] z-10" />

      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 sm:p-8">
        {isLoggedIn ? (
          <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <AdminLogin onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </div>
  );
};

export default Admin;
