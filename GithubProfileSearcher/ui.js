class UI {
    constructor() {
        this.profile = document.querySelector('#profile');
    }

    showProfile(profileData) {        
        //insert profile data
        this.profile.innerHTML = `
            <div class='card card-body mb-3'>
                <div class='row'>
                    <div class='col-md-3'>
                        <img class='img-fluid mb-2' src='${profileData.avatar_url}'>
                        <a href='${profileData.html_url}' target='_blank' class='btn btn-primary btn-block mb-4'>View profile</a>
                    </div>
                    <div class='col-md-9'>
                        <span class='badge badge-primary'>Public Repos: ${profileData.public_repos}</span>
                        <span class='badge badge-secondary'>Public Gists: ${profileData.public_gists}</span>
                        <span class='badge badge-success'>Followers: ${profileData.followers}</span>
                        <span class='badge badge-info'>Following: ${profileData.following}</span>

                        <br><br>

                        <ul class='list-group'>
                            <li class='list-group-item'>Company: ${profileData.company}</li>
                            <li class='list-group-item'>Website/Blog: ${profileData.blog}</li>
                            <li class='list-group-item'>Location: ${profileData.location}</li>
                            <li class='list-group-item'>Member Since: ${profileData.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <br>
            <h2>Latest Repos</h2> 
            <div class='repo card card-body mt-3'></div>
        `;
    }
    
    showRepo(repoData) {
        //insert repo data
        console.log(repoData);

        let html = '';

        repoData.forEach((repo) => {
            html += `
                <div class='card card-body mb-2'>
                    <div class='row'>
                        <div class='col-md-6'>
                            <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
                        </div>
                        <div class='col-md-6'>
                            <span class='badge badge-primary'>Stars: ${repo.stargazers_count}</span>
                            <span class='badge badge-warning'>Watch: ${repo.watchers_count}</span>
                            <span class='badge badge-success'>Forks: ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector('.repo').innerHTML = html;
    }

    showAlert(msg, className) {
        //clear already existing alert
        this.clearAlert();
        
        //create alert element
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));

        //get parent element
        const parent = document.querySelector('.searchContainer');

        //get element below
        const search = document.querySelector('.search');

        console.log(div, parent, search);
        //insert div 
        parent.insertBefore(div, search);

        //clear alert after three seconds
        setTimeout(() => this.clearAlert(), 3000);
    }

    clearAlert() {
        if(document.querySelector('.alert'))
            document.querySelector('.alert').remove();
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
}