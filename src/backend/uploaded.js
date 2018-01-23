export default (req, res) => {
  if (req.session) {
    if (!req.session.files) {
      req.session.files = {};
    }

    const filesArr = Object.keys(req.session.files).map(k => req.session.files[k]);
    const filtered = _.filter(filesArr, f => f.status > 0);
    return res.send({
      data: filtered,
    });
  }
  return res.status(400).send({ message: 'session unintialized' });
};
