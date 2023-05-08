import { theme } from '~/config/theme';
import { Status } from '~/shared/@types/status';

interface BadgeType {
  label: string
  color: string
}

export function renderBadge (status: Status): BadgeType | null {
  switch (status) {
    case Status.SOLD_OUT:
      return { label: 'Sold out', color: theme.colors.grayDark };

    case Status.HOT:
      return { label: 'Hot', color: theme.colors.secondaryRed };

    case Status.SALE:
      return { label: 'Sale', color: theme.colors.primaryBlack };

    default:
      return null;
  }
}
