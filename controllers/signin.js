const handleSignin = (req, res, db, bcrypt) =>{ 
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('Something went wrong...');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then ( user => {
            if (bcrypt.compareSync(password, user[0].hash)) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then( user => {
                        if (user.length) {
                            res.json(user[0]);
                        } else {
                            res.status(400).json('Not found')
                        }
                })
            } else {
                res.status(400).json('Error loggin in');
            }
        })
        .catch(err => res.status(400).json('Error loggin in'));
}

module.exports = {
    handleSignin: handleSignin
};