import { DriverHomeRedirect } from "@/components/auth/driver-home-redirect";
import { CashbackCalculator } from "@/components/sections/cashback-calculator-section";
import { ExclusiveLaunchSection } from "@/components/sections/exclusive-launch-section";
import { AppTeasingSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReferralSection } from "@/components/sections/referral-section";
import { StationExperience } from "@/components/sections/station-experience-section";
import { TrustSafetySection } from "@/components/sections/trust-safety-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";

export default function HomePage() {
  return (
    <DriverHomeRedirect>
      <HeroSection />
      <AppTeasingSection />
      <CashbackCalculator />
      <StationExperience />
      <ReferralSection />
      <TrustSafetySection />
      <HowItWorksSection />
    </DriverHomeRedirect>
  );
}
