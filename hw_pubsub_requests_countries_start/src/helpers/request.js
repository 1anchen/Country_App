const Request = function(url){
  this.url = url;
}

Request.prototype.get = function(onComplete) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', this.url);
  xhr.setRequestHeader('Accept','application/json');

  xhr.addEventListener('load', () => {
    if(xhr.status !==200){
      xhr.error(xhr.status);
      return;
    }
    const jsonData = xhr.responseText;
    const data = JSON.parse(jsonData);
    onComplete(data);
  });
  xhr.send();

};

module.exports = Request;
