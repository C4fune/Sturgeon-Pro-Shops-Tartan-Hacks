import { useState, useEffect } from 'react';

const LoadingBar = () => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
        setPosition(prev => (prev + 1) % 50);
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  const dots = '...';
  const spacer = ' '.repeat(50);
  const combinedText = spacer + dots + spacer;
  const visibleSection = combinedText.slice(position, position + 50);

  return (
    <div className="w-full py-8 overflow-hidden font-mono">
      <div className="whitespace-pre text-indigo-400 text-2xl text-center">
        {visibleSection}
      </div>
    </div>
  );
};

export default LoadingBar;
