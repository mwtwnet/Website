'use client';
import { Share } from 'lucide-react';
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export function Control({ url }: { url: string }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const onClick = (): void => {
    setOpen(true);
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
  };

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className={cn(
          buttonVariants({ className: 'gap-2', variant: 'secondary' }),
        )}
        onClick={onClick}
      >
        <Share className="size-4" />
        分享文章
      </TooltipTrigger>
      <TooltipContent className="rounded-lg border bg-fd-popover p-2 text-sm text-fd-popover-foreground">
        已拷貝
      </TooltipContent>
    </Tooltip>
  );
}