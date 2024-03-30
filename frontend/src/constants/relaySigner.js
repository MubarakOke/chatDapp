import ethSigUtil from 'eth-sig-util';
import { createInstance } from './forwarder';

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
];

const ForwardRequest = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

function getMetaTxTypeData(chainId, verifyingContract) {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    domain: {
      name: 'ERC2771Forwarder',
      version: '0.0.1',
      chainId,
      verifyingContract,
    },
    primaryType: 'ForwardRequest',
  }
};

async function signTypedData(signer, from, data, input) {
  // If signer is a private key, use it to sign
  if (typeof(signer) === 'string') {
    const privateKey = Buffer.from(signer.replace(/^0x/, ''), 'hex');
    return ethSigUtil.signTypedMessage(privateKey, { data });
  }
  // Otherwise, send the signTypedData RPC call
  // Note that hardhatvm and metamask require different EIP712 input
  const isHardhat = data.domain.chainId == 31337;
  const [method, argData] = isHardhat
    ? ['eth_signTypedData', data]
    : ['eth_signTypedData_v3', JSON.stringify(data)]

  return await signer.send(method, [from, argData]);
}

async function buildRequest(forwarder, input) {
  let nonce_;
  nonce_ = await input.signer.getNonce();
  return { value: 0, gas: 2e6, nonce: nonce_, ...input };
}

async function buildTypedData(forwarder, request, input) {
  const { chainId } = await input.signer.provider.getNetwork()
  const typeData = getMetaTxTypeData(Number(chainId), forwarder.address);
  return { ...typeData, message: request };
}

async function signMetaTxRequest(signer, forwarder, input) {
  const request = await buildRequest(forwarder, input);
  const toSign = await buildTypedData(forwarder, request, input);
  const signature = await signTypedData(signer, input.from, toSign, input);
  return { signature, request };
}

export const sendMetaTx = async (contract, functionName, provider, signer, args) => {
    console.log(`Sending ${functionName} meta-tx to set name=${args}`);
    const url = import.meta.env.VITE_WEBHOOK_URL;
    if (!url) throw new Error(`Missing relayer url`);
  
    const forwarder = createInstance(provider);
    const from = await signer.getAddress();
    const data = contract.interface.encodeFunctionData(functionName, args);
    const to = contract.target;
    
    const request = await signMetaTxRequest(signer.provider, forwarder, { to, from, data, signer });
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' },
    });
  }
