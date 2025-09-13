import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  height?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = "Start writing your blog post...",
  height = "400px"
}) => {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={12}
        className="min-h-[400px]"
      />
      <p className="text-xs text-muted-foreground">
        Supports Markdown formatting
      </p>
    </div>
  );
};