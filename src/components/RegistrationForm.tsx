import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollReveal } from './ScrollReveal';
import { Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Firebase imports
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  isIEEEMember: string;
  ieeeNumber: string;
}

export const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    isIEEEMember: 'no',
    ieeeNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isIEEE = formData.isIEEEMember === 'yes';
      const price = isIEEE ? 899 : 999;

      // Store registration in Firebase Firestore
      await addDoc(collection(db, 'registrations'), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        isIEEEMember: isIEEE,
        ieeeNumber: isIEEE ? formData.ieeeNumber : '',
        price,
        registeredAt: new Date().toISOString(),
        createdAt: serverTimestamp(), // For server-side timestamp
      });

      setIsSuccess(true);

      toast({
        title: "Registration Successful!",
        description: `You have been registered for XPLOITIX. Amount: ₹${price}`,
      });

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          college: '',
          department: '',
          isIEEEMember: 'no',
          ieeeNumber: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isIEEEMember = formData.isIEEEMember === 'yes';

  return (
    <ScrollReveal>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> Full Name
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> Email
            </label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> Phone Number
            </label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>

          {/* College */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> College / Organization
            </label>
            <Input
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              placeholder="Enter college name"
              required
            />
          </div>

          {/* Department */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> Department / Year
            </label>
            <Input
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="e.g., CSE / 3rd Year"
              required
            />
          </div>

          {/* IEEE Member */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> IEEE Member?
            </label>
            <select
              name="isIEEEMember"
              value={formData.isIEEEMember}
              onChange={handleInputChange}
              className="flex h-12 w-full rounded-md border-2 border-border bg-card px-4 py-2 text-base text-foreground font-mono ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[0_0_15px_hsl(120_100%_50%/0.2)] md:text-sm appearance-none cursor-pointer"
            >
              <option value="no">No (₹999)</option>
              <option value="yes">Yes (₹899)</option>
            </select>
          </div>

          {/* IEEE Number - Conditional */}
          {isIEEEMember && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative group md:col-span-2"
            >
              <label className="block text-sm text-muted-foreground mb-2 font-mono">
                <span className="text-primary">&gt;</span> IEEE Membership Number
              </label>
              <Input
                name="ieeeNumber"
                value={formData.ieeeNumber}
                onChange={handleInputChange}
                placeholder="Enter your IEEE membership number"
                required={isIEEEMember}
              />
            </motion.div>
          )}
        </div>

        {/* Price Display */}
        <motion.div
          className="bg-card/50 border-2 border-primary/20 rounded-lg p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-muted-foreground">Registration Fee:</span>
            <span className="text-2xl font-display font-bold text-primary">
              ₹{isIEEEMember ? '899' : '999'}
            </span>
          </div>
          {isIEEEMember && (
            <p className="text-xs text-green-500 font-mono mt-2">
              ✓ IEEE Member Discount Applied
            </p>
          )}
        </motion.div>

        {/* Submit Button */}
        <div className="pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              variant="cyber"
              size="xl"
              className="w-full"
              disabled={isSubmitting || isSuccess}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : isSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Registered!
                </motion.div>
              ) : (
                'Register Now'
              )}
            </Button>
          </motion.div>
        </div>

        {/* Terminal style message */}
        <p className="text-center text-xs text-muted-foreground font-mono">
          <span className="text-primary">[</span>
          Secure connection established
          <span className="text-primary">]</span>
        </p>
      </form>
    </ScrollReveal>
  );
};