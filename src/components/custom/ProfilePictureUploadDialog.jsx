'use client'

import React, { useState, useRef, useEffect } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraIcon, Upload, X } from 'lucide-react'

export function ProfilePictureUploadDialog({ onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [activeTab, setActiveTab] = useState('camera')
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera()
    } else {
      stopCamera()
    }
  }, [isOpen, activeTab])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        console.log("Camera started")
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setImagePreview(imageDataUrl)
        stopCamera()
      }
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (imagePreview) {
      onSave(imagePreview)
      setIsOpen(false)
      setImagePreview(null)
    }
  }

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (!open) {
      stopCamera()
      setImagePreview(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className='w-full'>Upload Profile Picture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
          <DialogDescription>
            Choose a method to upload your profile picture.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          {!imagePreview && (
            <TabsContent value="camera">
              <div className="mt-4 relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg" />
                <Button onClick={capturePhoto} className="mt-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <CameraIcon className="mr-2 h-4 w-4" />
                  Capture Photo
                </Button>
              </div>
            </TabsContent>
          )}
          <TabsContent value="upload">
            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        {imagePreview && (
          <div className="mt-4 relative">
            <img src={imagePreview} alt="Preview" className="w-full h-80 rounded-lg" />
            <Button
              onClick={() => setImagePreview(null)}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleSave} disabled={!imagePreview}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </Dialog>
  )
}

