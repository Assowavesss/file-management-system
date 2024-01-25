import List from './list.lib';

import { render } from '@testing-library/react';

describe('@/lib/List testing', () => {
  it('should render correctly with list of string', () => {
    const Component = (): JSX.Element => {
      return (
        <>
          <List
            items={['component 1', 'component 2']}
            renderItem={(item, index) => <p key={index}>{item}</p>}
          />
        </>
      );
    };

    render(<Component />);
  });
});
