import {
  TextEntryInteractionCharacteristics as TextEntryInteractionProps,
  ExtendedTextInteractionCharacteristics as ExtendedTextInteractionProps,
} from '@qtikit/model/lib/qti2_2';

type PlaceHolderProps = TextEntryInteractionProps & ExtendedTextInteractionProps;

export const getPlaceHolder = (props: PlaceHolderProps) => {
  const {placeholderText, expectedLength, expectedLines} = props;
  const expectedLengthText = expectedLength ? ` ${expectedLength} length expected` : '';
  const expectedLineText = expectedLines ? ` ${expectedLines} line expected` : '';

  return `${placeholderText || ''}${expectedLengthText}${expectedLineText}`;
};
