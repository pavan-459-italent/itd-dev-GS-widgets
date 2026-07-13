self.onmessage = function (e) {
  var result = {
    received: e.data,
    processed: true,
    timestamp: new Date().toISOString(),
    message: "Worker processed the message successfully",
  };

  self.postMessage(result);
};

self.postMessage({ status: "Worker initialized", ready: true });
