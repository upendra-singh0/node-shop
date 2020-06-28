module.exports = (req) => ({
  data: req.body,
  queryParams: req.query,
  pathParams: req.params,
  files: req.files,
  file: req.file,
});
