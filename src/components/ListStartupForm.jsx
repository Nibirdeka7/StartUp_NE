// src/components/ListStartupForm.jsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import uploadStartupLogo from "../utils/uploadLogo";
import { supabase } from "../utils/supabaseClient";

// --- ZOD Schema for Validation ---
const formSchema = z.object({
  // Step 1: Basic Info
  name: z.string().min(2, "Startup name must be at least 2 characters."),
  founderName: z.string().min(2, "Founder name is required."),
  designation: z.string().min(2, "Designation is required (e.g. CEO, Founder)."),
  startupEmail: z.string().email("Please enter a valid email address."),
  contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number."),
  location: z.string().min(2, "Location is required."),
  description: z.string().min(50, "Description must be at least 50 characters."),
  
  // Step 2: Funding & Strategy
  stage: z.enum(["Ideation", "MVP", "Revenue", "Series A+", "Acquired"], { required_error: "Please select a stage." }),
  sector: z.string().min(2, "Sector is required."),
  currentValuation: z.string().optional(), // Optional since it might be sensitive/not yet calculated
  fundedBy: z.string().optional(),
  
  // Step 3: Media
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  // Individual Social Links
  facebook: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  logo: z
  .any()
  .optional()
  .refine(
    (file) => !file || file.size <= 1_000_000,
    "Logo must be less than 21MB"
  )
  .refine(
    (file) =>
      !file ||
      ["image/png", "image/jpeg", "image/webp"].includes(file.type),
    "Only PNG, JPG, or WEBP images are allowed"
  ),

  // Step 4: 
  feedback: z.string().min(10, "Please share a brief testimonial (min 10 characters)."),
}).refine((data) => {
  // Logic: One of these MUST be present
  return !!(data.facebook || data.instagram || data.linkedin || data.twitter);
}, {
  message: "At least one social media link is mandatory",
  path: ["linkedin"], 
});

const stages = ["Ideation", "MVP", "Revenue", "Series A+", "Acquired"];
const initialSectors = ["FinTech", "HealthTech", "AgriTech", "EdTech", "E-commerce", "Other"];

// The Multi-Step Form Component
export function ListStartupForm({ onSubmitSuccess }) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      founderName: "",
      designation: "",
      startupEmail: "",
      contact: "",
      location: "",
      description: "",
      stage: undefined,
      sector: "",
      currentValuation: "",
      fundedBy: "",
      website: "", facebook: "", instagram: "", linkedin: "", twitter: "", logo: undefined,
      feedback: "",
    },
  });

  const { trigger, getValues } = form;

  // --- Step Navigation Logic ---

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = [
        "name", "founderName", "startupEmail", "contact", "location", "description"
      ];
    } else if (step === 2) {
      fieldsToValidate = ["stage", "sector"]; // Valuation/FundedBy are optional
    } else if (step === 3) {
      fieldsToValidate = ["website", "facebook", "instagram", "linkedin", "twitter"];
    }
    if (step >= totalSteps) return;
    const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
    
    if (isValid && step < totalSteps) {
      setStep((prev) => prev + 1);
      setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10); // Scroll to top of modal for new step
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const onSubmit = async (data) => {
    const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("User not authenticated");
      }
  const isValid = await trigger();
  if (!isValid) return;

  try {
    // 1. Upload logo
    let logoPath = null;
    if (data.logo instanceof File) {
      logoPath = await uploadStartupLogo(data.logo, data.name);
    }

    // 2. Prepare final payload
    const payload = {
      user_id: user.id, 
      name: data.name,

      startup_email: data.startupEmail,
      contact: data.contact,
      location: data.location,
      description: data.description,
      stage: data.stage,
      sector: data.sector,
      current_valuation: data.currentValuation || null,
      funded_by: data.fundedBy || null,
      website: data.website || null,
      facebook: data.facebook || null,
      instagram: data.instagram || null,
      linkedin: data.linkedin || null,
      twitter: data.twitter || null,
      logo_path: logoPath, 
      feedback: data.feedback,

       founders: [
        {
          name: data.founderName,
          designation: data.designation,
        },
      ],
    };

    // 3. Insert into Supabase table
    const { error } = await supabase
      .from("startups")
      .insert(payload);

    if (error) throw error;

    onSubmitSuccess(payload);
  } catch (err) {
    console.error("Submission failed:", err.message);
  }
};


  // --- Render Functions for Each Step ---

  const renderStep1 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Startup Name</FormLabel>
            <FormControl>
              <Input placeholder="TechInnovate Solutions" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="founderName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Founder Name</FormLabel>
            <FormControl>
              <Input placeholder="Priya Sharma" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-oxford-blue">Designation</FormLabel>
              <FormControl><Input placeholder="CEO / Founder" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormField
        control={form.control}
        name="startupEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Startup Email</FormLabel>
            <FormControl>
              <Input placeholder="contact@techinnovate.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Contact Number</FormLabel>
            <FormControl>
              <Input placeholder="9876543210" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Headquarters Location (City, State)</FormLabel>
            <FormControl>
              <Input placeholder="Guwahati, Assam" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-oxford-blue">Detailed Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what your startup does, its mission, and its impact in the Northeast."
                  rows={5}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="stage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Current Stage</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your current stage" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sector"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Primary Sector</FormLabel>
            <FormControl>
              <Input placeholder="e.g., AgriTech, Tourism, EdTech" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="currentValuation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Current Valuation (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="₹5 Crore (approx.)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fundedBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue">Funded By (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Angel Investors, SIDBI, Self-Funded" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField control={form.control} name="website" render={({ field }) => (
        <FormItem><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="linkedin" render={({ field }) => (
        <FormItem><FormLabel>LinkedIn</FormLabel><FormControl><Input placeholder="LinkedIn URL" {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="facebook" render={({ field }) => (
        <FormItem><FormLabel>Facebook</FormLabel><FormControl><Input placeholder="Facebook URL" {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="instagram" render={({ field }) => (
        <FormItem><FormLabel>Instagram</FormLabel><FormControl><Input placeholder="Instagram URL" {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="twitter" render={({ field }) => (
        <FormItem><FormLabel>Twitter</FormLabel><FormControl><Input placeholder="Twitter URL" {...field} /></FormControl><FormMessage /></FormItem>
      )} />
      <FormField control={form.control} name="logo" render={({ field }) => (
        <FormItem className="md:col-span-2"><FormLabel>Logo</FormLabel><FormControl><Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} /></FormControl><FormMessage /></FormItem>
      )} />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="feedback"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-oxford-blue text-lg">Your Feedback</FormLabel>
            <p className="text-sm text-gray-500 mb-2">How do you feel about this Innovation Startup Northeast initiative? Your response will be featured in our testimonial section.</p>
            <FormControl>
              <Textarea 
                placeholder="Share your experience or thoughts with us..." 
                rows={6} 
                className="resize-none" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center text-sm font-poppins">
          <span className="font-semibold text-red-700">Step {step} of {totalSteps}</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-10 h-1 rounded-full ${
                  s <= step ? "bg-red-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Render Current Step */}
          <div onClick={(e) => e.stopPropagation()}>
    {/* Render Current Step */}
            <div className="space-y-4">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </div>
          </div>


        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={step === 1 || form.formState.isSubmitting}
            className="font-poppins border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {/* Show NEXT button for Steps 1 and 2, 3 */}
          {step < 4 && (
            <Button
              type="button"
              onClick={handleNextStep}
              className="bg-red-600 hover:bg-red-700 font-poppins"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {/* Show SUBMIT button ONLY on Step 4 */}
          {step === 4 && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-red-600 hover:bg-red-700 font-poppins"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Startup"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}