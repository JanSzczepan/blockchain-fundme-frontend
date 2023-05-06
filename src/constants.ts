export const contractAddress = '0x9Bd3abc67fB898cb7448fBC4Dc37FDE23A8aCc1A'
export const abi = [
   {
      inputs: [
         {
            internalType: 'address',
            name: 'priceFeedAddress',
            type: 'address',
         },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
   },
   {
      inputs: [],
      name: 'FundMe__CallFailed',
      type: 'error',
   },
   {
      inputs: [],
      name: 'FundMe__NotEnoughETH',
      type: 'error',
   },
   {
      inputs: [],
      name: 'FundMe__NotOwner',
      type: 'error',
   },
   {
      stateMutability: 'payable',
      type: 'fallback',
   },
   {
      inputs: [],
      name: 'MINIMUM_USD',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'fund',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'address',
            name: 'funderAddress',
            type: 'address',
         },
      ],
      name: 'getAddressToAmountFunded',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [
         {
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
         },
      ],
      name: 'getFunder',
      outputs: [
         {
            internalType: 'address',
            name: '',
            type: 'address',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getOwner',
      outputs: [
         {
            internalType: 'address',
            name: '',
            type: 'address',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getPriceFeed',
      outputs: [
         {
            internalType: 'contract AggregatorV3Interface',
            name: '',
            type: 'address',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'getVersion',
      outputs: [
         {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
         },
      ],
      stateMutability: 'view',
      type: 'function',
   },
   {
      inputs: [],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
   },
   {
      stateMutability: 'payable',
      type: 'receive',
   },
]
