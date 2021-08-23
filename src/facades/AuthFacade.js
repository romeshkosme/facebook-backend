import UserService from "../services/UserService";
import bcrypt from "bcrypt";
import { generateAccessToken, sendEmail } from "../helpers/utils";
import generatePassword from "generate-password";

class AuthFacade {
  register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.email = data.email.toLowerCase();
        const hashPassword = bcrypt.hashSync(data.password, 10);
        const userService = new UserService();
        const user = await userService.get({ email: data.email });
        if (user) {
          reject({
            code: 400,
            response: { success: false, result: `Email already Registered` },
          });
        } else {
          const otp = generatePassword.generate({
            length: 8,
            numbers: true,
          });
          let resp = await userService.insert({
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: hashPassword,
            date_of_birth: data.dateOfBirth,
            gender: data.gender,
            otp: otp,
          });
          sendEmail({otp, email: data.email});
          resolve({
            code: 200,
            response: { success: true, result: `User Registered!` },
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          code: 400,
          response: { success: false, error: `Please enter your Password.` },
        });
      }
    });
  }

  verifyUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const userService = new UserService();
        const user = await userService.get({ email: data.email });
        if (user && data.otp && user.otp && data.otp === user.otp) {
          const token = await generateAccessToken({
            email: user.email,
            id: user._id,
          });
          resolve({
            code: 200,
            response: { success: true, token },
          });
        }
        resolve({
          code: 200,
          response: { success: false, result: `Blah Blah! Error` },
        });
      } catch (error) {
        console.log(error);
        resolve({
          code: 200,
          response: { success: true, result: `Blah Blah! Error` },
        });
      }
    });
  }

  login(data, req) {
    return new Promise(async (resolve, reject) => {
      try {
        const userService = new UserService();
        const user = await userService.get({ email: data.email });
        let validPassword = undefined;
        if (user) {
          validPassword = bcrypt.compareSync(data.password, user.password);
        }
        if (!user) {
          resolve({
            code: 401,
            response: {
              success: false,
              error: "Email address not registered.",
            },
          });
        }
        if (validPassword) {
          const token = await generateAccessToken({
            email: user.email,
            id: user._id,
          });
          req.session.user_email = user.email;
          req.session.user_id = user._id;
          // sendEmail("send email calling for login")
          resolve({
            code: 200,
            response: { success: true, token },
          });
        }
        if (!validPassword) {
          resolve({
            code: 401,
            response: {
              success: false,
              error: "The password that you've entered is incorrect.",
            },
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          code: 400,
          response: { success: false, error: "Something went wrong!" },
        });
      }
    });
  }
}

module.exports = AuthFacade;
