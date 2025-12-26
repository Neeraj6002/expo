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
  Search,
  Image,
  ZoomIn,
  ShieldAlert
} from 'lucide-react';

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
  updateDoc,
  getDoc
} from 'firebase/firestore';

// ============================================
// WHITELIST CONFIGURATION
// Add authorized admin email addresses here
// ============================================
const ADMIN_WHITELIST = [
  'neerajj6002@gmail.com',
  'vivekexists@gmail.com',
  'vigneshnarrayan@ieee.org',
  'gspk2006@gmail.com',
  'adithyanath.s10b@gmail.com',
  'ananthapadmanabhanprakash@ieee.org',
  'pjneeraj6002@gmail.com',
  // Add more authorized emails here
];

// Helper function to check if email is whitelisted
const isEmailWhitelisted = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return ADMIN_WHITELIST.includes(email.toLowerCase().trim());
};

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
  paymentScreenshotUrl?: string;
}

const ImageModal = ({ imageUrl, onClose }: { imageUrl: string; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl max-h-[90vh] bg-card border-2 border-primary rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="destructive"
            size="sm"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-auto max-h-[90vh]">
          <img
            src={imageUrl}
            alt="Payment screenshot"
            className="w-full h-auto"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

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

    // Check whitelist before attempting login
    if (!isEmailWhitelisted(email)) {
      setError('Access denied: Email not authorized');
      setLoading(false);
      toast({
        title: 'Access Denied',
        description: 'Your email is not authorized to access this panel.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Double-check whitelist after successful authentication
      if (!isEmailWhitelisted(userCredential.user.email)) {
        await signOut(auth);
        setError('Access denied: Email not authorized');
        toast({
          title: 'Access Denied',
          description: 'Your email is not authorized to access this panel.',
          variant: 'destructive',
        });
        return;
      }

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
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if the Google account email is whitelisted
      if (!isEmailWhitelisted(result.user.email)) {
        await signOut(auth);
        setError('Access denied: Email not authorized');
        toast({
          title: 'Access Denied',
          description: 'Your Google account is not authorized to access this panel.',
          variant: 'destructive',
        });
        return;
      }

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
      toast({
        title: 'Sign-in Failed',
        description: errorMessage,
        variant: 'destructive',
      });
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
          <p className="text-sm text-muted-foreground font-mono mt-2">Restricted Access - Authorized Personnel Only</p>
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md"
            >
              <ShieldAlert className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm font-mono">{error}</p>
            </motion.div>
          )}

          <Button type="submit" variant="cyber" className="w-full" disabled={loading || googleLoading}>
            {loading ? 'Verifying Access...' : 'Access Panel'}
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
          {googleLoading ? 'Verifying...' : 'Sign in with Google'}
        </Button>

        <div className="mt-6 p-3 bg-muted/50 border border-border rounded-md">
          <p className="text-xs text-muted-foreground font-mono text-center">
            🔒 This panel is restricted to authorized administrators only
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set current user email
    if (auth.currentUser?.email) {
      setCurrentUserEmail(auth.currentUser.email);
    }
  }, []);

  const loadRegistrations = async (forceRefresh = false) => {
    try {
      setLoading(true);
      
      if (forceRefresh) {
        console.log('Force refreshing registrations from Firestore...');
      }
      
      const q = query(collection(db, 'registrations'), orderBy('registeredAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const regs: Registration[] = [];
      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        regs.push({ 
          id: docSnapshot.id, 
          ...data,
          approved: data.approved ?? false
        } as Registration);
      });
      
      console.log(`Successfully loaded ${regs.length} registrations from Firestore`);
      
      setRegistrations(regs);
      setFilteredRegistrations(regs);
      
      if (forceRefresh) {
        toast({
          title: 'Data Refreshed',
          description: `Loaded ${regs.length} registration(s) from database.`,
        });
      }
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
    loadRegistrations(true);
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
    if (!auth.currentUser) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in again to perform this action.',
        variant: 'destructive',
      });
      return;
    }

    // Verify user is still whitelisted
    if (!isEmailWhitelisted(auth.currentUser.email)) {
      toast({
        title: 'Access Denied',
        description: 'You are not authorized to perform this action.',
        variant: 'destructive',
      });
      await signOut(auth);
      onLogout();
      return;
    }

    try {
      const docRef = doc(db, 'registrations', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        toast({
          title: 'Stale Data Detected',
          description: 'This registration was deleted or modified. Refreshing...',
          variant: 'destructive',
        });
        await loadRegistrations(true);
        return;
      }
      
      const newApprovedStatus = !currentStatus;
      await updateDoc(docRef, {
        approved: newApprovedStatus
      });
      
      setRegistrations(prev => prev.map(reg => 
        reg.id === id ? { ...reg, approved: newApprovedStatus } : reg
      ));
      setFilteredRegistrations(prev => prev.map(reg => 
        reg.id === id ? { ...reg, approved: newApprovedStatus } : reg
      ));
      
      toast({
        title: newApprovedStatus ? 'Registration Approved' : 'Approval Revoked',
        description: `${name}'s registration has been ${newApprovedStatus ? 'approved' : 'unapproved'}.`,
      });
    } catch (error: any) {
      console.error('Approval toggle error:', error);
      
      let errorMessage = 'Failed to update approval status.';
      
      if (error.code === 'not-found') {
        errorMessage = 'Registration not found. Refreshing list...';
        await loadRegistrations();
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firebase rules and authentication.';
      }
      
      toast({
        title: 'Update Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}'s registration? This action cannot be undone.`)) {
      return;
    }

    if (!auth.currentUser) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in again to perform this action.',
        variant: 'destructive',
      });
      return;
    }

    // Verify user is still whitelisted
    if (!isEmailWhitelisted(auth.currentUser.email)) {
      toast({
        title: 'Access Denied',
        description: 'You are not authorized to perform this action.',
        variant: 'destructive',
      });
      await signOut(auth);
      onLogout();
      return;
    }

    try {
      const docRef = doc(db, 'registrations', id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        toast({
          title: 'Document Not Found',
          description: 'This registration no longer exists. Refreshing list...',
          variant: 'destructive',
        });
        await loadRegistrations();
        return;
      }
      
      await deleteDoc(docRef);
      
      setRegistrations(prev => prev.filter(reg => reg.id !== id));
      setFilteredRegistrations(prev => prev.filter(reg => reg.id !== id));
      
      toast({
        title: 'Registration Deleted',
        description: `Successfully removed ${name} from registrations.`,
      });
    } catch (error: any) {
      console.error('Delete error:', error);
      
      let errorMessage = 'Failed to delete registration.';
      
      if (error.code === 'not-found') {
        errorMessage = 'Registration not found. Refreshing list...';
        await loadRegistrations();
      } else if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check Firebase rules and authentication.';
      }
      
      toast({
        title: 'Delete Failed',
        description: errorMessage,
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
      'Registration Date',
      'Payment Screenshot URL'
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
      new Date(reg.registeredAt).toLocaleString(),
      reg.paymentScreenshotUrl || 'N/A'
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
  const ieeeCSCount = registrations.filter(r => 
    r.isIEEEMember && (
      r.college.toLowerCase().includes('computer') ||
      r.department?.toLowerCase().includes('computer') ||
      r.department?.toLowerCase().includes('cs')
    )
  ).length;
  const nonIeeeCount = registrations.length - ieeeCount;
  const approvedCount = registrations.filter(r => r.approved).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto"
    >
      <AnimatePresence>
        {selectedImage && (
          <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            <span className="text-primary">FROM CLICK TO CTRL</span> Admin
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            Registration Dashboard • {currentUserEmail}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="cyber-outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
          <Button variant="cyber-outline" size="sm" onClick={() => loadRegistrations(true)} disabled={loading}>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Total Registrations', value: registrations.length, icon: Users },
          { label: 'Approved', value: approvedCount, icon: Check },
          { label: 'IEEE Members', value: ieeeCount, icon: Crown },
          { label: 'IEEE CS Members', value: ieeeCSCount, icon: Crown },
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
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Year</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">IEEE</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Price</th>
                  <th className="text-left p-4 text-xs font-mono text-muted-foreground uppercase">Payment</th>
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
                      <td className="p-4">
                        {reg.paymentScreenshotUrl ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedImage(reg.paymentScreenshotUrl!)}
                            className="text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <ZoomIn className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        ) : (
                          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            None
                          </span>
                        )}
                      </td>
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
      // Check if user is authenticated AND whitelisted
      if (user && isEmailWhitelisted(user.email)) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Sign out if authenticated but not whitelisted
        if (user && !isEmailWhitelisted(user.email)) {
          signOut(auth);
        }
      }
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
