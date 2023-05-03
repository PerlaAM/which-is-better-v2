import { IUnitMeasure } from '../interfaces/unitMeasureInterface';

export const unitMeasureOptions: readonly IUnitMeasure[] = [
  { value: 'g', label: 'g', type: 'weight' },
  { value: 'kg', label: 'kg', type: 'weight' },
  { value: 'ml', label: 'ml', type: 'volume' },
  { value: 'l', label: 'l', type: 'volume' },
  { value: 'pieces', label: 'Pieces', type: 'unity' },
];
