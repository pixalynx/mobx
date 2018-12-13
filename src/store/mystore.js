import {observable, action, decorate} from 'mobx';

class myStore {
    id = Math.random();
    title = "Wazzy RUles";
    finished = false;
    jsondata = {};

    async getJson(){
        const response = await fetch('https://reqres.in/api/users?page=2');
        const data = await response.json();
        this.jsondata = data;
    }
}
decorate(myStore, {
    title: observable,
    finished: observable,
    jsondata : observable,
    getJson : action
})

const mystore = new myStore();

export default mystore;