# A stranger things voting Dapp !

Beware of your decentralized vote ;-)

Please find in attach a react project for a blockchain voting system 
This is my first real experience with javascript and react ... but I'm proud to have made it !

This application use : 
* Event and useEffect, and components 
* display the connected metamask address, 
* display if you are the owner ...  eleven appears = she has all the power ;-)
* display if you are the voters ... = the bad guys, you will see the monster in the bottom of the page 
* Display the list of all voters 
* Display the list of proposal 
* Enable / Display buttons, inputs following who you are
* some internal test are also done checksum and alert on address, etc ... 

You can also test the deployed version on vercel here : (https://voting-dapp-stranger-5hw1.vercel.app/)
## Getting started Video 

First, see the video tutorial to make a "stranger" vote here : (https://www.loom.com/share/a7b16e5b46564f0eac07777d0d755393)
(done on the localhost, vercel app is also running see below)

## Directories (some important files)
```
├── truffle - contracts => Voting.sol  the contracts with added comments 
├── truffle - truffle-config.js => with commented gas limit (otherwise you can't deploy) 
└─── client - src 
              ├── App.jsx    => Footer & stranger things Logo 
              └── components 
                     ├── LogoST.jsx : stranger things Logo 
                     └─── Web3stuff
                              ├── Address.jsx : 
                              ├── Button.jsx : 
                              ├── ButtonAddSequence.jsx : 
                              ├── ButtonAddVoter.jsx : 
                              ├── ButtonProposal.jsx : 
                              └── index.jsx : 
```                              

## Requirements 

* truffle 
* ganache 
* Solidity 0.8.13
* vercel (with Node in version 16.x )
Please change the node version on vercel : 
https://vercel.com/changelog/node-js-version-now-customizable-in-the-project-settings


## Usage Localhost : 

First run ganache (with mnemonics from your test wallet)
```
ganache
```
Migrate the app 
```
cd truffle 
truffle migrate --reset
```
Run the client 
```
cd client
npm run start
```

## Result

Here is a screnshot of the application 
<img width="953" alt="image" src="https://user-images.githubusercontent.com/23697098/203336362-ce30b4fc-5d5f-410c-98b1-d8e278a029dd.png">


## Usage vercel 

https://voting-dapp-stranger-5hw1.vercel.app/

Screenshot on vercel 
<img width="947" alt="image" src="https://user-images.githubusercontent.com/23697098/203451974-7b4daa50-01f6-47d6-8b88-e2f4c4f5c902.png">


## contract owner address on Goerli testnet 
```
Owner address
0x305E5dbCcFc1BC4a5aE3E67e64830ce55b51dCD6
Smart contract address
0xD625E90EB650d479D250c67E3426aDb1fe8D873C
```
See on etherscan : https://goerli.etherscan.io/address/0xD625E90EB650d479D250c67E3426aDb1fe8D873C
