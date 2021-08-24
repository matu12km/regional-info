import React, { FunctionComponent } from 'react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdLink,
  MdFormatQuote,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdDeveloperMode,
} from 'react-icons/md';
import { Icon, Tooltip } from '@chakra-ui/react';

interface StyleButtonPropsI {
  active?: boolean;
  label?: string;
  onToggle?: any;
  className?: string;
  style?: string;
}

export const StyleButton: FunctionComponent<StyleButtonPropsI> = ({ style, active, label, onToggle, className }) => {
  const onToggleCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(style);
  };

  let toolTipText = label || '';
  if (label === 'UL') toolTipText = 'Bulleted List';
  else if (label === 'OL') toolTipText = 'Numbered List';
  else if (label === 'Monospace') toolTipText = 'Inline Code';

  const activeclass = `${active ? ' RichEditor-activeButton' : ''}`;
  const classNames = className + activeclass;
  return (
    <span className={classNames} onMouseDown={onToggleCustom}>
      <Tooltip title={toolTipText}>
        <Icon>{getIconIfValid(label)}</Icon>
      </Tooltip>
    </span>
  );
};

const getIconIfValid = (label: any) => {
  switch (label) {
    case 'Bold':
      return <MdFormatBold />;
    case 'Italic':
      return <MdFormatItalic />;
    case 'Underline':
      return <MdFormatUnderlined />;
    case 'Monospace':
      return <MdCode />;
    case 'Link':
      return <MdLink />;
    case 'Blockquote':
      return <MdFormatQuote />;
    case 'UL':
      return <MdFormatListBulleted />;
    case 'OL':
      return <MdFormatListNumbered />;
    case 'Code Block':
      return <MdDeveloperMode />;
    default:
      return label;
  }
};
