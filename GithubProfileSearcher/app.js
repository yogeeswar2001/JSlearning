//create a GitHub object
const github = new Github;

//create a UI object
const ui = new UI;

//get the username dom
const userNameElem = document.querySelector('#userName');

//event lister for username field yogeeswar2001
userNameElem.addEventListener('keyup', e => {
    const userName = e.target.value;

    if(userName !== '') {
        //get user profile
        github.getUsers(userName).then(data => {
            if(data.profile.message === 'Not Found') {
                //alert user
                ui.showAlert('User not found', 'alert alert-danger');
            } else {
                //show profile 
                ui.showProfile(data.profile);

                //show repos
                ui.showRepo(data.repo);
            }
        });
    } else {
        //clear profile
        ui.clearProfile();
    }
});