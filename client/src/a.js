module.exports = '666';


function * gen() {
    yield 1;
}

console.log(gen().next())