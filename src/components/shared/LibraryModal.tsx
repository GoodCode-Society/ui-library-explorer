import React, { useEffect } from "react";
import {
  X,
  Star,
  Download,
  ExternalLink,
  Github,
  Calendar,
  Shield,
  Palette,
  Moon,
  Figma,
  Type,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Library } from "../../types";
import { formatNumber } from "../../utils/filterUtils";

interface LibraryModalProps {
  library: Library | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  library,
  isOpen,
  onClose
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const features = [
    { key: "isFullyAccessible", label: "Fully Accessible", icon: Shield },
    { key: "hasBuiltinThemes", label: "Built-in Themes", icon: Palette },
    { key: "hasDarkMode", label: "Dark Mode Support", icon: Moon },
    { key: "hasFigmaFiles", label: "Figma Files", icon: Figma },
    { key: "isFullyTyped", label: "TypeScript Support", icon: Type },
    { key: "isTailwind", label: "Tailwind Compatible", icon: Type }
  ];

  return (
    <AnimatePresence>
      {isOpen && library && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
              <div
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() =>
                  library.website && window.open(library.website, "_blank")
                }
              >
                <img
                  src={library.img}
                  alt={`${library.name} logo`}
                  className="w-16 h-16 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {library.name}
                  </h2>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <Badge variant="outline">{library.category}</Badge>
                    <Badge variant="secondary">{library.license}</Badge>
                    {library.isSponsor && <Badge variant="success">Sponsor</Badge>}
                  </div>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose} className="p-2">
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <section>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {library.description}
                </p>
              </section>

              {/* Stats */}
              <section>
                <h3 className="text-lg font-semibold mb-3">Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      icon: <Star className="mx-auto mb-2 text-yellow-500" size={24} />,
                      value: formatNumber(library.stars),
                      label: "Stars"
                    },
                    {
                      icon: <Download className="mx-auto mb-2 text-blue-500" size={24} />,
                      value: formatNumber(library.downloads),
                      label: "Downloads"
                    },
                    {
                      icon: <Calendar className="mx-auto mb-2 text-green-500" size={24} />,
                      value: formatDate(library.lastUpdated),
                      label: "Last Updated"
                    },
                    {
                      icon: <Shield className="mx-auto mb-2 text-purple-500" size={24} />,
                      value: library.license,
                      label: "License"
                    }
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                      {stat.icon}
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature) => {
                    const isSupported = library[feature.key as keyof Library] as boolean;
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.key}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          isSupported
                            ? "bg-green-50 dark:bg-green-900/20"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <Icon
                          size={16}
                          className={isSupported ? "text-green-600" : "text-gray-400"}
                        />
                        <span
                          className={`text-sm ${
                            isSupported
                              ? "text-green-800 dark:text-green-200"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {feature.label}
                        </span>
                        {isSupported && (
                          <Check size={16} className="text-green-600 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Tags */}
              <section>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {library.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Footer */}
            <div className="sticky bottom-0 flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex space-x-3">
                {library.website && (
                  <Button
                    onClick={() => window.open(library.website, "_blank")}
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink size={16} />
                    <span>Visit Website</span>
                  </Button>
                )}
                {library.github && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(library.github, "_blank")}
                    className="flex items-center space-x-2"
                  >
                    <Github size={16} />
                    <span>View on GitHub</span>
                  </Button>
                )}
              </div>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
