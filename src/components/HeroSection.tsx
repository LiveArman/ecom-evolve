import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Truck, Shield, CreditCard } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroSectionProps {
  onShopNow: () => void;
  onExplore: () => void;
}

export const HeroSection = ({ onShopNow, onExplore }: HeroSectionProps) => {
  const trustFeatures = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected"
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBanner}
          alt="Premium lifestyle products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-2xl text-white animate-fade-in">
          {/* Sale Badge */}
          <Badge className="mb-6 bg-sale text-sale-foreground text-sm px-4 py-2 animate-pulse-glow">
            🔥 Limited Time: Up to 70% Off
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Lifestyle
            </span>
            <br />
            Collection
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Discover curated products that define luxury and sophistication. 
            From cutting-edge electronics to timeless fashion pieces.
          </p>

          {/* Rating and Social Proof */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-300">4.9/5 from 2,847 reviews</span>
            </div>
            <div className="text-sm text-gray-300">
              <span className="font-semibold text-white">50,000+</span> happy customers
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="xl" 
              variant="hero"
              onClick={onShopNow}
              className="group"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              onClick={onExplore}
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Explore Collection
            </Button>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trustFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex items-center gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="h-6 w-6 text-primary-glow" />
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 hidden lg:block animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-elegant">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="font-medium">Live: 127 people shopping</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-20 hidden lg:block animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <div className="bg-primary/90 backdrop-blur-sm rounded-lg p-4 shadow-glow text-primary-foreground">
          <div className="text-center">
            <div className="text-2xl font-bold">24H</div>
            <div className="text-xs">Flash Sale</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};