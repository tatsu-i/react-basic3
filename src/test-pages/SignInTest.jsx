// import React, { useState } from "react";

// const SignIn = () => {
//   const [errorMessage, setErrorMessage] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };
//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };
//   const onSignIn = (e) => {
//     e.preventDefault();
//     if (email === "test@example.com" && password === "password123") {
//       console.log("SignIn Successful");
//     } else if (!email.endsWith("@example.com")) {
//       setErrorMessage(
//         "メールアドレスのドメインは@example.comである必要があります。"
//       );
//     } else if (password.length < 8) {
//       setErrorMessage("パスワードは8文字以上である必要があります。");
//     } else {
//       setErrorMessage("メールアドレス、もしくはパスワードが間違っています。");
//     }
//   };

//   return (
//     <div>
//       <form>
//         <label>メールアドレス</label>
//         <br />
//         <input
//           type="email"
//           onChange={handleEmailChange}
//           data-testid="emailInput"
//         />
//         <br />
//         <label>パスワード</label>
//         <br />
//         <input
//           type="password"
//           onChange={handlePasswordChange}
//           data-testid="passwordInput"
//         />
//         <br />
//         <button type="button" onClick={onSignIn} data-testid="signInButton">
//           サインイン
//         </button>
//       </form>
//       <p data-testid="errorMessage">{errorMessage}</p>
//     </div>
//   );
// };

// export default SignIn;
