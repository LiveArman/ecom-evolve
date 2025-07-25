import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Award,
  ArrowRight,
  Package,
  Heart
} from "lucide-react";

// Import product images
import headphonesImg from "@/assets/product-headphones.jpg";
import smartwatchImg from "@/assets/product-smartwatch.jpg";
import handbagImg from "@/assets/product-handbag.jpg";
import shoesImg from "@/assets/product-shoes.jpg";

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

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  // Sample products data
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: headphonesImg,
      category: "Electronics",
      rating: 4.8,
      reviews: 1247,
      inStock: true,
      isOnSale: true,
      isFeatured: true,
      brand: "AudioTech",
      variants: [
        { color: "Black", size: "Standard" },
        { color: "Silver", size: "Standard" }
      ]
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 449.99,
      image: smartwatchImg,
      category: "Electronics",
      rating: 4.6,
      reviews: 892,
      inStock: true,
      isFeatured: true,
      brand: "TechFit",
      variants: [
        { color: "Black", size: "42mm" },
        { color: "Silver", size: "42mm" },
        { color: "Black", size: "46mm" }
      ]
    },
    {
      id: "3",
      name: "Designer Leather Handbag",
      price: 189.99,
      originalPrice: 249.99,
      image: handbagImg,
      category: "Fashion",
      rating: 4.9,
      reviews: 456,
      inStock: true,
      isOnSale: true,
      brand: "LuxStyle",
      variants: [
        { color: "Brown", size: "Medium" },
        { color: "Black", size: "Medium" },
        { color: "Tan", size: "Large" }
      ]
    },
    {
      id: "4",
      name: "Professional Running Shoes",
      price: 159.99,
      image: shoesImg,
      category: "Sports",
      rating: 4.7,
      reviews: 2134,
      inStock: true,
      isFeatured: true,
      brand: "RunPro",
      variants: [
        { color: "White/Blue", size: "US 9" },
        { color: "Black/Red", size: "US 10" },
        { color: "Gray/Orange", size: "US 11" }
      ]
    },
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      image: headphonesImg, // Placeholder
      category: "Electronics",
      rating: 4.5,
      reviews: 678,
      inStock: false,
      isOnSale: true,
      brand: "GameTech"
    },
    {
      id: "6",
      name: "Luxury Silk Scarf",
      price: 125.00,
      image: handbagImg, // Placeholder
      category: "Fashion",
      rating: 4.8,
      reviews: 234,
      inStock: true,
      brand: "ElegantSilk"
    }
  ];

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const isAlreadyInWishlist = prev.some(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
        return prev.filter(item => item.id !== product.id);
      } else {
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prev, product];
      }
    });
  };

  const handleQuickView = (product: Product) => {
    toast({
      title: "Quick View",
      description: `Opening quick view for ${product.name}`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to secure checkout...",
    });
    setIsCartOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowProducts(true);
  };

  const handleShopNow = () => {
    setShowProducts(true);
  };

  const handleExplore = () => {
    setShowProducts(true);
  };

  const stats = [
    {
      icon: Users,
      title: "50K+",
      description: "Happy Customers",
      color: "text-primary"
    },
    {
      icon: Package,
      title: "10K+",
      description: "Products Sold",
      color: "text-success"
    },
    {
      icon: Star,
      title: "4.9/5",
      description: "Customer Rating",
      color: "text-yellow-500"
    },
    {
      icon: Award,
      title: "99%",
      description: "Satisfaction Rate",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => toast({ title: "Wishlist", description: "Opening wishlist..." })}
        onProfileClick={() => toast({ title: "Profile", description: "Opening user profile..." })}
        onSearch={handleSearch}
      />

      {!showProducts ? (
        <>
          <HeroSection onShopNow={handleShopNow} onExplore={handleExplore} />
          
          {/* Stats Section */}
          <section className="py-16 bg-gradient-secondary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <Card key={stat.title} className="text-center border-0 shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="pt-6">
                      <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                      <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                      <p className="text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products Preview */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary text-primary-foreground">Featured Collection</Badge>
                <h2 className="text-4xl font-bold mb-4">Best Selling Products</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover our most popular items loved by thousands of customers worldwide
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {sampleProducts.filter(p => p.isFeatured).slice(0, 4).map(product => (
                  <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 border-0 shadow-card">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {product.isOnSale && (
                        <Badge className="absolute top-2 left-2 bg-sale text-sale-foreground">
                          Sale
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm line-through text-muted-foreground">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" variant="premium" onClick={handleShopNow}>
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="py-16 bg-gradient-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Get exclusive deals and be the first to know about new arrivals
              </p>
              <div className="flex max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground"
                />
                <Button variant="secondary" size="lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <ProductGrid
          products={sampleProducts}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onQuickView={handleQuickView}
          searchQuery={searchQuery}
        />
      )}

      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
