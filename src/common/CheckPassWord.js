const CheckPassWord=(password)=>{
   
   
    var regexNumber = /\d/;
    var regSpecial =  /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var passwordMsg = ''
    console.log("UserScreen - checkPassword"+password);

    var passwordLength = password.length;
    // check length of password is 8-10
    console.log("UserScreen - passwordLength : "+passwordLength);
   
    console.log("8<passwordLength "+8<passwordLength)


    if ( 8<parseInt(password.length) && 10<parseInt(password.length) ){
        console.log("UserScreen - password less than 8");
        passwordMsg = passwordMsg+"Password must be between 8-10 character";
    
    }

    
    // test for special characters
    var isSpecialChar = regSpecial.test(password);
    if (!isSpecialChar){
        passwordMsg = passwordMsg+"\nPassword need to have special characters";
    }
    
    
    var isNumChar = regexNumber.test(password);
    if (!isNumChar){
        passwordMsg = passwordMsg+"\nPassword need to have numeric character";
    }
    console.log(passwordMsg);
    return passwordMsg;
};

export default CheckPassWord;