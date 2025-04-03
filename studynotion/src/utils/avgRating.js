export default function GetAvgRating(ratingArr){
  if(!ratingArr?.length) return 0
  const totalReviewCount=ratingArr?.reduce((acc,curr)=>{
    acc+=curr.rating
    return acc
  })
  const multiplier=Math.pow(10,1)
  const averageRating=Math.round((totalReviewCount/ratingArr?.length)*multiplier)/multiplier
  return averageRating

 
   
}