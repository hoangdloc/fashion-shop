import TableDesktop from './TableDesktop';
import TableMobile from './TableMobile';

export interface TableRef {
  disableAnimation: () => void
}

export { TableDesktop, TableMobile };
