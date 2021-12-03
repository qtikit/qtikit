import {
  TextEntryInteractionCharacteristics as TextEntryInteractionProps,
  ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps,
} from '@qtikit/model/lib/qti2_2';

type PlaceHolderProps = Pick<TextEntryInteractionProps, 'placeholderText' | 'expectedLength'> &
  Pick<ExtendedTextInteractionProps, 'placeholderText' | 'expectedLength' | 'expectedLines'>;

export const getPlaceHolder = (props: PlaceHolderProps) => {
  const {placeholderText, expectedLength, expectedLines} = props;
  const expectedLengthText = expectedLength ? ` ${expectedLength} length expected` : '';
  const expectedLineText = expectedLines ? ` ${expectedLines} line expected` : '';

  return `${placeholderText || ''}${expectedLengthText}${expectedLineText}`;
};
