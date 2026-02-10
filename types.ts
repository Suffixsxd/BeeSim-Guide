import { LucideIcon } from 'lucide-react';

export interface Command {
  name: string;
  description: string;
  usage: string;
}

export interface Punishment {
  offense: string;
  description: string;
  examples: string;
  punishment: string;
}

export interface ContentSection {
  id: string;
  title: string;
  icon: LucideIcon;
  description?: string;
  content?: string; // Markdown-like string or specialized render instruction
  subSections?: {
    title: string;
    content?: string;
    list?: string[];
    commands?: Command[];
    table?: Punishment[];
  }[];
}