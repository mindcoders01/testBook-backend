


 function generateRefcode(){
  const str = "ABCDEFGHIJKLMNOPQRSTUV45677WXYZ44444abcdefgFGHJTFBhijklmn56789opqrstuvwxyz0123456789@#$%^&";
   let referral ='';
    for(let i=0;i<6;i++){
      referral += str[(Math.floor(Math.random()*100))%str.length]
    }
   return referral
}

module.exports = {generateRefcode}