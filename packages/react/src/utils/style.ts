import React from 'react';

type StyleCreator<Props> = (props: Props) => React.CSSProperties;

export function createStyle(style: React.CSSProperties): React.CSSProperties;
export function createStyle<Props>(style: StyleCreator<Props>): (props: Props) => React.CSSProperties;
export function createStyle<Props>(style: React.CSSProperties | StyleCreator<Props>) {
  if (typeof style === 'function') {
    return (props: Props) => style(props);
  }

  return style;
}
