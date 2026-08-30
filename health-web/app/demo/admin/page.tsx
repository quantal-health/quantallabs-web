import type { Metadata } from "next";
import { Container } from "@/components/marketing/section";
import { DemoShell } from "@/components/demos/demo-shell";
import { Reveal } from "@/components/motion/reveal";
import { AdminConsole } from "@/components/demos/admin/admin-console";

export const metadata: Metadata = {
  title: "Admin console demo",
  description:
    "Click through a working demo of the Quantal admin console, branded for our demo clinic Mountainview Medicine. Try the live branding preview.",
};

export default function AdminDemoPage() {
  return (
    <DemoShell
      eyebrow="Admin console"
      title="This is what Maria sees."
      lede="Maria Rodriguez is the practice administrator at Mountainview Medicine. Try the Branding tab — type a different color and watch the patient app preview update in real time."
      others={[
        { href: "/demo/patient", label: "Patient demo" },
        { href: "/demo/clinician", label: "Clinician demo" },
      ]}
    >
      <Container className="max-w-[1400px]">
        <Reveal>
          <AdminConsole />
        </Reveal>
      </Container>
    </DemoShell>
  );
}
