import {isGossipLengthValid} from './utils'
import {Gossip} from './gossip.js'
import './style.css'

const form = document.getElementById('gossip-form');
const input = form.querySelector('#gossip-input');
const button = form.querySelector('#submit-button');

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
    button.disabled = !isGossipLengthValid(input.value)
});

function submitFormHandler(event) {
    // Function for handling form input
    event.preventDefault();
    if (isGossipLengthValid(input.value)) {
        const gossip = {
            name: input.value.trim(),
            dateOfPublication: new Date().toJSON()
        };
        button.disabled = true;
        Gossip.create(gossip).then( () => {
            input.value = '';
            input.className = '';
            button.disabled = false;
        })
    }
}
