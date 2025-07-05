"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Users, MessageSquare, TrendingUp, Settings, Ban } from "lucide-react";
import { mockUsers, mockCases, mockReferrals, updateUserPlan, User } from "@/lib/database";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "pythalienofficial@gmail.com";

export default function AdminPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    freeUsers: 0,
    payAsYouGoUsers: 0,
    premiumUsers: 0,
    totalCases: 0,
    totalReferrals: 0,
  });
  const router = useRouter();

  useEffect(() => {
    console.log("AdminPage mounted, checking authorization");
    
    if (isLoaded) {
      const email = clerkUser?.emailAddresses[0]?.emailAddress;
      console.log("User email:", email, "Admin email:", ADMIN_EMAIL);
      
      if (email === ADMIN_EMAIL) {
        setIsAuthorized(true);
        loadStats();
      } else {
        console.log("Unauthorized access attempt");
        router.push("/not-authorized");
      }
      setIsLoading(false);
    }
  }, [isLoaded, clerkUser, router]);

  const loadStats = () => {
    console.log("Loading admin stats");
    setStats({
      totalUsers: mockUsers.length,
      freeUsers: mockUsers.filter(u => u.plan === 'free').length,
      payAsYouGoUsers: mockUsers.filter(u => u.plan === 'payasyougo').length,
      premiumUsers: mockUsers.filter(u => u.plan === 'premium').length,
      totalCases: mockCases.length,
      totalReferrals: mockReferrals.length,
    });
  };

  const handlePlanChange = (userId: string, newPlan: User['plan']) => {
    console.log("Changing plan for user:", userId, "to:", newPlan);
    updateUserPlan(userId, newPlan);
    loadStats();
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-slate-100 text-slate-800';
      case 'payasyougo': return 'bg-yellow-100 text-yellow-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'free': return 'Free Trial';
      case 'payasyougo': return 'Pay-as-You-Go';
      case 'premium': return 'Premium';
      default: return plan;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-slate-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Ban className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Unauthorized access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <Badge variant="destructive">
            Admin Access
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
                <p className="text-xs text-slate-500">Registered users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Premium Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.premiumUsers}</div>
                <p className="text-xs text-slate-500">Active premium subscriptions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Total Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.totalCases}</div>
                <p className="text-xs text-slate-500">AI legal cases processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.totalReferrals}</div>
                <p className="text-xs text-slate-500">Total referrals made</p>
              </CardContent>
            </Card>
          </div>

          {/* Plan Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Plan Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-800">{stats.freeUsers}</div>
                  <div className="text-sm text-slate-600">Free Trial</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-800">{stats.payAsYouGoUsers}</div>
                  <div className="text-sm text-yellow-600">Pay-as-You-Go</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{stats.premiumUsers}</div>
                  <div className="text-sm text-blue-600">Premium</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Users Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No users registered yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Free Trials</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Referral Code</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.firstName} {user.lastName}</div>
                              <div className="text-sm text-slate-500">ID: {user.id}</div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getPlanBadgeColor(user.plan)}>
                              {getPlanName(user.plan)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.freeTrialsUsed} / 3</TableCell>
                          <TableCell>{user.credits}</TableCell>
                          <TableCell>
                            <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                              {user.referralCode}
                            </code>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.plan}
                              onValueChange={(value) => handlePlanChange(user.id, value as User['plan'])}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="payasyougo">Pay-as-You-Go</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Recent Legal Cases</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockCases.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No cases processed yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockCases.slice(0, 10).map((case_) => (
                    <div key={case_.id} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={case_.isChat ? "default" : "secondary"}>
                            {case_.isChat ? "Chat" : "Single Input"}
                          </Badge>
                          <span className="text-sm text-slate-500">
                            {new Date(case_.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <code className="text-xs bg-white px-2 py-1 rounded">
                          {case_.userId}
                        </code>
                      </div>
                      <p className="text-sm text-slate-700 truncate">
                        {case_.input}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}