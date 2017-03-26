
function post({ type, url, body, headers = [], onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open(type || 'POST', url);
  // Set request headers
  headers.forEach((h) => {
    request.setRequestHeader(h.key, h.value);
  });
  request.send(JSON.stringify(body));

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200 || request.status === 201) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}

function get({ url, headers = [], onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  // Set request headers
  headers.forEach((h) => {
    request.setRequestHeader(h.key, h.value);
  });
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200 || request.status === 201) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}

export { post, get };
