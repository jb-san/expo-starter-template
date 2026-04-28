import * as React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import { ThemedText } from '../ThemedText';
import { ThemePreferenceProvider } from '@/providers/ThemePreferenceProvider';

it(`renders correctly`, () => {
  let tree: renderer.ReactTestRenderer;

  renderer.act(() => {
    tree = renderer.create(
      <ThemePreferenceProvider>
        <ThemedText>Snapshot test!</ThemedText>
      </ThemePreferenceProvider>
    );
  });

  expect(tree.root.findByType(Text).props).toMatchSnapshot();
});
