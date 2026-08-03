'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/utils';

interface AccordionItem { id: string; question: string; answer: string; }
interface AccordionProps { items: AccordionItem[]; className?: string; }

export default function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={cn('divide-y divide-[#E5E5E5]', className)}>
      {items.map(item => (
        <div key={item.id}>
          <button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            className="w-full flex items-center justify-between py-5 text-left group"
            aria-expanded={open === item.id}
          >
            <span className="font-medium text-[#111111] group-hover:text-[#D4AF37] transition-colors pr-4">
              {item.question}
            </span>
            <span className="shrink-0 text-[#D4AF37]">
              {open === item.id ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[#6B6B6B] text-sm leading-relaxed">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
