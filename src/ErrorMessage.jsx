
const ErrorMessage = {
    fullname:{
        required:"please Enter name..",
        maxLength:"cross maximium 20 char length"
    },
    email:{
        required:"email is required, Enter email",
        pattern:"did not match email pattern"
    },
    password:{
        required:"password box is empty enter strong password",
        minLength:"enter atlest 8 char...",
        maxLength:"cross maximium character password limit 12 char"
    },
    title:{
        required:"title must be required",
        maxLength:"title cross 50 words please write under limit"       
    },
    featuredImage:{
        required:"Enter please content then move next page"
    },
    visibleChoice:{
        required:"Enter visible option"
    }
}
export default ErrorMessage