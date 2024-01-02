import TodoListJSON from '../build/contracts/TodoList.json';
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    const addressAccount = await loadAccount();
    const { todoContract, tasks } = await loadContract(addressAccount);

    return { addressAccount, todoContract, tasks };
};


/**
 * loadTasks function is an asynchronous function that uses the todoContract to retrieve the count of tasks associated
 *  with a specific addressAccount and then fetches each task individually by iterating through 
 * the indexes and pushing them into an array before returning the array of tasks.
 */
const loadTasks = async (todoContract, addressAccount) => {
    const tasksCount = await todoContract.tasksCount(addressAccount);
    const tasks = [];
    for (var i = 0; i < tasksCount; i++) {
        const task = await todoContract.tasks(addressAccount, i);
        tasks.push(task);
    }
    return tasks;
};

const loadContract = async (addressAccount) => {
    const theContract = contract(TodoListJSON);
    theContract.setProvider(web3.eth.currentProvider);
    const todoContract = await theContract.deployed();
    const tasks = await loadTasks(todoContract, addressAccount);

    return { todoContract, tasks }
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};