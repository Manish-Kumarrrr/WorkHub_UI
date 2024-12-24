"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { format, parseISO } from "date-fns"

// export type Task = {
//   taskId: string
//   userId: string
//   tag: string
//   pay: string | null
//   email: string | null
//   phoneNo: string
//   createdDate: string | null
//   images: string[] | null
//   status: string
//   description: string
//   lattitude: string | null
//   longitude: string | null
//   address: string | null
//   city: string | null
//   state: string | null
//   pincode: string | null
// }

// type TaskListProps = {
//   tasks: Task[]
//   lastTaskRef?: (node?: Element | null) => void
// }

function ImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
        No Image
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={`Task image ${currentImageIndex + 1}`}
          className="w-full h-64 object-cover rounded-lg cursor-pointer"
          onClick={() => setIsZoomed(true)}
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
          <div className="relative w-full h-full">
            <img
              src={images[currentImageIndex]}
              alt={`Zoomed task image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoomed view"
            >
              <X className="h-4 w-4" />
            </Button>
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function TaskList({ tasks, lastTaskRef }) {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <Card 
          key={`${task.taskId}-${index}`} 
          className="overflow-hidden"
          ref={index === tasks.length - 1 ? lastTaskRef : undefined}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
                <ImageCarousel images={task.images} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{task.taskId}</h3>
                  <Badge variant={task.status.toLowerCase() === 'active' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  <div><span className="font-semibold">Tag:</span> {task.tag}</div>
                  <div><span className="font-semibold">Pay:</span> {task.pay || 'N/A'}</div>
                  <div><span className="font-semibold">Date:</span> {task.createdDate ? format(parseISO(task.createdDate), 'dd/MM/yyyy') : 'N/A'}</div>
                  <div><span className="font-semibold">Email:</span> {task.email || 'N/A'}</div>
                  <div><span className="font-semibold">Phone:</span> {task.phoneNo}</div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Description:</span>
                  <p className="mt-1 text-sm">{task.description}</p>
                </div>
                {(task.address || task.city || task.state || task.pincode) && (
                  <div>
                    <span className="font-semibold">Address:</span>
                    <p className="mt-1 text-sm">
                      {[task.address, task.city, task.state, task.pincode].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

