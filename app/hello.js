import config from "./config.json";
export function hello() {
    var hello = document.createElement('div');
    hello.textContent = config.helloText;
    return hello;
};