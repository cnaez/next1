export default isLoggedIn(async (ctx) => {
  // In this component, do anything with the authorized user. Maybe getting his data?
  const token = ctx.req.cookies.jwt;
  const { data } = await getUserData(...); // don't forget to pass his token in 'Authorization' header.

  return {
    props: {
      data,
    },
  },
});