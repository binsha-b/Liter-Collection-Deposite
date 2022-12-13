import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {I18nManager, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from './src/utils/theme';
import IntroScreen from './src/views/IntroScreen';
import Login from './src/views/Login';
import {commonStyles} from './src/utils/commonStyles';
import HeaderBackIcon from './src/common/HeaderBackIcon';
import SupervisorStack from './src/common/Stacks/Supervisor/SupervisorStack';
import PDFViewer from './src/common/PDFViewer';
import CollectionList from './src/views/Supervisor/CollectionList'
import ForemanFuelType from './src/views/Foreman/ForemanFuelType';
import ForemanProceed from './src/views/Foreman/ForemanProceed';
import ForemanConfirm from './src/views/Foreman/ForemanConfirm';
const {colors} = myDefaultTheme;

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={myDefaultTheme}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        animated
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerRightContainerStyle: commonStyles.headerRightContainerStyle,
          headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: commonStyles.headerTitle,
          headerBackImage: () => (
            <HeaderBackIcon
              icon={I18nManager?.isRTL ? 'chevron-right' : 'chevron-left'}
            />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerPressColor: colors.primaryLight,
        }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={SupervisorStack} />
        <Stack.Screen
          options={{
            headerTitle: 'Survey Response',
          }}
          name="PDFViewer"
          component={PDFViewer}
        />
         <Stack.Screen name="CollectionList" component={CollectionList} />
         <Stack.Screen name="ForemanFuelType" component={ForemanFuelType} />
         <Stack.Screen name="ForemanProceed" component={ForemanProceed} />
         <Stack.Screen name="ForemanConfirm" component={ForemanConfirm} />
      </Stack.Navigator>
      <FlashMessage
        style={{backgroundColor: colors.primaryLight}}
        position="bottom"
        titleStyle={{
          color: '#fff',
          fontSize: scale(12),
        }}
        textStyle={{
          color: '#fff',
          fontSize: scale(12),
        }}
      />
    </NavigationContainer>
  );
};

export default App;
