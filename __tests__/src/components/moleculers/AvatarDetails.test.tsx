import React from 'react';
import AvatarDetails from '../../../../src/components/moleculers/AvatarDetails';
import { render } from '../../../../src/testUtils/test-utils';
describe('AvatarDetails Component', () => {
  const user = {
    username: 'JohnDoe',
    punchLine: 'Coding is life',
  };
  it('renders correctly with a user infor', () => {
    const { getByText } = render(<AvatarDetails user={user}  onPress={()=>{}}/>);

    // Username text
    expect(getByText(user.username)).toBeTruthy();

    // Punchline text
    expect(getByText(user.punchLine)).toBeTruthy();
  });

  it('renders default values when user is null', () => {
    const { getByText } = render(<AvatarDetails user={null} onPress={()=>{}}/>);

    // Default username
    expect(getByText('Guest User')).toBeTruthy();

    // Default punchline
    expect(getByText('No punchline yet ✨')).toBeTruthy();
  });
});
