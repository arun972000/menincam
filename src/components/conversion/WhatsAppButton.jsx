import { whatsappLink } from '../../data/site';
import Icon from '../ui/Icon';
import { track } from '../../lib/track';

/**
 * Floating WhatsApp button — desktop only (essential for the Indian market).
 * On mobile the app chrome covers this: WhatsApp lives in the top bar, the
 * Book flow and the More sheet. Opens a pre-filled chat.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Men in Cam on WhatsApp"
      onClick={() => track('whatsapp_click', { source: 'float' })}
      className="group fixed bottom-5 right-5 z-40 hidden items-center justify-end sm:bottom-6 sm:right-6 lg:flex"
    >
      {/* Tooltip is absolute + pointer-events-none so it never expands the
          button's hit-area or covers the sticky bar's close button. */}
      <span className="pointer-events-none absolute right-[4.5rem] hidden whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ivory opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <Icon name="whatsapp" filled className="relative h-7 w-7 text-white" />
      </span>
    </a>
  );
}
