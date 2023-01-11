const queryRewirter = (rewriteMapArray) => {
  return (req, res, next) => {
    rewriteMapArray.forEach((rewriteMap) => {
      if (rewriteMap[0] in req.query) {
        const val = JSON.parse(JSON.stringify(req.query[rewriteMap[0]]));
        delete req.query[rewriteMap[0]];
        req.query[rewriteMap[1]] = val;
      }
    });
    next();
  };
};

exports.queryRewirter = queryRewirter;
