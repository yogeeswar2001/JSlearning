class Github {
    constructor() {
        this.client_id = 'dd0e76cd5cea2ee3feaa';
        this.client_secret = '114faafe5c40b683bb99e175aa36c7f13d5d8578';
        this.repo_count = 5;
        this.repo_sort = 'created:asc';
    }

    //sending request using using xhr object
    getUserProfileByXHR(userName) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/users/${userName}`, true);
        xhr.onload = function() {
            if(this.status === 200) {
                console.log(this.responseText);
            }
        }
        xhr.send();
    }

    async getUsers(userName) {
        // return new Promise((resolve, reject) => {
        //     fetch(`https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
        //     .then(res => res.json())
        //     .then(data => resolve(data))
        //     .catch(err => reject(err));
        // });

        //get user profile 
        const profileResponse = await fetch(`https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profile = await profileResponse.json();

        //get user repos
        const repoResponse = await fetch(`https://api.github.com/users/${userName}/repos?per_page=${this.repo_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const repo = await repoResponse.json();

        return {
            profile,
            repo
        };
    }
}