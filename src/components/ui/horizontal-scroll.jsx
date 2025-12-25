import { FC, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

//optional hook for smooth scrolling
import useLenis from "../../hooks/useLenis";

const HorizontalScrollCarousel = ({ images }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-90%"]);

  useLenis();

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {images.map((src) => (
            <Card
              src={src}
              key={src}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ src }) => {
  return (
    <div
      className="group relative h-[350px] w-[350px] overflow-hidden rounded-lg border border-gray-400"
    >
      {/* FIXED: Use regular img tag instead of Image component */}
      <img
        src={src}
        alt={src}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default HorizontalScrollCarousel;
