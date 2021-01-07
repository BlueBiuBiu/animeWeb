export default {
  originalPosition(ctx,payload){
    ctx.commit({
      type: "originalPosition",
      scrollY: payload.scrollY
    })
  }
}