const {body, checkSchema, validationResult} = require('express-validator');
const User = require('../models/user');

const register_schema = {
    fullname: {
        notEmpty: true,
        errorMessage: "İsim alanı gerekli",
    },
    username: {
        custom: {
            options: async (value) => {
                if(value == '')  return Promise.reject('Kullanıcı adı alanı gerekli')
                if(value.length < 4)  return Promise.reject('Kullanıcı adı 4 karakterden küçük olamaz')
                await User.findAll({
                    where: { 
                        username: value
                    }
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Kullanıcı adı zaten kayıtlı')
                    }
                })
              }
        },
    },
    password: {
        custom: {
            options: (value) => {
                if(value == '')  return Promise.reject('Şifre alanı gerekli')
                if(value.length < 8)  return Promise.reject('Şifre 8 karakterden küçük olamaz')
            }
        }
    },
    password_verification: {
        custom: {
            options: (value, { req }) => {
                if(value == '')  return Promise.reject('Şifre onaylama alanı gerekli')
                if(req.body.password != value)  return Promise.reject('Şifreler uyuşmuyor')
            }
        }
        
    },
    email_adress: {
        normalizeEmail: true,
        notEmpty: true,
        errorMessage: "Email alanı gerekli",
        custom: {
            options: async (value) => {
                return await User.findAll({
                    where: { 
                        email_adress: value
                    }
                }).then(user => {

                    if (user.length > 0 && value != '@') {
                        return Promise.reject('E-Mail zaten kayıtlı')
                    }
                })
            }
        }
    }
}

module.exports = {
    register_schema
}