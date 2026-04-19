/* this asyncHandler is basically a hof which takes func as parameter and returns it
- now this function takes "fn" as parameter and we need to execute this "fn"
- but we cant execute this since callback is there ahead (fn) => {}
- so futher where we have accepted the parameter we make and execute a hof ahead eg below
- (fn) => () => {}
    const asyncHandler = (fn) => {() => {}}
    - basically we pass the "fn" which is a paramenter into another function
    eg. (fn) => () => {}
        - now if we want to make the fn async then,
        (fn) => async () => {}
        Now with this async fn we can talk with db

    This makes a wrapper function which we will use ahead
*/
// --------Promises format code--------
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
} 

export { asyncHandler }


// -------try-catch format code---------
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }