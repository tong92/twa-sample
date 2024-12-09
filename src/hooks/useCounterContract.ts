import { useEffect, useState } from 'react';
import { TutoCnt as Counter } from '../contracts/counter';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | number>();
  const { sender } = useTonConnect();

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQDzePGFh7fkPcjftXSxiwKTROKiSAP4wRtEMfG61JM7wThf') // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!counterContract) return;
      setVal(null);
      const val = await counterContract.getCounter();
      setVal(Number(val));
      await sleep(5000);
      getValue();
    }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => counterContract?.sendIncrement(sender),
  };
}
