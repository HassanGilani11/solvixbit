import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Heading } from '../typography';
import { Button } from '../actions';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="sb-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'sb-modal-title' : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={cn('sb-modal', className)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          {title && (
            <Heading id="sb-modal-title" level={3}>
              {title}
            </Heading>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 'var(--font-size-lg)',
              color: 'var(--theme-muted)',
              cursor: 'pointer',
              padding: 'var(--space-1)',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ marginBottom: footer ? 'var(--space-6)' : 0 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>{footer}</div>}
      </div>
    </div>
  );
};

export interface ToastProps {
  isOpen?: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen = true,
  message,
  type = 'info',
  onClose,
  duration = 4000,
  className,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const typeBorderColor = {
    success: 'var(--color-semantic-success)',
    warning: 'var(--color-semantic-warning)',
    error: 'var(--color-semantic-error)',
    info: 'var(--color-semantic-info)',
  }[type];

  return (
    <div
      role="alert"
      className={cn('sb-toast', className)}
      style={{ borderLeft: `4px solid ${typeBorderColor}` }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--theme-text)' }}>{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alert"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--theme-muted)',
            cursor: 'pointer',
            padding: 0,
            fontSize: 'var(--font-size-sm)',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('sb-accordion', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="sb-accordion-item">
            <button
              type="button"
              className="sb-accordion-trigger"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'var(--theme-muted)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  paddingBottom: 'var(--space-4)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--theme-muted)',
                  lineHeight: 'var(--line-height-relaxed)',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTabId,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || items[0]?.id || '');

  return (
    <div className={cn('sb-tabs', className)}>
      <div className="sb-tabs-list" role="tablist">
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn('sb-tab-trigger', isActive && 'sb-tab-trigger--active')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" style={{ paddingTop: 'var(--space-2)' }}>
        {items.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
