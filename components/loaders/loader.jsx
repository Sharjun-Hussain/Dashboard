import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './loader.css'

export default function CreativeLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <span class="loader"></span>
    </div>
  );
}
