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
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const handleSendOtp = () => {
    // Here you would typically send the OTP to the user's email
    console.log('Sending OTP to:', email)
    setIsOtpSent(true)
  }

  const handleVerifyOtp = () => {
    // Here you would typically verify the OTP
    console.log('Verifying OTP:', otp)
    setIsOpen(false)
    setIsOtpSent(false)
    setEmail('')
    setOtp('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="underline">Forgot password?</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isOtpSent ? 'Enter OTP' : 'Forgot Password'}</DialogTitle>
          <DialogDescription>
            {isOtpSent
              ? 'Enter the OTP sent to your email address.'
              : 'Enter your email address to receive a one-time password (OTP).'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isOtpSent ? (
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
          <Button onClick={isOtpSent ? handleVerifyOtp : handleSendOtp} type="submit">
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

