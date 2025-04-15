
import { Link } from "react-router-dom";
import { Property, formatPrice } from "@/data/properties";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BadgeCheck, Bed, Bath, SquareIcon, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    address,
    city,
    state,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    images,
    listingType,
    isFeatured
  } = property;

  return (
    <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition duration-300 hover:shadow-md">
      <Link to={`/property/${id}`} className="block">
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
          {isFeatured && (
            <div className="absolute left-3 top-3">
              <Badge className="bg-primary/90 hover:bg-primary flex items-center gap-1 px-2 py-1">
                <BadgeCheck className="h-3.5 w-3.5" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute right-3 top-3">
            <Badge className={listingType === 'rent' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}>
              For {listingType === 'rent' ? 'Rent' : 'Sale'}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-1">
          <Link to={`/property/${id}`} className="block">
            <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm">{address}, {city}, {state}</p>
        </div>

        <div className="mt-3">
          <p className="text-xl font-bold text-primary">{formatPrice(price, listingType === 'rent')}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center">
              <Bed className="mr-1 h-4 w-4" />
              <span className="text-sm">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4" />
              <span className="text-sm">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center">
              <SquareIcon className="mr-1 h-4 w-4" />
              <span className="text-sm">{squareFeet} sq ft</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to={`/property/${id}`}>
            <Button variant="outline" className="w-full">
              <span>View Details</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
