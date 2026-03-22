import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const COUNTRIES = [
  "India",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Singapore",
  "Australia",
  "Canada",
  "Germany",
  "Netherlands",
  "South Africa",
  "Kenya",
  "Nigeria",
  "Saudi Arabia",
  "Qatar",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Pakistan",
  "Other",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ open, onClose }: Props) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.country) {
      setErrorMsg("All fields are required.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      if (actor) {
        const [already, remaining] = await Promise.all([
          actor.isEmailRegistered(form.email),
          actor.getRemainingSeats(),
        ]);
        if (already) {
          setErrorMsg(
            "This email is already registered. Check your inbox for confirmation.",
          );
          setStatus("error");
          return;
        }
        if (remaining <= BigInt(0)) {
          setErrorMsg(
            "Sorry, all seats are taken. Follow us for future events.",
          );
          setStatus("error");
          return;
        }
        await actor.register(form.name, form.email, form.phone, form.country);
      }
      setStatus("success");
    } catch {
      setErrorMsg("Registration failed. Please try again.");
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status !== "loading") {
      setForm({ name: "", email: "", phone: "", country: "" });
      setStatus("idle");
      setErrorMsg("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md border-0"
        style={{
          background: "oklch(0.13 0.01 250)",
          border: "1px solid oklch(0.76 0.16 74 / 0.3)",
          boxShadow: "0 0 60px oklch(0.76 0.16 74 / 0.15)",
        }}
        data-ocid="registration.dialog"
      >
        <DialogHeader>
          <DialogTitle
            className="font-display text-xl font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.93 0.01 250)" }}
          >
            {status === "success" ? "You're In! 🎉" : "Reserve Your Seat"}
          </DialogTitle>
        </DialogHeader>

        {status === "success" ? (
          <div
            className="py-6 text-center space-y-4"
            data-ocid="registration.success_state"
          >
            <CheckCircle2
              className="w-16 h-16 mx-auto"
              style={{ color: "oklch(0.76 0.16 74)" }}
            />
            <p
              className="font-body text-base"
              style={{ color: "oklch(0.93 0.01 250)" }}
            >
              Registration confirmed! Check your email and WhatsApp for the Zoom
              link.
            </p>
            <p className="text-sm" style={{ color: "oklch(0.55 0.02 250)" }}>
              📅 Sunday, April 12 · 8:00 PM IST
            </p>
            <Button
              className="btn-amber w-full mt-2"
              onClick={handleClose}
              data-ocid="registration.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="reg-name"
                className="text-sm font-semibold"
                style={{ color: "oklch(0.55 0.02 250)" }}
              >
                Full Name
              </Label>
              <Input
                id="reg-name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Your full name"
                style={{
                  background: "oklch(0.16 0.012 250)",
                  border: "1px solid oklch(0.25 0.015 250)",
                  color: "oklch(0.93 0.01 250)",
                }}
                data-ocid="registration.input"
                disabled={status === "loading"}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="reg-email"
                className="text-sm font-semibold"
                style={{ color: "oklch(0.55 0.02 250)" }}
              >
                Email
              </Label>
              <Input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="you@example.com"
                style={{
                  background: "oklch(0.16 0.012 250)",
                  border: "1px solid oklch(0.25 0.015 250)",
                  color: "oklch(0.93 0.01 250)",
                }}
                data-ocid="registration.input"
                disabled={status === "loading"}
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="reg-phone"
                className="text-sm font-semibold"
                style={{ color: "oklch(0.55 0.02 250)" }}
              >
                Phone (with country code)
              </Label>
              <Input
                id="reg-phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+91 98765 43210"
                style={{
                  background: "oklch(0.16 0.012 250)",
                  border: "1px solid oklch(0.25 0.015 250)",
                  color: "oklch(0.93 0.01 250)",
                }}
                data-ocid="registration.input"
                disabled={status === "loading"}
              />
            </div>
            <div className="space-y-1">
              <Label
                className="text-sm font-semibold"
                style={{ color: "oklch(0.55 0.02 250)" }}
              >
                Country
              </Label>
              <Select
                value={form.country}
                onValueChange={(v) => setForm((p) => ({ ...p, country: v }))}
                disabled={status === "loading"}
              >
                <SelectTrigger
                  style={{
                    background: "oklch(0.16 0.012 250)",
                    border: "1px solid oklch(0.25 0.015 250)",
                    color: "oklch(0.93 0.01 250)",
                  }}
                  data-ocid="registration.select"
                >
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.14 0.01 250)",
                    border: "1px solid oklch(0.25 0.015 250)",
                  }}
                >
                  {COUNTRIES.map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                      style={{ color: "oklch(0.93 0.01 250)" }}
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {status === "error" && (
              <div
                className="flex items-start gap-2 p-3 rounded-lg"
                style={{
                  background: "oklch(0.62 0.22 27 / 0.15)",
                  border: "1px solid oklch(0.62 0.22 27 / 0.4)",
                }}
                data-ocid="registration.error_state"
              >
                <AlertCircle
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.62 0.22 27)" }}
                />
                <p className="text-sm" style={{ color: "oklch(0.8 0.1 27)" }}>
                  {errorMsg}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="btn-amber w-full text-base py-6 font-bold uppercase tracking-wider"
              disabled={status === "loading"}
              data-ocid="registration.submit_button"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                "→ Secure My Seat — ₹196"
              )}
            </Button>

            <p
              className="text-xs text-center"
              style={{ color: "oklch(0.45 0.015 250)" }}
            >
              Instant confirmation via email + WhatsApp. Zoom link sent
              immediately after payment.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
