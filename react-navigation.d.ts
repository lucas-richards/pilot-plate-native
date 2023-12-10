
//This file Resolves an Error: Argument of Type String is Not Assignable to Parameter of Type Never
//when using navigation.navigate('name of page')
//docs:  https://spin.atomicobject.com/2023/05/10/not-assignable-parameter-never/

import { NavigationProp, ParamListBase } from '@react-navigation/native';

declare global {
 namespace ReactNavigation {
   interface RootParamList extends ParamListBase {}
  }
}

export function useNavigation<
  T extends NavigationProp
>(): T;