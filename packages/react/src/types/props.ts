type FlatValue<Characteristic> = Characteristic extends {$value: infer Value}
  ? Value
  : Characteristic extends {$value: infer Value}[]
  ? Value[]
  : Characteristic;
type FlatValues<Characteristics> = {[Key in keyof Characteristics]: FlatValue<Characteristics[Key]>};

type CharsToProps<BaseInteractionCharacteristics, InteractionCharacteristics> =
  FlatValues<BaseInteractionCharacteristics> & FlatValues<InteractionCharacteristics>;

export {FlatValue, FlatValues, CharsToProps};
