import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel="Pokemons por página";
  customPaginatorIntl.nextPageLabel = 'Próxima Página';
  customPaginatorIntl.previousPageLabel = 'Página anterior';
  customPaginatorIntl.firstPageLabel = 'Primeira Página';
  customPaginatorIntl.lastPageLabel = 'Ùltima Pàgina'

  return customPaginatorIntl;
}
