import type {Node} from '.';
import {ScrollView, useColorScheme, View} from 'react-native';
import backgroundStyle from '../../styles/background';
import Section from '../section';
import {
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import React from '.';

export const ScrollViewComponent: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle(isDarkMode)}>
      <View style={backgroundStyle(isDarkMode)}>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  );
};
