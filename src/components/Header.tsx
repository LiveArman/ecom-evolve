import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu,
  X,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartItemsCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onProfileClick: () => void;
  onSearch: (query: string) => void;
}

export const Header = ({
  cartItemsCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onProfileClick,
  onSearch
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Sports", "Beauty", "Books", "Toys"
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>support@store.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EliteStore
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-12 rounded-full border-2 focus:border-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onWishlistClick}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-destructive text-destructive-foreground">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-primary text-primary-foreground">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onProfileClick}
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden md:flex items-center gap-6 py-3 border-t">
          {categories.map((category) => (
            <button
              key={category}
              className="text-sm hover:text-primary transition-colors"
            >
              {category}
            </button>
          ))}
          <Button variant="sale" size="sm" className="ml-auto">
            🔥 Today's Deals
          </Button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="text-left p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};