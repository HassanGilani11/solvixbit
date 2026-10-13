import React from 'react';
import { cn } from '../../lib/utils';
import { Label } from '../typography';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="sb-form-group">
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={cn('sb-input', error && 'sb-input--error', className)}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error)' }}
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${inputId}-helper`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-muted)' }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="sb-form-group">
        {label && (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          className={cn('sb-textarea', error && 'sb-textarea--error', className)}
          {...props}
        />
        {error && (
          <span
            id={`${textareaId}-error`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error)' }}
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${textareaId}-helper`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-muted)' }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, placeholder, required, id, className, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="sb-form-group">
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={cn('sb-select', error && 'sb-select--error', className)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span
            id={`${selectId}-error`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error)' }}
          >
            {error}
          </span>
        )}
        {helperText && !error && (
          <span
            id={`${selectId}-helper`}
            style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-muted)' }}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
