import { Color } from '~/shared/@types/category';

export function renderColorBox (type: Color): string {
  switch (type) {
    case Color.BLACK:
      return '#000000';

    case Color.RED:
      return '#F21717';

    case Color.YELLOW:
      return '#FFD600';

    case Color.BLUE:
      return '#1793ED';

    default:
      return '#FFFFFF';
  }
}
