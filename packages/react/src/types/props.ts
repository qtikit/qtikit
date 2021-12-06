type FlatValue<Characteristic> = Characteristic extends {$value: infer Value}
  ? Value
  : Characteristic extends {$value: infer Value}[]
  ? Value[]
  : Characteristic;
type FlatValues<Characteristics> = {[Key in keyof Characteristics]: FlatValue<Characteristics[Key]>};

type QtiModelProps<BaseCharacteristics, Characteristics> = FlatValues<BaseCharacteristics> &
  FlatValues<Characteristics>;

export {FlatValue, FlatValues, QtiModelProps};
