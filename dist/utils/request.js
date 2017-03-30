'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function post(_ref) {
  var type = _ref.type,
      url = _ref.url,
      body = _ref.body,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? [] : _ref$headers,
      onSuccess = _ref.onSuccess,
      onError = _ref.onError;

  var request = new XMLHttpRequest();
  request.open(type || 'POST', url);
  // Set request headers
  headers.forEach(function (h) {
    request.setRequestHeader(h.key, h.value);
  });
  request.send(JSON.stringify(body));

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var data = JSON.parse(request.responseText);
      if (request.status === 200 || request.status === 201) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}

function get(_ref2) {
  var url = _ref2.url,
      _ref2$headers = _ref2.headers,
      headers = _ref2$headers === undefined ? [] : _ref2$headers,
      onSuccess = _ref2.onSuccess,
      onError = _ref2.onError;

  var request = new XMLHttpRequest();
  request.open('GET', url);
  // Set request headers
  headers.forEach(function (h) {
    request.setRequestHeader(h.key, h.value);
  });
  request.send();

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      var data = JSON.parse(request.responseText);
      if (request.status === 200 || request.status === 201) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}

exports.post = post;
exports.get = get;