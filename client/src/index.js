require('./a');
require('./index.scss');
require('@babel/polyfill')


setTimeout(() => {
    console.log(1);
})

@log
class A {
    constructor() {
        this.b = 1;
    }
}

let a = new A();
console.log(a);


function log(target) {
    console.log(target);
}


'aaa'.includes('a');