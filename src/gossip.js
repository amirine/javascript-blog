export class Gossip {
    static create(gossip) {
        return fetch('https://javascript-blog-backend-default-rtdb.firebaseio.com/gossip.json', {
            method: 'POST',
            body: JSON.stringify(gossip),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(response => {
                gossip.id = response.name
                return gossip
            })
            .then(setGossipToLocalStorage)
            .then(Gossip.renderGossipList)
    }

    static renderGossipList() {
        const allGossip = getAllGossipFromLocalStorage()
        const html = allGossip.length
            ? allGossip.map(transformToEntry).join('')
            : `<div className="mui--text-headline">You're kidding... No news?</div>`

        const list = document.getElementById('gossip-list')
        list.innerHTML = html
    }
}

function setGossipToLocalStorage(gossip) {
    const allGossip = getAllGossipFromLocalStorage()
    allGossip.push(gossip)
    localStorage.setItem('gossips', JSON.stringify(allGossip))
}

function getAllGossipFromLocalStorage() {
    return JSON.parse(localStorage.getItem('gossips') || '[]')
}

function transformToEntry(gossip) {
    return `
    <div class="mui--text-black-54">
        ${new Date(gossip.dateOfPublication).toLocaleDateString()}
        ${new Date(gossip.dateOfPublication).toLocaleTimeString()}
    </div>
    <div>${gossip.name}</div>
    <br>
    `
}