import type { Reducer } from 'umi';
//注册的请求单位
export type RegistModelType = {
    namespace: 'registrationaudit';
    state: {list:[]};
    reducers: {
      changeSetting: Reducer<any>;
    };
  };
const RegistryModel: RegistModelType = {
    namespace: 'registrationaudit',
    state: {list:[]},
    reducers: {
      changeSetting(state = {}, { payload }) { 
        return {
          ...state,
          ...payload,
        };
      },
    },
  };
  export default RegistryModel;