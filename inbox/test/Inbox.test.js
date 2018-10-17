const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
const InitialMessage='Hello World';
const MessageChange='MessageChange';

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts 
    accounts = await web3.eth.getAccounts();
    /* .then(fetchAccounts => {
        console.log(fetchAccounts);
    }); */

    //use one of this accounts to deploy
    //the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [InitialMessage] })
        .send({ from: accounts[0], gas: '1000000' });


});

describe('Inbox', () => {
    it('display a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has default message', async() => {
     const message=await inbox.methods.message().call();
     assert.equal(message,InitialMessage);
    });

    it('can change message', async() => {
        await inbox.methods.setMessage(MessageChange).send({from:accounts[0]});
        const message=await inbox.methods.message().call();
        assert.equal(message,MessageChange);
       });
});







/* class Car{
    park(){
        return 'stopped';
    }
    drive(){
        return 'vroom';
    }
}
let car;
beforeEach(()=>{
     car=new Car();
});

describe('Car',()=>{
    it ('can park',()=>{
        assert.equal(car.park(),'stopped');
    });

    it ('can drive',()=>{
        assert.equal(car.drive(),'vroom');
    });

}); */