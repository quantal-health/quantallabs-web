import type { Metadata } from "next";
import { DemoShell } from "@/components/demos/demo-shell";
import { PatientDemo } from "@/components/demos/patient/patient-demo";

export const metadata: Metadata = {
  title: "Patient app demo",
  description:
    "Click through a working demo of the Quantal patient app, branded for our demo clinic Mountainview Medicine.",
};

export default function PatientDemoPage() {
  return (
    <DemoShell
      eyebrow="Patient app"
      title="This is the patient app, branded for Mountainview Medicine."
      lede="Click any screen to interact. Use the arrows below to step through key flows — daily logging, AI food vision, weight trends, messaging, and the daily check-in."
      others={[
        { href: "/demo/clinician", label: "Clinician demo" },
        { href: "/demo/admin", label: "Admin demo" },
      ]}
    >
      <PatientDemo />
    </DemoShell>
  );
}
