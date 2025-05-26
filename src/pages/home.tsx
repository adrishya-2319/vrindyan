import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { 
  Cloud, Server, Shield, Zap, MapPin, Brain, Cpu, Network,
  Code, Database, Bot, Workflow, Globe, Layers, GitBranch,
  Activity, LineChart, Laptop, Blocks, Wifi, Sparkles,
  Lightbulb, Rocket, Microscope, Atom, Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fluteVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" }
  }
};

const codeSymbolVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const technologies = [
  { icon: <Code />, name: "Python" },
  { icon: <Database />, name: "MongoDB" },
  { icon: <Cloud />, name: "React" },
  { icon: <Globe />, name: "Node.js" },
  { icon: <Cpu />, name: "TypeScript" },
  { icon: <Bot />, name: "Docker" }
];

export function HomePage() {
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);

  const floatProps = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-20px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { duration: 2000 },
  });

  useEffect(() => {
    const sequence = async () => {
      await controls.start("animate");
    };
    sequence();
  }, [controls]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const color1 = `hsl(${x * 360}, 70%, 50%)`;
      const color2 = `hsl(${y * 360}, 70%, 50%)`;
      
      hero.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          ${color1},
          ${color2}
        )
      `;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen">
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fluteVariants}
              className="mb-12"
            >
              <animated.div style={floatProps} className="inline-block">
                <div className="w-24 h-24 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Music className="w-16 h-16 text-white animate-flute-glow" />
                  </div>
                </div>
              </animated.div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Divine Technology Solutions by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                Vrindyan Software
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-indigo-200 leading-relaxed">
              Where Technology Meets Spiritual Excellence
            </p>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-12">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={codeSymbolVariants}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                    {tech.icon}
                  </div>
                  <span className="text-sm text-indigo-200">{tech.name}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                size="lg"
                className="bg-white text-indigo-900 hover:bg-indigo-100 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/services">Explore Solutions</Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/50 hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://t.me/VrindyanSoftware" target="_blank" rel="noopener noreferrer">
                  Connect With Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.2, 1],
                  x: [0, Math.random() * 100, 0],
                  y: [0, Math.random() * 100, 0]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}