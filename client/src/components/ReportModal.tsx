import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, Flag, CheckCircle } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: "comment" | "reel" | "article" | "post" | "user" | "group" | "event";
  contentId: number;
  contentPreview?: string; // Optional preview of what's being reported
  onSubmit: (reason: string, description: string) => Promise<void>;
}

const reportReasons = [
  { value: "spam", label: "Spam or misleading", description: "Repetitive content or scams" },
  { value: "harassment", label: "Harassment or bullying", description: "Targeting or intimidating others" },
  { value: "hate-speech", label: "Hate speech", description: "Attacks based on identity" },
  { value: "inappropriate", label: "Inappropriate content", description: "Not suitable for Christian community" },
  { value: "violence", label: "Violence or threats", description: "Violent or threatening content" },
  { value: "false-information", label: "False information", description: "Spreading misinformation" },
  { value: "copyright", label: "Copyright violation", description: "Unauthorized use of content" },
  { value: "other", label: "Other", description: "Something else" },
];

export default function ReportModal({ 
  isOpen, 
  onClose, 
  contentType, 
  contentId, 
  contentPreview,
  onSubmit 
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    try {
      await onSubmit(selectedReason, description);
      setIsSubmitted(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to submit report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setDescription("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          // Success State
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl mb-2">Report Submitted</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for helping keep our community safe. Our moderation team will review this report.
            </DialogDescription>
          </div>
        ) : (
          // Report Form
          <>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl">Report {contentType}</DialogTitle>
                  <DialogDescription>
                    Help us understand what's wrong with this content
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Content Preview */}
            {contentPreview && (
              <div className="p-3 bg-muted rounded-lg border mb-4">
                <p className="text-sm text-muted-foreground mb-1">Reported content:</p>
                <p className="text-sm line-clamp-3">{contentPreview}</p>
              </div>
            )}

            {/* Alert */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Your report is anonymous</p>
                <p className="text-blue-700">
                  The person who posted this will not see who reported it. False reports may result in action on your account.
                </p>
              </div>
            </div>

            {/* Reason Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">What's wrong with this {contentType}?</Label>
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                {reportReasons.map((reason) => (
                  <div key={reason.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                    <RadioGroupItem value={reason.value} id={reason.value} className="mt-1" />
                    <Label htmlFor={reason.value} className="flex-1 cursor-pointer">
                      <div className="font-medium">{reason.label}</div>
                      <div className="text-sm text-muted-foreground">{reason.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Additional Details */}
            <div className="space-y-2 mt-6">
              <Label htmlFor="description" className="text-base font-semibold">
                Additional details (optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Provide any additional context that might help our moderation team..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This helps our team take appropriate action faster
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason || isSubmitting}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
