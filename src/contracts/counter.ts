import { Address, beginCell, Cell, Contract, ContractProvider, Sender } from '@ton/core';
// import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TutoCntConfig = {
    initValue: number,
};

export function tutoCntConfigToCell(config: TutoCntConfig): Cell {
    return beginCell().storeUint(config.initValue, 64).endCell();
}

export class TutoCnt implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    // static createFromAddress(address: Address) {
    //     return new TutoCnt(address);
    // }

    // static createFromConfig(config: TutoCntConfig, code: Cell, workchain = 0) {
    //     const data = tutoCntConfigToCell(config);
    //     const init = { code, data };
    //     return new TutoCnt(contractAddress(workchain, init), init);
    // }

    // async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    //     await provider.internal(via, {
    //         value,
    //         sendMode: SendMode.PAY_GAS_SEPARATELY,
    //         body: beginCell().endCell(),
    //     });
    // }

    async getCounter(provider: ContractProvider) {
        const { stack } = await provider.get("counter", []);
        return stack.readBigNumber();
    }

    async sendIncrement(provider: ContractProvider, via: Sender) {
        const messageBody = beginCell()
          .storeUint(1, 32) // op (op #1 = increment)
          .storeUint(0, 64) // query id
          .endCell();
        await provider.internal(via, {
          value: "0.002", // send 0.002 TON for gas
          body: messageBody
        });
      }
}
