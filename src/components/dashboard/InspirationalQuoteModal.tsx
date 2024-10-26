import React, { useState, useEffect } from 'react';
import { Quote, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface InspirationalQuoteModalProps {
  quote: string;
  author?: string;
  buttonText: string;
}

const InspirationalQuoteModal: React.FC<InspirationalQuoteModalProps> = ({ quote, author, buttonText }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <CardHeader className="flex items-center justify-center p-6">
          <Quote size={48} className="text-yellow-300" />
          <h1 className='text-3xl font-black pt-2 underline'>Welcome Back, Researcher!</h1>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-2xl font-bold mb-4">
            {quote}
          </p>
          {author && <p className="text-lg">- {author}</p>}
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <Button
            onClick={() => setIsVisible(false)}
            className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 transition-colors duration-300 flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold"
          >
            <span>{buttonText}</span>
            <ArrowRight size={24} />
          </Button>
        </CardFooter>
        <div className="absolute top-4 right-4">
          <Clock size={24} className="text-yellow-300" />
        </div>
      </Card>
    </div>
  );
};

export default InspirationalQuoteModal;