import config from "./config.json";
import styles from  "./hello.css";

export function hello() {
    var hello = document.createElement('div');
    hello.textContent = config.helloText;
    hello.className = styles.hello;
    return hello;
};