import { useEffect } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { useIsCompact } from '../../hooks/useMediaQuery';

/**
 * App-style overlay container. On compact screens (< lg) it's a native-feeling
 * bottom sheet: springs up from the bottom edge, drag the grab-handle down to
 * dismiss. On desktop the same content renders as a centered dialog. Content
 * scrolls internally; body scroll is locked while open.
 */
export default function BottomSheet({ open, onClose, label, children }) {
  const compact = useIsCompact();
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[65] bg-black/55 backdrop-blur-sm"
          />
          {compact ? (
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={label}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 110 || info.velocity.y > 600) onClose();
              }}
              className="fixed inset-x-0 bottom-0 z-[70] rounded-t-[1.75rem] border-t border-line bg-surface pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-lift"
            >
              {/* Grab handle: the drag target (content below scrolls freely). */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="cursor-grab touch-none px-6 pb-2 pt-3 active:cursor-grabbing"
                aria-hidden="true"
              >
                <div className="mx-auto h-1.5 w-12 rounded-full bg-line" />
              </div>
              <div className="max-h-[78vh] overflow-y-auto px-5" data-lenis-prevent>
                {children}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dialog"
              role="dialog"
              aria-modal="true"
              aria-label={label}
              initial={{ opacity: 0, scale: 0.96, x: '-50%', y: '-46%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.96, x: '-50%', y: '-46%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-[70] w-[26rem] max-w-[calc(100vw-2rem)] rounded-bento border border-line bg-surface p-6 shadow-lift"
            >
              <div className="max-h-[76vh] overflow-y-auto" data-lenis-prevent>
                {children}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
