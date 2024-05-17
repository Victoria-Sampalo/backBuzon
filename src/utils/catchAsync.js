// explicación minuto 41 https://www.youtube.com/watch?v=MaIeZeHhUgM&t=2147s
export const catchAsync=(fn)=>{
    return (req,res,next)=>{
        fn(req,res).catch((error)=>next(error))
    }
}