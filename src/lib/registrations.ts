// Local storage utility for registrations (client-side only - not secure for production)

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
  isIEEEMember: boolean;
  price: number;
  registeredAt: string;
}

const STORAGE_KEY = '_registrations';

export const getRegistrations = (): Registration[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addRegistration = (registration: Omit<Registration, 'id' | 'registeredAt'>): Registration => {
  const registrations = getRegistrations();
  const newRegistration: Registration = {
    ...registration,
    id: crypto.randomUUID(),
    registeredAt: new Date().toISOString(),
  };
  registrations.push(newRegistration);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  return newRegistration;
};

export const deleteRegistration = (id: string): void => {
  const registrations = getRegistrations().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
};

export const clearAllRegistrations = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Admin credentials (NOT SECURE - for demo only)
const ADMIN_KEY = 'xploitix_admin';
const DEMO_PASSWORD = 'xploitix_2026';

export const isAdminLoggedIn = (): boolean => {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
};

export const adminLogin = (password: string): boolean => {
  if (password === DEMO_PASSWORD) {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
};

export const adminLogout = (): void => {
  sessionStorage.removeItem(ADMIN_KEY);
};
