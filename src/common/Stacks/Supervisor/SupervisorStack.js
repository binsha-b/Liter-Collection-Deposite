import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SurveyQuestions from '../../../views/Supervisor/SurveyQuestions';
import SurveyConfirm from '../../../views/Supervisor/SurveyConfirm';
import SurveyResponse from '../../../views/Supervisor/SurveyResponse';
import SurveyType from '../../../views/Supervisor/SurveyType';
import CompletedSurveys from '../../../views/Supervisor/CompletedSurveys';
import SupervisorTab from '../../../common/Stacks/Supervisor/SupervisorTab';
import CollectionApproval from '../../../views/Supervisor/CollectionApproval';
import CollectionConfirm from '../../../views/Supervisor/CollectionConfirm';
import DepositProceed from '../../../views/Supervisor/DepositProceed';
import DepositConfirm from '../../../views/Supervisor/DepositConfirm';

const Stack = createStackNavigator();

const SupervisorStack = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={SupervisorTab}
      />
      <Stack.Screen
        name="SurveyType"
        component={SurveyType}
        options={() => ({headerTitle: ''})}
      />
      <Stack.Screen
        name="SurveyQuestions"
        component={SurveyQuestions}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="SurveyConfirm"
        component={SurveyConfirm}
        options={{headerShown: true, headerTitle: 'Confirm Survey'}}
      />
      <Stack.Screen
        name="CompletedSurveys"
        component={CompletedSurveys}
        options={{headerShown: true, headerTitle: 'Completed Surveys'}}
      />
      <Stack.Screen
        name="SurveyResponse"
        component={SurveyResponse}
        options={{headerShown: true, headerTitle: 'Survey Response'}}
      />
      <Stack.Screen
        name="CollectionApproval"
        component={CollectionApproval}
        options={{headerShown: true, headerTitle: 'Collection Approval'}}
      />
      <Stack.Screen
        name="CollectionConfirm"
        component={CollectionConfirm}
        options={{headerShown: true, headerTitle: 'Collection Confirm'}}
      />
      <Stack.Screen
        name="DepositProceed"
        component={DepositProceed}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="DepositConfirm"
        component={DepositConfirm}
        options={{headerShown: true, headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default SupervisorStack;
