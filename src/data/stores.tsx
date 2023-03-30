export interface StoreOption {
  readonly value: string;
  readonly label: string;
}

export const storesOptions: readonly StoreOption[] = [
  { value: 'sams', label: "Sam's Club" },
  { value: 'walmart', label: 'Walmart' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'mercadoLibre', label: 'Mercado Libre' },
  { value: 'chedraui', label: 'Chedraui' },
  { value: 'costco', label: 'Costco' },
  { value: 'bodega_aurrera', label: 'Bodega Aurrera' },
  { value: 'soriana', label: 'Soriana' },
  { value: 'city_market', label: 'City Market' },
  { value: 'fresko', label: 'Fresko' },
  { value: 'comer', label: 'La Comer' },
];
