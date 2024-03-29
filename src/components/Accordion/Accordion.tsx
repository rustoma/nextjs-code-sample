import dynamic from 'next/dynamic';
import React from 'react';

import { clsxm } from '@/lib/clsxm';
import { useAccordion } from '@/hooks/useAccordion';

import ArrowDown from '@/assets/svgs/arrow-down-icon.svg';
import HelpIcon from '@/assets/svgs/question-mark-icon.svg';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

interface AccordionProps {
  title: string;
  helperText?: string;
  Icon?: React.ReactNode;
  maxContentHeight?: number;
  children:
    | React.ReactNode
    | (({ isAccordionOpen }: { isAccordionOpen: boolean }) => React.ReactNode);
  containerClasses?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  helperText,
  Icon,
  maxContentHeight,
  children,
  containerClasses,
}) => {
  const { contentRef, isAccordionOpen, toggleAccordion, handleKeyPress } =
    useAccordion();

  return (
    <>
      <div className={clsxm('accordion w-full', containerClasses)}>
        <div className='rounded bg-grayBg pt-[30px] pl-[30px] pr-[25px]'>
          <div
            className='active:border-tansparent mb-7 flex cursor-pointer items-center justify-between'
            onClick={toggleAccordion}
          >
            <div className='flex items-center'>
              {Icon}
              <h4>{title}</h4>
              {helperText && (
                <HelpIcon className='ml-[5px]' data-tip={helperText} />
              )}
            </div>
            <ArrowDown
              tabIndex={0}
              onKeyPress={handleKeyPress}
              className='focus-active h-6 w-6 p-1'
            />
          </div>
          <div
            ref={contentRef}
            className={clsxm(
              'max-h-0 overflow-hidden transition-all duration-300 ease-linear'
            )}
          >
            <div
              className='overflow-auto'
              style={{ maxHeight: maxContentHeight }}
            >
              {typeof children === 'function'
                ? children({ isAccordionOpen })
                : children}
            </div>
            <div className='h-[48px]' />
          </div>
        </div>
      </div>
      {helperText && <ReactTooltip effect='solid' />}
    </>
  );
};
