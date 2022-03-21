const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    }
    
    passport.use(new LocalStrategy(options, async (email, password, done ) =>{
        try{
            const user = await User.findOne({where: {
                email: email
            }});
            
            if(!user) return done(null, false, {message: 'Kullanıcı bulunamadı'});
            if(password !== user.password ) return done(null, false, {message: 'Şifre hatalı'});
            else return done(null, user);
            
            
        }catch(err){
            return done(err)
        }
    }))
    
    passport.serializeUser((user, done)=> {
        console.log('User sessiona kaydedildi ' + user.id);
        done(null, user.id);
    });
    passport.deserializeUser(async(id, done) => {
        console.log('User veritabaninda bulundu');
        const user = await User.findOne({
            where: {
                id: id,
            },
        })
        console.log(user)
        done(null, user);
    });
    
}

