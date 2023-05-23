// const validations = (game, errors, setErrors) => {
//     if(!game.name){
//         setErrors({...errors, name: "Complete this field"})
//     } else if(game.name.length > 40){
//         setErrors({...errors, name:"Cannot contain more than 40 characters"});
//     } else if(game.rating < 0) {
//         setErrors({...errors, rating: "Rating cannot be less than 0"});
//     }else if(game.rating > 5) {
//         setErrors({...errors, rating: "Rating cannot be greater than 5"});
//     } else if(game.description === ""){
//         setErrors({...errors, description: "Complete this field"});
//     } else if (game.description.length > 150){
//         setErrors({...errors, description: "Cannot contain more than 150 characters"});
//     }
// }

// export default validations;

const validations = (game, errors, setErrors) => {
    if (!game.name) {
      setErrors({ ...errors, name: "Complete this field", description: "" });
    } else if (game.name.length > 40) {
      setErrors({
        ...errors,
        name: "Cannot contain more than 40 characters",
        description: "",
      });
    } else if (game.rating < 0) {
      setErrors({ ...errors, rating: "Rating cannot be less than 0", description: "" });
    } else if (game.rating > 5) {
      setErrors({ ...errors, rating: "Rating cannot be greater than 0", description: "" });
    } else if (!game.description) {
      setErrors({ ...errors, description: "Complete this field", name: "" });
    } else if (game.description.length > 150) {
      setErrors({
        ...errors,
        description: "Cannot contain more than 150 characters",
        name: "",
      });
    }
  };

  export default validations;
  