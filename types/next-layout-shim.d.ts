// adds an optional getLayout function to Next pages
import 'next';

declare module 'next' {
  interface NextPage {
    getLayout?: (page: ReactElement) => ReactNode;
  }
}
