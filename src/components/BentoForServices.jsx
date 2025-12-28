"use client";
import { cn } from "../utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconBuildingSkyscraper,
  IconTrademark,
  IconCode,
  IconRocket,
  IconCashBanknote,
  IconBrush,
  IconArrowRight,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { GlowingEffect } from "../components/ui/glowing-effect";

export function ServicesIntroBentoGrid() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-black dark:text-white px-2">
          Complete Business Solutions
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
          From startup registration to digital growth - everything your business needs
        </p>
      </div>

      <div className="overflow-hidden">
       
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn(
                "[&>p:text-base] sm:[&>p:text-lg]",
                item.className,
                // Mobile specific adjustments
                "min-h-[300px] sm:min-h-0",
                i === 3 && "md:col-span-2", // Keep design & development wide only on desktop
              )}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>

      <div className="text-center mt-10 sm:mt-12 px-4">
        <button
          onClick={()=>navigate("/services")}
          className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
        >
          View All Services
          <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}


// const SkeletonOne = () => {
//   const variants = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: 10,
//       rotate: 5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//   const variantsSecond = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: -10,
//       rotate: -5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
//         <div className="w-full bg-gray-100 h-3 sm:h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//       <motion.div
//         variants={variantsSecond}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
//       >
//         <div className="w-full bg-gray-100 h-3 sm:h-4 rounded-full dark:bg-neutral-900" />
//         <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
//       </motion.div>
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
//         <div className="w-full bg-gray-100 h-3 sm:h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//     </motion.div>
//   );
// };
// Alternative version with more detailed text
const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
      
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >

        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
        <div className="w-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate px-2">
          Private Limited • LLP • OPC
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <div className="w-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate px-2">
          Trademark & IP Registration
        </div>
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
        <div className="w-full text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate px-2">
          Annual Compliance & Filing
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  
  const services = ["Company Registration", "Trademark", "Compliance"];
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-3 p-3 sm:p-4"
    >
      {services.map((service, i) => (
        <motion.div
          key={`skeleton-two-${i}`}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 60) + 60 + "%",
          }}
          className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 sm:p-3 items-center space-x-2 bg-white dark:bg-black w-full"
        >
          <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-700 shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {service}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col justify-center items-center"
      style={{
        background: "linear-gradient(-45deg, #dc2626, #ef4444, #dc2626, #b91c1c)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="text-center p-4 sm:p-6">
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">25+</div>
        <div className="text-white text-xs sm:text-sm">Services Available</div>
      </div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"

      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-1 sm:space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="p-2 sm:p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-2 sm:mb-3">
          <IconCode className="h-4 w-4 sm:h-6 sm:w-6 text-red-700" />
        </div>
        <p className="text-xs sm:text-sm text-center font-semibold text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
          Tech Development
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] sm:text-xs rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 mt-2 sm:mt-3">
          Website • App
        </p>
      </motion.div>
      
      <div className="h-full relative z-20 w-1/3 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <div className="p-2 sm:p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-2 sm:mb-3">
          <IconBrush className="h-4 w-4 sm:h-6 sm:w-6 text-red-700" />
        </div>
        <p className="text-xs sm:text-sm text-center font-semibold text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
          Design & Branding
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] sm:text-xs rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 mt-2 sm:mt-3">
          Logo • Pitch Deck
        </p>
      </div>
      
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="p-2 sm:p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-2 sm:mb-3">
          <IconRocket className="h-4 w-4 sm:h-6 sm:w-6 text-red-700" />
        </div>
        <p className="text-xs sm:text-sm text-center font-semibold text-gray-700 dark:text-gray-300 mt-1 sm:mt-2">
          Growth Marketing
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] sm:text-xs rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 mt-2 sm:mt-3">
          GTM • Performance
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-xl sm:rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 sm:p-3 items-start space-x-2 bg-white dark:bg-black"
      >
        <div className="p-1.5 sm:p-2 rounded-lg bg-red-100 dark:bg-red-900/30 shrink-0">
          <IconCashBanknote className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Access funding through our grant and loan consultation services tailored for startups...
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-gray-600 dark:text-gray-400">Starting at ₹10,000</p>
        <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-r from-red-700 to-red-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Business Registration",
    description: (
      <span className="text-sm">
        Private Limited, LLP, OPC, Section 8 companies with full compliance support.
      </span>
    ),
    // header: <SkeletonOne />,
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconBuildingSkyscraper className="h-4 w-4 text-red-700" />,
  },
  {
    title: "Legal & IP Services",
    description: (
      <span className="text-sm">
        Protect your brand with trademarks, patents, and IP management.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconTrademark className="h-4 w-4 text-red-700" />,
  },
  {
    title: "Digital Solutions",
    description: (
      <span className="text-sm">
        Complete web, app development and digital transformation services.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconCode className="h-4 w-4 text-red-700" />,
  },
  {
    title: "Design & Development",
    description: (
      <span className="text-sm">
        End-to-end design and tech solutions for modern businesses.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconBrush className="h-4 w-4 text-red-700" />,
  },
  {
    title: "Funding & Growth",
    description: (
      <span className="text-sm">
        Grant, loan consultation and performance marketing for business growth.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconRocket className="h-4 w-4 text-red-700" />,
  },
];