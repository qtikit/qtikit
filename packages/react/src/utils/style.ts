import React from 'react';
import {Coords} from '@qtikit/model/lib/qti2_2';

type StyleCreator<Props> = (props: Props) => React.CSSProperties;

export function createStyle(style: React.CSSProperties): React.CSSProperties;
export function createStyle<Props>(style: StyleCreator<Props>): (props: Props) => React.CSSProperties;
export function createStyle<Props>(style: React.CSSProperties | StyleCreator<Props>) {
  if (typeof style === 'function') {
    return (props: Props) => style(props);
  }

  return style;
}

export function createShapeStyle(coordsPattern: Coords['pattern']) {
  const coords = coordsPattern.split(',').map(Number);

  return {
    circle: {
      borderRadius: '50%',
      left: `${coords[0] - coords[2]}px`,
      top: `${coords[1] - coords[2]}px`,
      width: `${coords[2] * 2}px`,
      height: `${coords[2] * 2}px`,
    },
    rect: {
      left: `${coords[0]}px`,
      top: `${coords[1]}px`,
      width: `${coords[2] - coords[0]}px`,
      height: `${coords[3] - coords[1]}px`,
    },
    poly: {},
    ellipse: {},
    default: {},
  };
}
