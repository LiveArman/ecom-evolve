import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  Filter,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  variants?: { color: string; size: string }[];
  brand?: string;
  tags?: string[];
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  searchQuery?: string;
}

export const ProductGrid = ({
  products,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  searchQuery = ""
}: ProductGridProps) => {
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  // Get unique categories and brands
  const categories = useMemo(() => 
    [...new Set(products.map(p => p.category))], [products]
  );
  
  const brands = useMemo(() => 
    [...new Set(products.map(p => p.brand).filter(Boolean))], [products]
  );

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Brand filter
      if (selectedBrands.length > 0 && (!product.brand || !selectedBrands.includes(product.brand))) {
        return false;
      }
      
      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      
      // Sale filter
      if (onSaleOnly && !product.isOnSale) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [products, searchQuery, priceRange, selectedCategories, selectedBrands, inStockOnly, onSaleOnly, sortBy]);

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h2>
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="hidden md:flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Best Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={cn(
          "transition-all duration-300",
          showFilters ? "w-80 opacity-100" : "w-0 opacity-0 overflow-hidden"
        )}>
          <div className="bg-card border rounded-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              {brands.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label
                          htmlFor={brand}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Filters */}
              <div>
                <h4 className="font-medium mb-3">Quick Filters</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inStock"
                          checked={inStockOnly}
                          onCheckedChange={(checked) => setInStockOnly(checked === true)}
                        />
                    <label htmlFor="inStock" className="text-sm font-medium">
                      In Stock Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="onSale"
                      checked={onSaleOnly}
                      onCheckedChange={(checked) => setOnSaleOnly(checked === true)}
                    />
                    <label htmlFor="onSale" className="text-sm font-medium">
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-6",
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}>
              {filteredAndSortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  onQuickView={onQuickView}
                  className={viewMode === "list" ? "md:flex-row" : ""}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};