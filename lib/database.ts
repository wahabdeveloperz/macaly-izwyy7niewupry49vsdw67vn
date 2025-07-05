export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  plan: 'free' | 'payasyougo' | 'premium';
  freeTrialsUsed: number;
  credits: number;
  referralCode: string;
  referredBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalCase {
  id: string;
  userId: string;
  input: string;
  response: string;
  isChat: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  caseId: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  rewardClaimed: boolean;
  createdAt: Date;
}

export interface WhatsAppUpgradeRequest {
  id: string;
  userId: string;
  email: string;
  currentPlan: string;
  requestedPlan: string;
  processed: boolean;
  createdAt: Date;
}

// Mock database functions for demo purposes
// In production, replace with actual database calls
export const mockUsers: User[] = [];
export const mockCases: LegalCase[] = [];
export const mockReferrals: Referral[] = [];

export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function getUserByEmail(email: string): User | undefined {
  console.log("Getting user by email:", email);
  return mockUsers.find(u => u.email === email);
}

export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
  console.log("Creating user:", userData);
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  mockUsers.push(newUser);
  return newUser;
}

export function updateUserPlan(userId: string, plan: User['plan']): void {
  console.log("Updating user plan:", userId, plan);
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.plan = plan;
    user.updatedAt = new Date();
  }
}

export function incrementFreeTrials(userId: string): void {
  console.log("Incrementing free trials for user:", userId);
  const user = mockUsers.find(u => u.id === userId);
  if (user) {
    user.freeTrialsUsed += 1;
    user.updatedAt = new Date();
  }
}

export function createLegalCase(caseData: Omit<LegalCase, 'id' | 'createdAt'>): LegalCase {
  console.log("Creating legal case:", caseData);
  const newCase: LegalCase = {
    ...caseData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date(),
  };
  mockCases.push(newCase);
  return newCase;
}

export function getUserCases(userId: string): LegalCase[] {
  console.log("Getting cases for user:", userId);
  return mockCases.filter(c => c.userId === userId);
}

export function createReferral(referralData: Omit<Referral, 'id' | 'createdAt'>): Referral {
  console.log("Creating referral:", referralData);
  const newReferral: Referral = {
    ...referralData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date(),
  };
  mockReferrals.push(newReferral);
  return newReferral;
}

export function getReferralsByUser(userId: string): Referral[] {
  console.log("Getting referrals for user:", userId);
  return mockReferrals.filter(r => r.referrerId === userId);
}