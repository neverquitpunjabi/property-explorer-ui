
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenActiveIndex, setFullscreenActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFullscreenNext = () => {
    setFullscreenActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleFullscreenPrev = () => {
    setFullscreenActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = (index: number) => {
    setFullscreenActiveIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative bg-gray-100">
        {/* Main Image Display */}
        <div className="container mx-auto px-4 pt-4">
          <div className="relative rounded-t-lg overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={images[activeIndex]} 
                alt={`${title} - Image ${activeIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            {/* Fullscreen Button */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button 
                  onClick={() => openFullscreen(activeIndex)}
                  className="absolute right-4 bottom-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <Expand className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-full p-0 bg-black border-none">
                <div className="relative h-[90vh] flex items-center justify-center">
                  <img 
                    src={images[fullscreenActiveIndex]} 
                    alt={`${title} - Fullscreen Image ${fullscreenActiveIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                  
                  <button 
                    onClick={handleFullscreenPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  
                  <button 
                    onClick={handleFullscreenNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                    {fullscreenActiveIndex + 1} / {images.length}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Image Counter */}
            <div className="absolute left-4 bottom-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  index === activeIndex ? "border-primary" : "border-transparent hover:border-gray-300"
                }`}
              >
                <img 
                  src={image} 
                  alt={`${title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
