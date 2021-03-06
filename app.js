var electron = require('electron');  // Module to control application life.
//var BrowserWindow = require('browser-window');  // Module to create native browser window.
const {app, ipcRenderer, BrowserWindow, ipcMain, dialog} =  require('electron');
const Tx = require('ethereumjs-tx').Transaction
var crypto = require("crypto");
var eccrypto = require("eccrypto");
var pkkey = '';
var Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/914bc8ee83c746a9801f4a57f0432aff');
var hdkey = require('ethereumjs-wallet/hdkey');
var Wallet = require('ethereumjs-wallet');
const ethUtils = require('ethereumjs-util');
var oldresult = 999999999;
var myetheraddress;
var publickey = '';
const EthCrypto = require('eth-crypto');
//var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');


const contractAddress = "0x3cC5EB07E0e1227613F1DF58f38b549823d11cB9"
var mainWindow = null;
const url = require("url");
const path = require("path");

var data = '[{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"mineamount","type":"uint256"}],"name":"becameaminer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkAddrMinerAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkAddrMinerStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkRewardStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"checkmemopurchases","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fundsWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"genesisReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnumber","type":"uint256"}],"name":"getDailyReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getactiveminersnumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getblockhash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getmaximumAverage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getmemotextcountforaddr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_blocknumber","type":"uint256"}],"name":"getspesificblockhash","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getyourcoinsbackafterthreemonths","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maximumTarget","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nAddrHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nRewarMod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nWtime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberofminer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"premined","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_memo","type":"string"}],"name":"sendtokenwithmemo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bnumber","type":"uint256"}],"name":"signfordailyreward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
var abi = JSON.parse(data);
//console.log(abi);

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});
//app.allowRendererProcessReuse = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  console.log("ready");
  app.getVersion();
  mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    'min-width': 300,
    'min-height': 600,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    webPreferences: {
            nodeIntegration: true
        }
  });
  mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname,"/index.html"),
        protocol: "file:",
        slashes:true
    })
  );
mainWindow.on('closed', function() {
  mainWindow = null;
});



ipcMain.on('rreloader', (event, memodetails) => {
   console.log(memodetails);
   getbalance();


});

ipcMain.on('sendmemoplease', (event, memodetails) => {
  console.log(memodetails);
  if(memodetails["amount"] == '' || memodetails["memoo"] == '' || memodetails["rece"] == '') {

    mainWindow.send("enablememoagain", "true");
    const options = {
    type: 'question',
    buttons: ['Okey.'],
    defaultId: 2,
    title: 'Warning',
    message: 'Receiver amount or receiver require.',
    detail: 'Please fill everywhere',
    };

    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    console.log(response);
    console.log(checkboxChecked);
    });


  } else {
    //omgbbqhax
    console.log("ok");
    var xxnewamo = web3.utils.toWei(memodetails["amount"], 'ether');
    encplease(memodetails["pubbkey"], xxnewamo, memodetails["memoo"]);
  }



  //omgbb

});

async function encplease(pubkey, xxnewamo, newmemo) {

  const encrypted = await EthCrypto.encryptWithPublicKey(pubkey, newmemo);
  console.log(encrypted);
  const address = EthCrypto.publicKey.toAddress(pubkey);

  const encryptedx = EthCrypto.cipher.stringify(encrypted);

  const grpice  = web3.eth.getGasPrice().then(function(networkgasprice){
      console.log("networkgasprice",networkgasprice);
    var MyContract = new web3.eth.Contract(abi, contractAddress, {
        from: myetheraddress,
        gasPrice: web3.utils.toWei(networkgasprice, 'gwei')
    });




    MyContract.methods.sendtokenwithmemo(xxnewamo, address, encryptedx).estimateGas({from: myetheraddress})
      .then(function(gasAmount){
              console.log("gasolina", gasAmount);
                console.log("gasolin222a", web3.utils.toHex(web3.utils.toWei(networkgasprice, 'gwei')));

              web3.eth.getTransactionCount(myetheraddress).then(function(nonce){
                console.log("my nonce value is here:", nonce);
                dataTx = MyContract.methods.sendtokenwithmemo(xxnewamo, address, encryptedx).encodeABI();  //The encoded ABI of the method


                 console.log("dataTx",dataTx);
                 var rawTx = {
                 'from': myetheraddress,
                 'chainId': 1,
                 'gas': web3.utils.toHex(gasAmount),
                 'data':dataTx,
                 'to': contractAddress,
                 'gasPrice': web3.utils.toHex(networkgasprice),
                 'nonce':  web3.utils.toHex(nonce) }

                 var tx = new Tx(rawTx);
                 console.log("tx",tx);
                 tx.sign(pkkey);
                 var serializedTx = tx.serialize();
                 console.log("serializedTx",serializedTx);

                 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(function(TxHash){
                    console.log("TxHash",TxHash);
                    console.log("real tx hash",TxHash["transactionHash"]);
                    mainWindow.send("showtx", TxHash["transactionHash"]);
                });
              });
      })
      .catch(function(err){
            console.log("gasolina err", err);
      });


    }).catch(function(err){
      console.log(err)
    });


}


ipcMain.on('receivekey', (event, privateKey) => {
 console.log("im here!!!", privateKey);
 checkxx = privateKey.split(" ").length-1
 console.log("checkxx",checkxx);
 var mnemonic = privateKey;
 if(checkxx > 10){
   const HDWallet = require('ethereum-hdwallet')
   const hdwallet = HDWallet.fromMnemonic(mnemonic);
   console.log(`0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`)
   var adasd = hdwallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex')
   var privateKey = Buffer.from(adasd, 'hex' );
   publickey = eccrypto.getPublic(privateKey);


   myetheraddress = `0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`; //ethUtils.privateToAddress(privateKey).toString('hex')
   console.log("public keyyy",  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex'));
   publickey =  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex')
   console.log(privateKey);
   console.log(myetheraddress);
   pkkey = privateKey;
   console.log("end");
   getbalance();
 } else {


   mainWindow.send("enableagain", "true");
   const options = {
   type: 'question',
   buttons: ['好'],
   defaultId: 3,
   title: 'Warning',
   message: 'Wallet type problem',
   detail: 'Hola, you need 12 words mnemonic wallet! you can use trustwallet for that!',
 };

 dialog.showMessageBox(null, options, (response, checkboxChecked) => {
   console.log(response);
   console.log(checkboxChecked);
 });


 }
});





function getbalance() {


        const grpice  = web3.eth.getGasPrice().then(function(networkgasprice){

          console.log("networkgasprice",networkgasprice)

          var MyContract = new web3.eth.Contract(abi, contractAddress, {
              from: myetheraddress,
              gasPrice: web3.utils.toWei(networkgasprice, 'gwei')
          });

          web3.eth.getBalance(myetheraddress).then(function(balance){
            var bal = web3.utils.fromWei(balance);
            if(bal < 0.01) {
                mainWindow.send("enableagain", "true");
                const options = {
                type: 'question',
                buttons: ['I understand problem, i will load ethereum to this address.'],
                defaultId: 2,
                title: 'Warning',
                message: 'Ethereum balance problem',
                detail: 'Hola, you need minimum 0.01 ethereum balance. Because of ethereum eRush write functions.',
              };

              dialog.showMessageBox(null, options, (response, checkboxChecked) => {
                console.log(response);
                console.log(checkboxChecked);
              });
            } else {
                  console.log("eawc");
                  var detailz = {}
                  detailz['ethbalance'] = parseFloat(bal).toFixed(4);
                  detailz['address'] = myetheraddress
                  detailz['publickey'] = publickey
                  MyContract.methods.balanceOf(myetheraddress).call().then(function(result){
                  var myTokenBalance = result;
                  var tokenbalance = web3.utils.fromWei(myTokenBalance);
                  console.log(tokenbalance);
                  detailz['eerbalance'] = parseFloat(tokenbalance).toFixed(2);

                  MyContract.methods.getmemotextcountforaddr(myetheraddress).call().then(function(result){
                      //console.log("resolt", result);
                      if(result == 0){
                        console.log("dont have an any message");
                      } else {

                        var myray = [...Array(result).keys()];

                        for (i = 0; i < result; i++) {
                           console.log("xxx",i);
                           MyContract.methods.checkmemopurchases(myetheraddress, i).call().then(function(result){
                             //console.log("resolt", result);
                             decryptplease(result);
                           });

                        }
                      }





                   });




                  mainWindow.send("getdatils", detailz);
               });


            }
          });
        }).catch(function(err){
          console.log(err)
        });
}


async function decryptplease(encmessage) {
  try {
    console.log("11111");
    console.log("enn1",encmessage );
    console.log("33333");
    console.log(encmessage["2"]);
    var encmsh = EthCrypto.cipher.parse(encmessage["2"]);
    console.log("encmsh", encmsh);
    datazzz  = [];
    const encmsgggg = await EthCrypto.decryptWithPrivateKey(pkkey.toString('hex'), encmsh);
    console.log("encmsgggg",encmsgggg);
    console.log(encmessage["1"]);
    console.log(encmessage["3"]);

    datazzz.push(encmessage["1"]);
    datazzz.push(encmsgggg);
    datazzz.push(encmessage["3"]);
    mainWindow.send("appendnewmemo", datazzz);
  } catch(err) {
    console.log(pkkey);
    console.log(pkkey.toString('hex'));
    console.log(err); // TypeError: failed to fetch
  }




}






});
