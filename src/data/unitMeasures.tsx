import { IUnitMeasure } from '../interfaces/unitMeasureInterface';
import { UnitMeasureEnum } from '../enum/unitMeasuresEnum';

export const unitMeasureOptions: readonly IUnitMeasure[] = [
  {
    identifier: 'G',
    value: UnitMeasureEnum.G,
    label: 'g',
    type: 'weight',
    equivalence: '1',
  },
  {
    identifier: 'Kg',
    value: UnitMeasureEnum.Kg,
    label: 'kg',
    type: 'weight',
    equivalence: '1000',
  },
  {
    identifier: 'Ml',
    value: UnitMeasureEnum.Ml,
    label: 'ml',
    type: 'liquid',
    equivalence: '0.001',
  },
  {
    identifier: 'L',
    value: UnitMeasureEnum.L,
    label: 'l',
    type: 'liquid',
    equivalence: '1000',
  },
  {
    identifier: 'Pieces',
    value: UnitMeasureEnum.Pieces,
    label: 'Pieces',
    type: 'unity',
    equivalence: '1',
  },
];
