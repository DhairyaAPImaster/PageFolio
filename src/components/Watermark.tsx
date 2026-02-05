import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface WatermarkProps {
  onUpgrade?: () => void;
}

export function Watermark({ onUpgrade }: WatermarkProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUpgradeModal(true);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/pricing');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <a
            href="https://pagefolio.site"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/90 text-background text-xs font-medium backdrop-blur-sm hover:bg-foreground transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            Built with Pagefolio
          </a>
          
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleRemoveClick}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-lg"
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="sm:max-w-md bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Remove Watermark
            </DialogTitle>
            <DialogDescription>
              Upgrade to Pro to remove the Pagefolio watermark and unlock advanced customization features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <h4 className="font-semibold mb-2">Pro includes:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Remove watermark from all websites
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Visual drag-and-drop editor
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Custom colors and fonts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Priority support
              </li>
            </ul>
          </div>

          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)} className="flex-1">
              Maybe Later
            </Button>
            <Button onClick={handleUpgrade} className="flex-1 btn-primary">
              Upgrade to Pro
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
