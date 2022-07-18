function createCard(){
    let card_el = document.createElement('article')
    card_el.classList.add("card", "mb-2", "mx-2")
    return card_el
}

function createSampleCard(){
    return createCard ("carregando...", "...")
}


class ApiConection {
    get API_URL() {
        return "https://api.github.com/users/Gabynze/repos"
    }

    async getrequestPortafolio() {
        const request_url = this.API_URL
        const resp = await fetch(request_url)
        if (resp.ok) {
            return await resp.json()
        }
        throw new Error("Error fetching API, status:" + resp.status)
    }
}

document.addEventListener("DOMContentLoaded", function iniciandoApp(){
    const search_results_el = document.getElementById("search-results")
    const api_connection = new ApiConection

    for (let i=0; i < 13; i++){
        search_results_el.appendChild(createSampleCard())
    }

    api_connection.getrequestPortafolio()
    .then(results => {
        // console.log(results)
        search_results_el.innerHTML = "";
        let reposCard = " ";
        results.forEach(result => {
            reposCard += `<div class="repos_card">
                <h3>${result.name}</h3>
                <a href="${result.html_url}">Ver mais</a>
            </div>`
        })
        search_results_el.innerHTML = reposCard;
    })   

})



