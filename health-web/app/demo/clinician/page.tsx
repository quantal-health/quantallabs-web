import type { Metadata } from "next";
import { BrowserFrame } from "@/components/marketing/device-mock";
import { DemoShell } from "@/components/demos/demo-shell";
import { ClinicianDashboard } from "@/components/demos/clinician/clinician-dashboard";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Clinician dashboard demo",
  description:
    "Click through a working demo of the Quantal clinician dashboard, branded for our demo clinic Mountainview Medicine.",
};

export default function ClinicianDemoPage() {
  return (
    <DemoShell
      eyebrow="Clinician dashboard"
      title="This is what Dr. Chen sees on her dashboard."
      lede="Dr. Sarah Chen is the lead clinician at our demo clinic Mountainview Medicine. Click around — every patient row, every tab, every message."
      others={[
        { href: "/demo/patient", label: "Patient demo" },
        { href: "/demo/admin", label: "Admin demo" },
      ]}
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6">
        <Reveal>
          <BrowserFrame url="mountainview-medicine.quantal.health">
            <ClinicianDashboard />
          </BrowserFrame>
        </Reveal>
      </div>
    </DemoShell>
  );
}
