function getUsers() {
  let xhr = new XMLHttpRequest();
  const url = 'http://jsonplaceholder.typicode.com/users';
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() {
    let users = JSON.parse(xhr.response);
    let usersIds = [];

    users.forEach(function(user) {
        usersIds.push(user.id)
      })
      //sort ids
    const sortedIds = usersIds.sort(function(a, b) {
      return a - b;
    });
    const minId = sortedIds[0];
    const maxId = sortedIds[sortedIds.length - 1];

    //get random id
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //delete random users
    function deleteTwoRandomUsers() {
      for (let i = 0; i < 2; i++) {
        let id = randomInteger(minId, maxId);
        users.forEach(function(user) {
          if (user.id == id) {
            let index = users.indexOf(user);
            users.splice(index, 1);
          }
        })
      }
    }
    deleteTwoRandomUsers();
    const allNames = getNames();

    function getNames() {
      names = [];
      users.forEach(function(user) {
        let name = user.name + ' ' + user.username;
        names.push(name);
      });
      return names;
    }
    console.log(allNames);
  };
  xhr.onerror = function() {
    console.log('Error');
  };
}
console.log(getUsers());
