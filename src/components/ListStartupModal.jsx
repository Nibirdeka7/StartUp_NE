// src/components/ListStartupModal.jsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/separator";
import { Building2, ArrowLeft, ArrowRight, CheckCircle, X } from "lucide-react";

// Import the multi-step form content
import { ListStartupForm } from "./ListStartupForm"; 

export function ListStartupModal({ isOpen, onClose }) {
  // We'll manage the state of the form submission here
  const [isSubmitted, setIsSubmitted] = useState(false);

  // A handler to be called when the form is successfully submitted
  const handleSubmissionSuccess = (data) => {
    console.log("Startup Data Submitted:", data);
    // You would typically send this data to your backend here.
    setIsSubmitted(true);
    // You can set a timeout to close the modal after a few seconds
    setTimeout(() => {
        onClose();
        setIsSubmitted(false); // Reset for next time
    }, 4000);
  };

  const handleClose = () => {
    // Only close if not in the middle of a submission success message
    if (!isSubmitted) {
        onClose();
    }
  }

  const renderContent = () => {
    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 px-4 sm:px-6">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4 sm:mb-6" />
                <DialogTitle className="font-montserrat text-2xl sm:text-3xl text-oxford-blue text-center">
                    Submission Successful!
                </DialogTitle>
                <p className="font-poppins text-base sm:text-lg text-slate-700 mt-3 sm:mt-4 text-center px-2">
                    Thank you for listing your startup. We will review your submission shortly & update you over your email.
                </p>
                <Button onClick={onClose} className="mt-6 sm:mt-8 bg-red-600 hover:bg-red-700 w-full sm:w-auto px-8">
                    Close
                </Button>
            </div>
        );
    }
    
    return (
        <ListStartupForm onSubmitSuccess={handleSubmissionSuccess} />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Responsive max-width for mobile and desktop */}
      <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[90vh] overflow-y-auto font-poppins p-0">
        {/* Close button for mobile */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 sm:hidden z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X size={20} />
        </button>
        
        <div className="px-4 sm:px-6 py-4">
          <DialogHeader className="text-left">
            <div className="flex items-center space-x-3 text-red-700">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                <DialogTitle className="font-montserrat text-xl sm:text-2xl font-bold">
                  List Your Startup
                </DialogTitle>
            </div>
            <DialogDescription className="font-poppins text-sm sm:text-base text-slate-600 pt-1">
              Fill in the details to showcase your venture to the Startup Northeast ecosystem.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <Separator />
        
        <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto max-h-[60vh]">
          {renderContent()}
        </div>

      </DialogContent>
    </Dialog>
  );
}