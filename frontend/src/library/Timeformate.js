 
 const timeformat=(min)=>{
     const hours= Math.floor(min/60);
     const minrim= min%60;
     return `${hours} hrs ${minrim} min`;
 }
 export default timeformat