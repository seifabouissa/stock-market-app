import Reactotron from 'reactotron-react-native';

Reactotron.configure({})
  .useReactNative({
    networking: {
      ignoreUrls: /decide/,
    },
  })
  .connect();
