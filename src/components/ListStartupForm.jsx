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
import { ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
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
  currentValuation: z.string().optional(),
  fundedBy: z.string().optional(),
  
  // Step 3: Media
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
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
  return !!(data.facebook || data.instagram || data.linkedin || data.twitter);
}, {
  message: "At least one social media link is mandatory",
  path: ["linkedin"], 
});

const stages = ["Ideation", "MVP", "Revenue", "Series A+", "Acquired"];

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

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = [
        "name", "founderName", "designation", "startupEmail", "contact", "location", "description"
      ];
    } else if (step === 2) {
      fieldsToValidate = ["stage", "sector"];
    } else if (step === 3) {
      fieldsToValidate = ["website", "facebook", "instagram", "linkedin", "twitter"];
    }
    if (step >= totalSteps) return;
    const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
    
    if (isValid && step < totalSteps) {
      setStep((prev) => prev + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 10);
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
    let logoPath = null;
    if (data.logo instanceof File) {
      logoPath = await uploadStartupLogo(data.logo, data.name);
    }

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

    const { error } = await supabase
      .from("startups")
      .insert(payload);

    if (error) throw error;

    onSubmitSuccess(payload);
  } catch (err) {
    console.error("Submission failed:", err.message);
  }
};

  // --- Mobile-optimized Render Functions ---

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-sm text-gray-500 mb-2 sm:hidden flex items-center gap-2">
        <Smartphone size={16} />
        <span>Fill all fields to continue</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Startup Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="TechInnovate Solutions" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="founderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Founder Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Priya Sharma" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Designation *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="CEO / Founder" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="startupEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Startup Email *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="contact@techinnovate.com" 
                  type="email"
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Contact Number *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="9876543210" 
                  type="tel"
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Headquarters Location *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Guwahati, Assam" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <div className="sm:col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Detailed Description *</FormLabel>
                <div className="text-xs text-gray-500 mb-1">(Minimum 50 characters)</div>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what your startup does, its mission, and its impact in the Northeast."
                    rows={4}
                    className="resize-none min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Current Stage *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 sm:h-auto">
                    <SelectValue placeholder="Select your current stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage} className="text-sm sm:text-base">{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Primary Sector *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., AgriTech, Tourism, EdTech" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="currentValuation"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Current Valuation (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="₹5 Crore (approx.)" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="fundedBy"
          render={({ field }) => (
            <FormItem className="sm:col-span-1">
              <FormLabel className="font-poppins text-sm sm:text-base text-oxford-blue">Funded By (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Angel Investors, SIDBI" 
                  className="h-10 sm:h-auto"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-sm text-gray-500 mb-2">
        At least one social media link is required
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField control={form.control} name="website" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="font-poppins text-sm sm:text-base">Website (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://yourstartup.com" 
                className="h-10 sm:h-auto text-sm"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="linkedin" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-sm sm:text-base">LinkedIn</FormLabel>
            <FormControl>
              <Input 
                placeholder="LinkedIn URL" 
                className="h-10 sm:h-auto text-sm"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="facebook" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-sm sm:text-base">Facebook</FormLabel>
            <FormControl>
              <Input 
                placeholder="Facebook URL" 
                className="h-10 sm:h-auto text-sm"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="instagram" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-sm sm:text-base">Instagram</FormLabel>
            <FormControl>
              <Input 
                placeholder="Instagram URL" 
                className="h-10 sm:h-auto text-sm"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="twitter" render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-sm sm:text-base">Twitter</FormLabel>
            <FormControl>
              <Input 
                placeholder="Twitter URL" 
                className="h-10 sm:h-auto text-sm"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="logo" render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="font-poppins text-sm sm:text-base">Logo (Optional)</FormLabel>
            <div className="text-xs text-gray-500 mb-1">PNG, JPG, or WEBP (max 1MB)</div>
            <FormControl>
              <div className="flex flex-col gap-2">
                <Input 
                  type="file" 
                  accept=".png,.jpg,.jpeg,.webp"
                  className="h-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
                {field.value && (
                  <div className="text-xs text-green-600">
                    ✓ File selected: {field.value.name}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )} />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 sm:space-y-6">
      <FormField
        control={form.control}
        name="feedback"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-poppins text-lg sm:text-xl text-oxford-blue">Your Feedback</FormLabel>
            <p className="text-sm text-gray-500 mb-3 sm:mb-4">
              How do you feel about this Innovation Startup Northeast initiative? 
              Your response will be featured in our testimonial section.
            </p>
            <FormControl>
              <Textarea 
                placeholder="Share your experience or thoughts with us..." 
                rows={5}
                className="resize-none min-h-[150px] sm:min-h-[180px] text-sm sm:text-base"
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs sm:text-sm" />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Mobile-optimized Progress Indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-sm sm:text-base font-semibold text-red-700">
              Step {step} of {totalSteps}
            </span>
            <div className="sm:hidden bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
              {step === 1 && "Basic Info"}
              {step === 2 && "Funding"}
              {step === 3 && "Media"}
              {step === 4 && "Feedback"}
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <div className="flex space-x-1 sm:space-x-2 justify-center sm:justify-end">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 sm:h-1 rounded-full transition-all duration-300 ${
                    s <= step 
                      ? "bg-red-600 flex-grow" 
                      : "bg-gray-200 flex-grow"
                  } ${s === step ? 'w-8 sm:w-10' : 'w-6 sm:w-8'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Render Current Step */}
        <div className="space-y-4 sm:space-y-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Mobile-optimized Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={step === 1 || form.formState.isSubmitting}
            className="w-full sm:w-auto h-10 sm:h-auto order-2 sm:order-1 font-poppins border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {/* Show NEXT button for Steps 1, 2, 3 */}
          {step < 4 && (
            <Button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-auto h-10 sm:h-auto order-1 sm:order-2 bg-red-600 hover:bg-red-700 font-poppins"
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
              className="w-full sm:w-auto h-10 sm:h-auto order-1 sm:order-2 bg-red-600 hover:bg-red-700 font-poppins"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Startup"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}