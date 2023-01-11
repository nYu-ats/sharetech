const jsonServer = require("json-server");
const { queryRewirter } = require("./utility");
const app = jsonServer.create();

const middlewears = jsonServer.defaults();
app.use(middlewears);

app.get(
  "/*",
  queryRewirter([
    ["author", "author.name"],
    ["_cursor", "_page"],
  ])
);

const router = jsonServer.router("supports/mock/data/db.json");
app.use(router);

// レスポンスにページ情報を追加する
router.render = (req, res) => {
  const pageSize = res.locals.data.length;
  const _currentCursor = req.url
    .split("&")
    .filter((item) => item.indexOf("_cursor") !== -1)
    .map((item) => {
      const limit = item.split("=");
      return Number(limit[1]);
    });
  const currentCursor = _currentCursor.length > 0 ? _currentCursor[0] : undefined;
  res.jsonp({
    ...res.locals,
    page: {
      size: pageSize,
      nextCursor:
        currentCursor !== undefined && pageSize !== 0
          ? currentCursor + pageSize
          : undefined,
    },
  });
};

app.listen(3333, () => {
  console.log("Mock server is running on http://localhost:3333");
});
