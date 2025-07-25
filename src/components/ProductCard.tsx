import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
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
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  className?: string;
}

export const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist, 
  onQuickView,
  className 
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with quick actions */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={handleWishlist}
            >
              <Heart 
                className={cn("h-4 w-4", isWishlisted && "fill-current text-destructive")} 
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={() => onQuickView(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              className="w-full"
              variant={product.inStock ? "cart" : "secondary"}
              disabled={!product.inStock}
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isOnSale && (
            <Badge variant="destructive" className="bg-sale text-sale-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(product.rating) 
                  ? "fill-current text-yellow-400" 
                  : "text-muted-foreground"
              )}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-price">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};