import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollReveal } from './ScrollReveal';
import { Check, Loader2, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Firebase imports
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Supabase imports
import { supabase } from "@/lib/supabase";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
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
    year: '',
    isIEEEMember: 'no',
    ieeeNumber: '',
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please upload an image file (PNG, JPG, JPEG)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setPaymentScreenshot(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setPaymentScreenshot(null);
    setPreviewUrl(null);
  };

  const uploadImageToSupabase = async (file: File, registrationId: string): Promise<string> => {
    try {
      // Create a unique file name
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `${registrationId}_${timestamp}.${fileExt}`;
      const filePath = `payment-screenshots/${fileName}`;

      // Upload file to Supabase Storage
      const { error } = await supabase.storage
        .from('registrations')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('registrations')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading to Supabase:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate payment screenshot
    if (!paymentScreenshot) {
      toast({
        title: "Payment Screenshot Required",
        description: "Please upload your payment screenshot",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isIEEE = formData.isIEEEMember === 'yes';
      const price = isIEEE ? 899 : 999;

      // First, create the registration document
      const docRef = await addDoc(collection(db, 'registrations'), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        department: formData.department,
        year: formData.year,
        isIEEEMember: isIEEE,
        ieeeNumber: isIEEE ? formData.ieeeNumber : '',
        price,
        registeredAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
        paymentStatus: 'pending',
        paymentScreenshotUrl: '',
      });

      // Upload image to Supabase Storage
      const imageUrl = await uploadImageToSupabase(paymentScreenshot, docRef.id);

      // Update the Firestore document with the image URL
      await updateDoc(doc(db, 'registrations', docRef.id), {
        paymentScreenshotUrl: imageUrl,
      });

      setIsSuccess(true);

      toast({
        title: "Registration Successful!",
        description: `You have been registered for From Click to Control. Amount: ₹${price}`,
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
          year: '',
          isIEEEMember: 'no',
          ieeeNumber: '',
        });
        removeFile();
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
              <span className="text-primary">&gt;</span> Department
            </label>
            <Input
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="e.g., CSE, ECE, EEE"
              required
            />
          </div>

          {/* Year */}
          <div className="relative group">
            <label className="block text-sm text-muted-foreground mb-2 font-mono">
              <span className="text-primary">&gt;</span> Year
            </label>
            <Input
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="e.g., 1st, 2nd, 3rd, 4th"
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

        {/* Payment Screenshot Upload */}
        <div className="relative group">
          <label className="block text-sm text-muted-foreground mb-2 font-mono">
            <span className="text-primary">&gt;</span> Payment Screenshot *
          </label>
          
          {!previewUrl ? (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="payment-screenshot"
              />
              <label
                htmlFor="payment-screenshot"
                className="flex flex-col items-center justify-center h-32 w-full rounded-md border-2 border-dashed border-border bg-card/50 px-4 py-6 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-card/70 hover:shadow-[0_0_15px_hsl(120_100%_50%/0.1)]"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm font-mono text-muted-foreground">
                  Click to upload payment screenshot
                </span>
                <span className="text-xs text-muted-foreground/60 mt-1">
                  PNG, JPG or JPEG (Max 5MB)
                </span>
              </label>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-md border-2 border-primary/20 bg-card/50 p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 border-border">
                  <img
                    src={previewUrl}
                    alt="Payment screenshot preview"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono text-foreground truncate">
                        {paymentScreenshot?.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">
                        {(paymentScreenshot!.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-1.5 flex-1 bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-primary rounded-full" />
                    </div>
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </div>
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
