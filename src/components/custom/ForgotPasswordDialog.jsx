'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSendOtp = () => {
    // Here you would typically send the OTP to the user's email
    console.log('Sending OTP to:', email)
    setIsOtpSent(true)
  }

  const handleVerifyOtp = () => {
    // Here you would typically verify the OTP
    console.log('Verifying OTP:', otp)
    setIsPasswordReset(true)
  }

  const handlePasswordReset = () => {
    setPasswordError('');
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    // Here you would typically send the new password to your server
    console.log('Resetting password:', newPassword)
    setIsOpen(false)
    setIsOtpSent(false)
    setIsPasswordReset(false)
    setEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="underline">Forgot password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isPasswordReset ? 'Reset Password' : isOtpSent ? 'Enter OTP' : 'Forgot Password'}
          </DialogTitle>
          <DialogDescription>
            {isPasswordReset
              ? 'Enter your new password.'
              : isOtpSent
              ? 'Enter the OTP sent to your email address.'
              : 'Enter your email address to receive a one-time password (OTP).'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isPasswordReset ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter new password"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="col-span-3"
                  placeholder="Confirm new password"
                />
              </div>
              <div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-2 col-start-2 col-span-3">{passwordError}</p>
              )}
              </div>
            </>
          ) : isOtpSent ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otp" className="text-right">
                OTP
              </Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="col-span-3"
                placeholder="Enter OTP"
              />
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="Enter your email"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button 
            onClick={isPasswordReset ? handlePasswordReset : isOtpSent ? handleVerifyOtp : handleSendOtp} 
            type="submit"
          >
            {isPasswordReset ? 'Reset Password' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

