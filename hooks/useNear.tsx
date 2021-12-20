import React, { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import * as nearApi from 'near-api-js';

import { getNearConnectConfig } from '@/lib/util';
import { nearState } from '@/state/near';

/**
 * NearProvider injects a Near connection.
 *
 * Why is this a provider? The Near connection doesn't require user interaction,
 * but is used everywhere, so we connect eagerly in the root app component
 */
const NearProvider = ({ children }: { children: React.ReactNode }) => {
  const setConnection = useSetRecoilState(nearState);
  const resetConnection = useResetRecoilState(nearState);

  useEffect(() => {
    const config = getNearConnectConfig();
    nearApi.connect(config).then(setConnection);

    return resetConnection;
  });

  return <React.Fragment>{children}</React.Fragment>;
};

export const useNear = () => {
  return {
    near: useRecoilValue(nearState)!, // see note in state/near.ts
  };
};

export default NearProvider;
