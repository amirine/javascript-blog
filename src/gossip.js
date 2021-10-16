export class Gossip {
    static create(gossip) {
        // Function creating new gossip record in database and rendering it to a main page
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

    static fetch(token) {
        // Function checking token and getting data from database
        if (!token) {
            return Promise.resolve('<p class="tokenError auth-form-modal">No token found.<p>')
        }
        return fetch(`https://javascript-blog-backend-default-rtdb.firebaseio.com/gossip.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="tokenError auth-form-modal">${response.error}<p>'`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key,
                })) : []
            })
    }

    static renderGossipList() {
        // Function rendering full gossip list
        const allGossip = getAllGossipFromLocalStorage()
        const html = allGossip.length
            ? allGossip.map(transformToEntry).join('')
            : `<div className="mui--text-headline">You're kidding... No news?</div>`

        const list = document.getElementById('gossip-list')
        list.innerHTML = html
    }

    static gossipListToHTML(gossip) {
        // Function transforming gossip list to HTML format
        return gossip.length
            ? `<ol>${gossip.map(g => `<li>${g.name}</li>`).join('')}</ol>`
            : `<p">No news.</p>`
    }
}

function setGossipToLocalStorage(gossip) {
    // Function setting new gossip to a local storage of gossip
    const allGossip = getAllGossipFromLocalStorage()
    allGossip.push(gossip)
    localStorage.setItem('gossips', JSON.stringify(allGossip))
}

function getAllGossipFromLocalStorage() {
    // Function getting all gossip from the storage
    return JSON.parse(localStorage.getItem('gossips') || '[]')
}

function transformToEntry(gossip) {
    // Function transforming {gossip} to a readable form to be rendered on a main page
    return `
    <div class="mui--text-black-54">
        ${new Date(gossip.dateOfPublication).toLocaleDateString()}
        ${new Date(gossip.dateOfPublication).toLocaleTimeString()}
    </div>
    <div id="gossipText">${gossip.name}</div>
    <br>
    `
}
