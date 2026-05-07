import React from 'react';
import { cn } from '@/lib/utils';

interface TeamFlagProps {
  flag: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-4',
  md: 'w-8 h-5',
  lg: 'w-12 h-8',
  xl: 'w-16 h-10',
};

const emojiSizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-6xl md:text-7xl',
};

export const TeamFlag: React.FC<TeamFlagProps> = ({ flag, name, size = 'md', className }) => {
  const isFlagUrl = flag.startsWith('http');

  if (isFlagUrl) {
    return (
      <img 
        src={flag} 
        alt={`Bandeira ${name}`} 
        className={cn(sizeClasses[size], 'object-cover rounded', className)}
      />
    );
  }

  return (
    <span className={cn(emojiSizeClasses[size], 'block', className)}>
      {flag}
    </span>
  );
};

export default TeamFlag;
