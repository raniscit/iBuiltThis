import FeaturedProducts from "@/components/landing-page/featured-products";
import HeroSection from "@/components/landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/landing-page/recently-launched-products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProducts />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>

  );
}
