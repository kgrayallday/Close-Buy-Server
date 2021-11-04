exports.convertNumber = (priceNum) => {
  const val = priceNum.toString();
  console.log('val--->',val);
  let num = (val.trim().isEmpty) ? 'N/A' : Number(val.replace(/[^\d.-]/g, ''))
  if (!num) num = 'N/A' ;
  return num;
};
