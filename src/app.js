import {isGossipLengthValid, createModalWindow} from './utils';
import {authWithEmailPassword, getAuthForm} from "./auth";
import {Gossip} from './gossip.js';
import './style.css';

window.addEventListener('load', Gossip.renderGossipList);
const formForGossipInput = document.getElementById('gossip-form');
const buttonForAuth = document.getElementById('auth-button');
const inputGossip = formForGossipInput.querySelector('#gossip-input');
const buttonSubmitGossipInput = formForGossipInput.querySelector('#submit-button');

formForGossipInput.addEventListener('submit', submitFormHandler);
inputGossip.addEventListener('input', () => {
    buttonSubmitGossipInput.disabled = !isGossipLengthValid(inputGossip.value)
});
buttonForAuth.addEventListener('click', openModalWindowForAuth);

function submitFormHandler(event) {
    // Function handling main form input
    event.preventDefault();
    if (isGossipLengthValid(inputGossip.value)) {
        const gossip = {
            name: inputGossip.value.trim(),
            dateOfPublication: new Date().toJSON()
        };
        buttonSubmitGossipInput.disabled = true;
        Gossip.create(gossip).then( () => {
            inputGossip.value = '';
            inputGossip.className = '';
            buttonSubmitGossipInput.disabled = false;
        })
    }
}

function openModalWindowForAuth() {
    // Function opening modal window after {buttonForAuth} click
    createModalWindow('Log In', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormSubmit, {once:true})
}

function authFormSubmit(event) {
    // Function handling auth form input in modal window
    event.preventDefault();
    const loginBtn = event.target.querySelector('button');
    const email = event.target.querySelector('#email-input').value;
    const password = event.target.querySelector('#password-input').value;

    loginBtn.disabled = true;
    authWithEmailPassword(email, password)
        .then(Gossip.fetch)
        .then(renderContentFromModalAfterAuth)
        .then(() => {
            loginBtn.disabled = false;
        })
}

function renderContentFromModalAfterAuth(content) {
    // Function rendering gossip list in modal window
    if (typeof content === 'string') {
        createModalWindow("Error!", content);
    } else {
        createModalWindow("Fresh gossip", Gossip.gossipListToHTML(content));
    }
}
