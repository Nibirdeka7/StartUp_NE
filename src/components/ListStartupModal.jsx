// src/components/ListStartupModal.jsx

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Building2, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

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
            <div className="flex flex-col items-center justify-center py-10 px-6">
                <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                <DialogTitle className="font-montserrat text-3xl text-oxford-blue text-center">
                    Submission Successful!
                </DialogTitle>
                <p className="font-poppins text-lg text-slate-700 mt-4 text-center">
                    Thank you for listing your startup. We will review your submission shortly.
                </p>
                <Button onClick={onClose} className="mt-8 bg-red-600 hover:bg-red-700">
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
      {/* Increased max-width for a better form layout */}
      <DialogContent className="sm:max-w-[700px] font-poppins">
        <DialogHeader>
          <div className="flex items-center space-x-3 text-red-700">
              <Building2 className="w-7 h-7" />
              <DialogTitle className="font-montserrat text-2xl font-bold">
                List Your Startup
              </DialogTitle>
          </div>
          <DialogDescription className="font-poppins text-slate-600 pt-1">
            Fill in the details to showcase your venture to the Startup Northeast ecosystem.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        
        {renderContent()}

      </DialogContent>
    </Dialog>
  );
}