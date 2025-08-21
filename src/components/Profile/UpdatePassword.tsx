'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axiosInstance';
import { Eye, EyeOff, Lock, Check, AlertCircle, Loader2 } from 'lucide-react';
import useStore from '@/lib/Zustand';

interface PasswordStrength {
  score: number;
  checks: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export default function UpdatePasswordCard() {
  const { userId } = useStore(); // fetch userId from Zustand

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    checks: { length: false, lowercase: false, uppercase: false, number: false, special: false },
  });

  const toggleCurrent = () => setShowCurrent(!showCurrent);
  const toggleNew = () => setShowNew(!showNew);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStrength({
      score: 0,
      checks: { length: false, lowercase: false, uppercase: false, number: false, special: false },
    });
  };

  const evaluatePasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    const score = Object.values(checks).filter(Boolean).length;
    setPasswordStrength({ score, checks });
  };

  useEffect(() => {
    if (newPassword) evaluatePasswordStrength(newPassword);
  }, [newPassword]);

  const handleChangePassword = async () => {
    if (!userId) {
      toast.error('User ID not found.');
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams({ user_id: userId });
      await axiosInstance.post(
        `/api/v1/users/change-password?${params.toString()}`,
        new URLSearchParams({
          current_password: currentPassword,
          new_password: newPassword,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      toast.success('Password changed successfully!');
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ['Weak', 'Moderate', 'Strong', 'Very Strong'];
  const strengthColor =
    passwordStrength.score <= 2
      ? 'text-destructive'
      : passwordStrength.score === 3
      ? 'text-yellow-500'
      : passwordStrength.score === 4
      ? 'text-blue-500'
      : 'text-green-600';

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <Lock className="h-5 w-5" />
          <span className="text-xl font-semibold text-yellow-600">Update Password</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-sm text-muted-foreground">
            Keep your account secure by updating your password regularly.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
                <Lock className="h-4 w-4" />
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </DialogTitle>
                <DialogDescription>
                  Enter your current password and choose a new secure password.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <div className="relative">
                    <Input
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="pr-10"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={toggleCurrent}
                      disabled={loading}
                    >
                      {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <div className="relative">
                    <Input
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="pr-10"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={toggleNew}
                      disabled={loading}
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {newPassword && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Password strength:</span>
                        <span className={strengthColor}>{strengthLabel[passwordStrength.score - 1]}</span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength.score
                                ? level <= 2
                                  ? 'bg-destructive'
                                  : level === 3
                                  ? 'bg-yellow-500'
                                  : level === 4
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="pr-10"
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={toggleConfirm}
                      disabled={loading}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Passwords do not match
                    </p>
                  )}

                  {currentPassword && newPassword && currentPassword === newPassword && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> New password must be different from current password
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  disabled={
                    loading ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword ||
                    passwordStrength.score < 3 ||
                    currentPassword === newPassword
                  }
                  className="gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {loading ? 'Changing...' : 'Change Password'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
